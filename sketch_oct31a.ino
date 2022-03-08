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

//wifi reconnect variables
unsigned long previousMillis = 0;
unsigned long interval = 30000;

Servo servo1;
Servo servo2;
Servo servo3;
Servo servo4;
Servo servo5;
Servo servo6;
Servo servo7;

static const int LED = 33;
static const int servo1Pin = 21;
static const int servo2Pin = 13;
static const int servo3Pin = 27;
static const int servo4Pin = 3;
static const int servo5Pin = 19;
//static const int servo6Pin = 15;
//static const int servo7Pin = 17;

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
//String sliderValue15 = "0";
//String sliderValue16 = "0";

//Json Variable to Hold Slider Values
JSONVar sliderValues;
//Get Slider Values
String getSliderValues(){
  sliderValues["sliderValue10"] = String(sliderValue10);
  sliderValues["sliderValue11"] = String(sliderValue11);
  sliderValues["sliderValue12"] = String(sliderValue12);
  sliderValues["sliderValue13"] = String(sliderValue13);
  sliderValues["sliderValue14"] = String(sliderValue14);
  //sliderValues["sliderValue15"] = String(sliderValue15);
  //sliderValues["sliderValue16"] = String(sliderValue16);
  
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
  servo1.attach(servo1Pin);
  servo2.attach(servo2Pin);
  servo3.attach(servo3Pin);
  servo4.attach(servo4Pin);
  servo5.attach(servo5Pin);
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
  servo1.write(sliderValue10.substring(1).toInt()); 
  servo2.write(sliderValue11.substring(1).toInt()); 
  servo3.write(sliderValue12.substring(1).toInt()); 
  servo4.write(sliderValue13.substring(1).toInt()); 
  servo5.write(sliderValue14.substring(1).toInt()); 

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
