# Robotic_Tongue_GUI
User Interface Subsystem from Robotic Tongue Senior Design Project F21-S22 <br>
Maritza Aguirre-Diaz <br>
Nathan Chen <br>
 
Senior Design Project Goal:   <br>
To create a physical, soft bodied robot with actuators corresponding to each muscle.
Model will allow students to interact with it to better understand the effects each muscle has on tongue shape/speech

Senior Design Key Requirements: <br>
~Realistic model that mimics tongue motion <br>
~Portable (<50 lbs) <br>
~**User-friendly software/hardware <br>
~Control muscle contraction percentage with user-interface** <br>
~Educates students and researchers on functions of each tongue muscle <br>

How to use files: <br>
The data folder consists of an HTML, CSS, and JavaScript files. These are the main files for the layout and function of the user interface. The data files need to be uploaded to the esp 32 SPIFFS <br>

How to set up Arduino IDE to run RoboticTongue directory on esp32:<br>
-Install the Arduino IDE here https://www.arduino.cc/en/software<br>
-Install the ESP32 board in Arduino IDE as shown here: https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/e/<br>
-Install SPIFFS Uploader as shown here: https://randomnerdtutorials.com/install-esp32-filesystem-uploader-arduino-ide/<br>
-After completing the above, add Adafruit_GFX_Library, Arduino_JSON, AsyncTCP-master, ESPAsyncWebServer-master, XTronical-ST7735-Library directories to libraries folder of Arduino IDE<br>

-Save RoboticTongue Directory where your Arduino sketches are saved to <br>
-Open RoboticTongue.ino in Arduino IDE<br>

References <br>
[1] R. Santos and S. Santos. "ESP32 Web Server (WebSocket) with Multiple <br>
Sliders: Control LEDs Brightness (PWM)" randomnerdtutorials.com.  <br>
https://randomnerdtutorials.com/esp32-web-server-websocket-sliders/ (accessed April 5, 2022). <br>

Code from [1] is marked with [1].

