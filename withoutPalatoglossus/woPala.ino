/*References
[1] R. Santos and S. Santos. "ESP32 Web Server (WebSocket) with Multiple 
Sliders: Control LEDs Brightness (PWM)" randomnerdtutorials.com. 
https://randomnerdtutorials.com/esp32-web-server-websocket-sliders/ (accessed April 5, 2022).
*/
// Import required libraries
#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"
#include <Arduino.h>//[1]
#include <WiFi.h>//[1]
#include <AsyncTCP.h>//[1]
#include <Arduino_JSON.h>//[1]
#include "SPIFFS.h"//[1]
#include <Servo.h>

//import graphics library
#include <Adafruit_GFX.h>    // Core graphics library
#include <XTronical_ST7735.h> // Hardware-specific library

//import communications library SPI protocol
#include <SPI.h>
// set up pins we are going to use to talk to the screen
#define TFT_DC     15       // register select (stands for Data Control perhaps!)
#define TFT_RST   4         // Display reset pin, you can also connect this to the ESP32 reset
                            // in which case, set this #define pin to -1!
#define TFT_CS   22       // Display enable (Chip select), if not enabled will not talk on SPI bus
// initialise the routine to talk to this display with these pin connections (as we've missed off
// TFT_SCLK and TFT_MOSI the routine presumes we are using hardware SPI and internally uses 13 and 11
Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS,  TFT_DC, TFT_RST);  

//set the delay time between each servo movement
#define DELAYTIME     250

//wifi reconnect variables
unsigned long previousMillis = 0;
unsigned long interval = 30000;

//create servo objects
Servo servo10;//pin 21
Servo servo11;//pin 13
Servo servo12;// pin 27
Servo servo13;//pin 12
Servo servo14;// pin 19
Servo servo15;//pin 14
Servo servo16;//pin 26
Servo servo17;//pin 25
Servo servo18;//pin 2
Servo servo19;//pin 32

//set servo pins 
static const int servo10Pin = 21;//Genioglossus Anterior
static const int servo11Pin = 13;//Genioglossus Posterior
static const int servo12Pin = 27;//Hyoglossus Left
static const int servo13Pin = 12;//Hyoglossus Right
static const int servo14Pin = 19;//Styloglossus Left
static const int servo15Pin = 14;//Styloglossus Right
static const int servo16Pin = 26;//Transversus
static const int servo17Pin = 25;//Verticalis
static const int servo18Pin = 2;//Superior Longitudinal
static const int servo19Pin = 32;//Inferior Longitudinal

//set network credentials - no password for NCSU 
const char* ssid = "ncsu"; //[1]

// "Create AsyncWebServer object on port 80" [1]
AsyncWebServer server(80);//[1]
AsyncWebSocket ws("/ws");//[1]

//JSON interaction
String message = "";
String sliderValue10 = "0";//Genioglossus Anterior
String sliderValue11 = "0";//Genioglossus Posterior
String sliderValue12 = "0";//Hyoglossus Left
String sliderValue13 = "0";//Hyoglossus Right
String sliderValue14 = "0";//Styloglossus Left
String sliderValue15 = "0";//Styloglossus Right
String sliderValue16 = "0";//Transversus
String sliderValue17 = "0";//Verticalis
String sliderValue18 = "0";//Superior Longitudinal
String sliderValue19 = "0";//Inferior Longitudinal

//"Json Variable to Hold Slider Values"[1]
JSONVar sliderValues;//[1]

//"Get Slider Values"[1]
String getSliderValues(){//[1]
  sliderValues["sliderValue10"] = String(sliderValue10);
  sliderValues["sliderValue11"] = String(sliderValue11);
  sliderValues["sliderValue12"] = String(sliderValue12);
  sliderValues["sliderValue13"] = String(sliderValue13);
  sliderValues["sliderValue14"] = String(sliderValue14);
  sliderValues["sliderValue15"] = String(sliderValue15);
  sliderValues["sliderValue16"] = String(sliderValue16);
  sliderValues["sliderValue17"] = String(sliderValue17);
  sliderValues["sliderValue18"] = String(sliderValue18);
  sliderValues["sliderValue19"] = String(sliderValue19);
  
  String jsonString = JSON.stringify(sliderValues);
  return jsonString;
}

//notifies clients
void notifyClients(String sliderValues) {//[1]
  ws.textAll(sliderValues);
}

