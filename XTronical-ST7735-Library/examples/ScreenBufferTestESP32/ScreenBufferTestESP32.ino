// Demo of using the Screen Buffer to remove flicker from moving graphics and to improve
// speed of transfer to the screen
// You must enable the screen buffer in the XTronical_ST7735.h file as it is not enabled 
// by default. Open up that file in an editor and uncomment the line that reads
//
//   //#define SCREEN_BUFFER 
//
// to
//
//   #define SCREEN_BUFFER 
//
// You will then be able to use the displayBuffer() function to display the screen
// buffer and most image writes will be to the screen buffer. At time of writing
// not all functions have been adapted to use the screen buffer but when this message has
// gone then all will have been adapted. At present I'm re-writig as I go. At present
// any that use drawPixel() will go to the buffer, this includes bitmapped graphics
// which is why I implemented this buffer in the first place.
//

#include <Adafruit_GFX.h>    // Core graphics library
#include <XTronical_ST7735.h> // Hardware-specific library
#include <SPI.h>

// set up pins we are going to use to talk to the screen
#define TFT_DC     D4       // register select (stands for Data Control perhaps!)
#define TFT_RST   D3         // Display reset pin, you can also connect this to the Arduino reset
                            // in which case, set this #define pin to -1!
#define TFT_CS   D2       // Display enable (Chip select), if not enabled will not talk on SPI bus


Adafruit_ST7735 tft = Adafruit_ST7735(TFT_CS,  TFT_DC, TFT_RST);  

const unsigned short HomeFrog[256] PROGMEM={
0x0000, 0x0000, 0x0000, 0x26E0, 0x26E0, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x26E0, 0x26E0, 0x0000, 0x0000, 0x0000,   // 0x0010 (16) pixels
0x0000, 0x0000, 0x26E0, 0x0000, 0x0000, 0x26E0, 0x0000, 0x0000, 0x0000, 0x0000, 0x26E0, 0x0000, 0x0000, 0x26E0, 0x0000, 0x0000,   // 0x0020 (32) pixels
0x0000, 0x0000, 0x26E0, 0xFA20, 0xFA20, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0xFA20, 0xFA20, 0x26E0, 0x0000, 0x0000,   // 0x0030 (48) pixels
0x0000, 0x0000, 0x0000, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x0000, 0x0000, 0x0000,   // 0x0040 (64) pixels
0x0000, 0x0000, 0x0000, 0x0000, 0x0000, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x0000, 0x0000, 0x0000, 0x0000, 0x0000,   // 0x0050 (80) pixels
0x0000, 0x0000, 0x0000, 0x0000, 0x26E0, 0x26E0, 0xFA20, 0x26E0, 0x26E0, 0xFA20, 0x26E0, 0x26E0, 0x0000, 0x0000, 0x0000, 0x0000,   // 0x0060 (96) pixels
0x0000, 0x26E0, 0x0000, 0x0000, 0x26E0, 0x26E0, 0x26E0, 0xFA20, 0xFA20, 0x26E0, 0x26E0, 0x26E0, 0x0000, 0x0000, 0x26E0, 0x0000,   // 0x0070 (112) pixels
0x26E0, 0x26E0, 0x26E0, 0x0000, 0x06FE, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x06FE, 0x0000, 0x26E0, 0x26E0, 0x26E0,   // 0x0080 (128) pixels
0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x06FE, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x06FE, 0x26E0, 0x26E0, 0x26E0, 0x26E0,   // 0x0090 (144) pixels
0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x06FE, 0x06FE, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x06FE, 0x06FE, 0x26E0, 0x26E0, 0x26E0, 0x26E0,   // 0x00A0 (160) pixels
0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x06FE, 0x06FE, 0x06FE, 0x06FE, 0x06FE, 0x06FE, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x26E0,   // 0x00B0 (176) pixels
0x0000, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x06FE, 0xFA20, 0xFA20, 0xFA20, 0x06FE, 0x06FE, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x0000,   // 0x00C0 (192) pixels
0x0000, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x06FE, 0xFA20, 0xFA20, 0xFA20, 0x06FE, 0x06FE, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x0000,   // 0x00D0 (208) pixels
0x0000, 0x0000, 0x0000, 0x26E0, 0x26E0, 0x26E0, 0x06FE, 0x06FE, 0x06FE, 0x06FE, 0x26E0, 0x26E0, 0x26E0, 0x0000, 0x0000, 0x0000,   // 0x00E0 (224) pixels
0x0000, 0x0000, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x0000, 0x0000, 0x0000, 0x0000, 0x26E0, 0x26E0, 0x26E0, 0x26E0, 0x0000, 0x0000,   // 0x00F0 (240) pixels
0x0000, 0x26E0, 0x26E0, 0x26E0, 0x0000, 0x26E0, 0x0000, 0x0000, 0x0000, 0x0000, 0x26E0, 0x0000, 0x26E0, 0x26E0, 0x26E0, 0x0000,   // 0x0100 (256) pixels
};



int y=127;  
void setup(void) {
  tft.init();   // initialize a ST7735S chip,
  tft.setRotation(0);
}

void loop() {
  ESP.wdtDisable();
  tft.fillScreen(ST7735_BLACK);
  for(int x=128;x>=0;x-=16)
    tft.drawRGBBitmap(x,y,HomeFrog,16,16);
  tft.displayBuffer();
  y-=2;
  if(y<-16)
    y=127;
  ESP.wdtEnable(1000);
}