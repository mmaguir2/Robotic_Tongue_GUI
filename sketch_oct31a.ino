// Import required libraries
#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"
#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <Arduino_JSON.h>
#include "SPIFFS.h"
#include <Servo.h>

//import graphics library
#include <Adafruit_GFX.h>    // Core graphics library
#include <XTronical_ST7735.h> // Hardware-specific library

#include <SPI.h>
// set up pins we are going to use to talk to the screen
#define TFT_DC     15       // register select (stands for Data Control perhaps!)
#define TFT_RST   4         // Display reset pin, you can also connect this to the ESP32 reset
                            // in which case, set this #define pin to -1!
#define TFT_CS   22       // Display enable (Chip select), if not enabled will not talk on SPI bus
// initialise the routine to talk to this display with these pin connections (as we've missed off
// TFT_SCLK and TFT_MOSI the routine presumes we are using hardware SPI and internally uses 13 and 11
Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS,  TFT_DC, TFT_RST);  

#define DELAYTIME     250

//wifi reconnect variables
unsigned long previousMillis = 0;
unsigned long interval = 30000;

Servo servo10;
Servo servo11;
Servo servo12;
Servo servo13;
Servo servo14;
Servo servo15;
Servo servo16;
Servo servo17;
Servo servo18;
Servo servo19;
Servo servo22;

static const int LED = 33;
static const int servo10Pin = 21;
static const int servo11Pin = 13;
static const int servo12Pin = 27;
static const int servo13Pin = 12;
static const int servo14Pin = 19;
static const int servo15Pin = 14;
static const int servo16Pin = 26;
static const int servo17Pin = 25;
static const int servo18Pin = 2;
static const int servo19Pin = 32;
static const int servo22Pin = 5;

// Replace with your network credentials
const char* ssid = "ncsu";//"Pack House";
//const char* password = "thunkanddunk";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

//JSON interaction
String message = "";
String sliderValue10 = "0";
String sliderValue11 = "0";
String sliderValue12 = "0";
String sliderValue13 = "0";
String sliderValue14 = "0";
String sliderValue15 = "0";
String sliderValue16 = "0";
String sliderValue17 = "0";
String sliderValue18 = "0";
String sliderValue19 = "0";
String sliderValue22 = "0";

//Json Variable to Hold Slider Values
JSONVar sliderValues;
//Get Slider Values
String getSliderValues(){
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
  sliderValues["sliderValue22"] = String(sliderValue22);
  
  String jsonString = JSON.stringify(sliderValues);
  return jsonString;
}
void notifyClients(String sliderValues) {
  ws.textAll(sliderValues);
}

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    message = (char*)data;
    if (message.indexOf("10s") >= 0) {
      sliderValue10 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("11s") >= 0) {
      sliderValue11 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }    
    if (message.indexOf("12s") >= 0) {
      sliderValue12 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("13s") >= 0) {
      sliderValue13 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("14s") >= 0) {
      sliderValue14 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("15s") >= 0) {
      sliderValue15 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("16s") >= 0) {
      sliderValue16 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
     if (message.indexOf("17s") >= 0) {
      sliderValue17 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
     if (message.indexOf("18s") >= 0) {
      sliderValue18 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("19s") >= 0) {
      sliderValue19 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (message.indexOf("22s") >= 0) {
      sliderValue22 = message.substring(2);
      
      Serial.print(getSliderValues());
      notifyClients(getSliderValues());
    }
    if (strcmp((char*)data, "getValues") == 0) {
      notifyClients(getSliderValues());
    }
  }
}
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
//https passwords
const char* http_username = "admin";
const char* http_password = "admin";
const char* PARAM_INPUT_1 = "state";
const int output = 2;

void initSPIFFS(){
  if(!SPIFFS.begin(true)){
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }
}
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
void initWebPage(){
  // Route for root / web page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    if(!request->authenticate(http_username, http_password))
      return request->requestAuthentication();
    request->send(SPIFFS, "/index.html", "text/html");
    
  });
  // Route to load style.css file - so we can see it being pretty
  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/style.css", "text/css");
  });
}
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
//added
void initWebSocket() {
  ws.onEvent(onEvent);
  server.addHandler(&ws);
}

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
  servo22.attach(servo22Pin);
}

void setup() {
  // put your setup code here, to run once:
  //led 
  pinMode(LED, OUTPUT);
  //servo code
  attachServos();
  // Serial port for debugging purposes
  Serial.begin(115200);
  tft.fillScreen(ST7735_BLACK);  //clear the screen first
  tft.init();
  
  initSPIFFS(); //same as initFS in Maritza's code
  initWiFi();
  
  initWebSocket();
  initWebPage();
  initLogInAndOut();

  // Start server
  server.serveStatic("/", SPIFFS, "/");
  server.begin();

  
}

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
int previousValue22 = 0;

void loop() {
  // put your main code here, to run repeatedly:
  //servo code
  /*Serial.println(sliderValue10.substring(1)); //- prints out 78
  Serial.println(sliderValue10);              //prints out s78
  Serial.println('\n');
  Serial.println(sliderValue11.substring(1)); //prints out 55
  Serial.println(sliderValue11);              //prints out s55
  Serial.println('\n');*/
  //Serial.println(sliderValue12.substring(1).toInt());
  //led right here idk why but need to move it somewhere else
  digitalWrite(LED, HIGH); 
  if(sliderValue10.substring(1).toInt() != previousValue10){
    delay(DELAYTIME);
    previousValue10 = sliderValue10.substring(1).toInt(); 
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
  if(sliderValue22.substring(1).toInt() != previousValue22){
    delay(DELAYTIME);
    previousValue22 = sliderValue22.substring(1).toInt(); 
    servo22.write(sliderValue22.substring(1).toInt()); 
  }
  
  
 

  //display
  //display to print out the ip address
  //tft.fillScreen(ST7735_BLACK);
    
    
  ws.cleanupClients();


  //reconnecting to wifi
  unsigned long currentMillis = millis();
  // if WiFi is down, try reconnecting
  if ((WiFi.status() != WL_CONNECTED) && (currentMillis - previousMillis >=interval)) {
    Serial.print(millis());
    Serial.println("Reconnecting to WiFi...");
    WiFi.disconnect();
    WiFi.reconnect();
    previousMillis = currentMillis;
  }
  
  delay(10);
}