//get websocket changes for each slider 
//similar format to handleWebSocketMessage() in [1]
void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    message = (char*)data;
    if (message.indexOf("10 ") >= 0) {
      sliderValue10 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("11 ") >= 0) {
      sliderValue11 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }    
    if (message.indexOf("12 ") >= 0) {
      sliderValue12 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("13 ") >= 0) {
      sliderValue13 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("14 ") >= 0) {
      sliderValue14 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("15 ") >= 0) {
      sliderValue15 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("16 ") >= 0) {
      sliderValue16 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
     if (message.indexOf("17 ") >= 0) {
      sliderValue17 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
     if (message.indexOf("18 ") >= 0) {
      sliderValue18 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("19 ") >= 0) {
      sliderValue19 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (strcmp((char*)data, "getValues") == 0) {
      notifyClients(getSliderValues());
    }
  }
}

//connects the websocket to the internet
//[1]
void onEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
  switch (type) {
    case WS_EVT_CONNECT:
      Serial.printf("WebSocket client #%u connected from %s\n", client->id(), client->remoteIP().toString().c_str());
      break;
    case WS_EVT_DISCONNECT:
      Serial.printf("WebSocket client #%u disconnected\n", client->id());
      break;
    case WS_EVT_DATA:
      handleWebSocketMessage(arg, data, len);
      break;
    case WS_EVT_PONG:
    case WS_EVT_ERROR:
      break;
  }
}

//password for the website
const char* http_username = "admin";
const char* http_password = "admin";
const char* PARAM_INPUT_1 = "state";
const int output = 2;

//"initialize SPIFFS"[1] (on board esp32 memory)
void initSPIFFS(){//[1]
  if(!SPIFFS.begin(true)){
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
}

//"initialize WiFi" [1]
void initWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid);//,password);
  Serial.print("Connecting to WiFi ..");
  tft.fillScreen(ST7735_BLACK);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
  
  //once the wifi conects, display the information for the wifi and website
  tft.print('\n');
  tft.print(WiFi.localIP());
  tft.print('\n');
  tft.print("User Name: ");
  tft.print('\n');
  tft.print(http_username);
  tft.print('\n');
  tft.print("Password: ");
  tft.print('\n');
  tft.print(http_password);
  //added code for MAC address
  tft.print('\n');
  tft.print("Mac Address: ");
  tft.print('\n');
  tft.print("AC:67:B2:3C:D5:B8");
}

//initialize the main webpage
void initWebPage(){
  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){//[1]
    if(!request->authenticate(http_username, http_password))
      return request->requestAuthentication();
    request->send(SPIFFS, "/index.html", "text/html");
    
  });
  // Route to load style.css file - so we can see it being pretty
  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/style.css", "text/css");
  });
  // Load education.html file with "/education" request
  server.on("/education", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/education.html", "text/html");
  });
}

//initialize the logout webpage
void initLogInAndOut(){
  server.on("/logout", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(401);
  });    
  server.on("/logged-out", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/logged-out.html", "text/html");   
    digitalWrite(4, LOW);  //turns off display once you log out
  });
  // Send a GET request to <ESP_IP>/update?state=<inputMessage>
  server.on("/update", HTTP_GET, [] (AsyncWebServerRequest *request) {
    if(!request->authenticate(http_username, http_password))
      return request->requestAuthentication();
    String inputMessage;
    String inputParam;
    // GET input1 value on <ESP_IP>/update?state=<inputMessage>
    if (request->hasParam(PARAM_INPUT_1)) {
      inputMessage = request->getParam(PARAM_INPUT_1)->value();
      inputParam = PARAM_INPUT_1;
      digitalWrite(output, inputMessage.toInt());
    }
    else {
      inputMessage = "No message sent";
      inputParam = "none";
    }
    Serial.println(inputMessage);
    request->send(200, "text/plain", "OK");
  });
}

//"initialize websocket."[1]
void initWebSocket() {
  ws.onEvent(onEvent);
  server.addHandler(&ws);
}

//attach servos to their corresponding pins
void attachServos(){
  servo10.attach(servo10Pin);
  servo11.attach(servo11Pin);
  servo12.attach(servo12Pin);
  servo13.attach(servo13Pin);
  servo14.attach(servo14Pin);
  servo15.attach(servo15Pin);
  servo16.attach(servo16Pin);
  servo17.attach(servo17Pin);
  servo18.attach(servo18Pin);
  servo19.attach(servo19Pin);
}

//set up code
void setup() {
  // put your setup code here, to run once:
  //servo code - attaches servos to pins
  attachServos();
  // Serial port for debugging purposes
  Serial.begin(115200);
  //clear the screen first - set it to all black
  tft.fillScreen(ST7735_BLACK);  
  tft.init();
  
  //initialize on board memory
  initSPIFFS(); //[1]
  
  //initialize wifi
  initWiFi();//[1]
  
  //initialize websocket
  initWebSocket();//[1]
  
  //initialize main webpage
  initWebPage();
  
  //initialize log out page
  initLogInAndOut();

  // Start server
  server.serveStatic("/", SPIFFS, "/");//[1]
  server.begin();//[1]
}

//previous values for servos so we can see when to move them
//servos will be compared with the previous position to see if 
//it has changed
int previousValue10 = 0;
int previousValue11 = 0;
int previousValue12 = 0;
int previousValue13 = 0;
int previousValue14 = 0;
int previousValue15 = 0;
int previousValue16 = 0;
int previousValue17 = 0;
int previousValue18 = 0;
int previousValue19 = 0;

void loop() {
  // put your main code here, to run repeatedly:
  //servo code
  //checks to see if the servo slider position has moved
  if(sliderValue10.substring(1).toInt() != previousValue10){
    //delays the servo for DELAYTIME before moving 
    delay(DELAYTIME);
    //reset the previous value to the new current value
    previousValue10 = sliderValue10.substring(1).toInt(); 
    //move the servo to the new value
    servo10.write(sliderValue10.substring(1).toInt()); 
  }
  if(sliderValue11.substring(1).toInt() != previousValue11){
    delay(DELAYTIME);
    previousValue11 = sliderValue11.substring(1).toInt(); 
    servo11.write(sliderValue11.substring(1).toInt()); 
  }
  if(sliderValue12.substring(1).toInt() != previousValue12){
    delay(DELAYTIME);
    previousValue12 = sliderValue12.substring(1).toInt(); 
    servo12.write(sliderValue12.substring(1).toInt()); 
  }
  if(sliderValue13.substring(1).toInt() != previousValue13){
    delay(DELAYTIME);
    previousValue13 = sliderValue13.substring(1).toInt(); 
    servo13.write(sliderValue13.substring(1).toInt()); 
  }
  if(sliderValue14.substring(1).toInt() != previousValue14){
    delay(DELAYTIME);
    previousValue14 = sliderValue14.substring(1).toInt(); 
    servo14.write(sliderValue14.substring(1).toInt()); 
  }
  if(sliderValue15.substring(1).toInt() != previousValue15){
    delay(DELAYTIME);
    previousValue15 = sliderValue15.substring(1).toInt(); 
    servo15.write(sliderValue15.substring(1).toInt()); 
  }
  if(sliderValue16.substring(1).toInt() != previousValue16){
    delay(DELAYTIME);
    previousValue16 = sliderValue16.substring(1).toInt(); 
    servo16.write(sliderValue16.substring(1).toInt()); 
  }
  if(sliderValue17.substring(1).toInt() != previousValue17){
    delay(DELAYTIME);
    previousValue17 = sliderValue17.substring(1).toInt(); 
    servo17.write(sliderValue17.substring(1).toInt()); 
  }
  if(sliderValue18.substring(1).toInt() != previousValue18){
    delay(DELAYTIME);
    previousValue18 = sliderValue18.substring(1).toInt(); 
    servo18.write(sliderValue18.substring(1).toInt()); 
  }
  if(sliderValue19.substring(1).toInt() != previousValue19){
    delay(DELAYTIME);
    previousValue19 = sliderValue19.substring(1).toInt(); 
    servo19.write(sliderValue19.substring(1).toInt()); 
  }
  
  ws.cleanupClients();//[1]


  //reconnects to wifi periodically to ensure that we don't stay dropped off of the wifi
  unsigned long currentMillis = millis();
  // if WiFi is down, try reconnecting
  if ((WiFi.status() != WL_CONNECTED) && (currentMillis - previousMillis >=interval)) {
    Serial.print(millis());
    Serial.println("Reconnecting to WiFi...");
    WiFi.disconnect();
    WiFi.reconnect();
    previousMillis = currentMillis;
  }
  
  //delay for 10msec
  delay(10);
}
/* 
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-web-server-websocket-sliders/
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/
