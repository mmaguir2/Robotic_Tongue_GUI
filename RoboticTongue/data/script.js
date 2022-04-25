/*References
[1] R. Santos and S. Santos. "ESP32 Web Server (WebSocket) with Multiple 
Sliders: Control LEDs Brightness (PWM)" randomnerdtutorials.com. 
https://randomnerdtutorials.com/esp32-web-server-websocket-sliders/ (accessed April 5, 2022).
*/
//BEGIN: [1] ---------------------------------------------------------------------------------------------------
//For more information about code marked with [1] please visit https://randomnerdtutorials.com/esp32-web-server-websocket-sliders/ 
var gateway = `ws://${window.location.hostname}/ws`; /*"The gateway is the entry
point to the WebSocket interface.window.location.hostname gets the current page
address (the web server IP address)"[1].*/
var websocket;//"global variable"[1]
var delayInMilliseconds = 1000;
var global1 = 0;
var global2 = 0;
const myTimeout = setTimeout("hello", 5000);
window.addEventListener('load', onload); /*"Add an event listener that will call 
the onload function when the web page loads"[1].*/

function onload(event) { /*"The onload() function calls the initWebSocket() 
function to initialize a WebSocket connection with the server"[1].*/
    initWebSocket();  
}

function getValues(){  /*"The getValues() function sends a message to the server 
getValues to get the current value of all sliders. Then, we must handle what 
happens when we receive that message on the server side (ESP32)"[1]*/
    websocket.send("getValues");
}

function initWebSocket() {  /*"The initWebSocket() function initializes a 
WebSocket connection on the gateway defined earlier. We also assign several
callback functions for when the WebSocket connection is opened, closed, or
when a message is received"[1].*/
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {  /*"Note that when the websocket connection in open,
we’ll call the getValues function" [1].*/
    console.log('Connection opened');
    getValues();
}

function onClose(event) {  //[1]
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function updateSliderPWM(element) {  /*"The updateSliderPWM() function runs when you
move the sliders. This function gets the value from the slider and updates the 
corresponding paragraph with the right value. This function also sends a message 
to the server so that the ESP32 updates the LED brightness"[1].*/
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1); //Maritza changed this line
    var sliderValue = document.getElementById(element.id).value;
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
    console.log(sliderValue);
    websocket.send(sliderNumber+" "+sliderValue.toString());
}



function onMessage(event) {  /*"We handle the messages received via websocket 
protocol on the onMessage() function. The onMessage() function simply goes through
all the values and places them on the corresponding places on the HTML page"[1]*/
    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);
    for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        document.getElementById(key).innerHTML = myObj[key];
        document.getElementById("slider"+ (i+1).toString()).value = myObj[key];
    }
}
//END: [1] ---------------------------------------------------------------------------------------------------

//************************************************************************************************************

//Begin: Maritza and Nathan Implementation---------------------------------------------------------------------------------------------------

/*When the logout button on the UI is clicked, the logoutButton() function is called.*/
function logoutButton() { //Nathan
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/logout", true);
  xhr.send();
  setTimeout(function(){ window.open("/logged-out","_self"); }, 1000);
}

/*When the rest button is clicked, the resetButton() function goes through all slider 
numbers and changes the position and value to 0*/
function resetButton(){ //Maritza
	for(var i=10; i<23;i++){
	//changes slider Value: to 0
	document.getElementById("sliderValue"+i.toString()).innerHTML = "0";
	//changes slider to postion 0
	document.getElementById("slider"+i.toString()).value = "0";
	}	
	for(var i=10; i<20;i++){
	//calls updateSliderPWM() to change the servo values that are connected to each slider
	updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

/*When the first saved configuration button is clicked, the bOne() function is called
and changes specific sliders to certain values and calls updateSliderPWM() to change
the corresponding servo*/
function depress(){ //Maritza
	//changes Genio A slider Value: to 180
	document.getElementById("sliderValue10").innerHTML = "180";
	//changes Genio A slider to postion 180
	document.getElementById("slider10").value = "180";
	//changes Genio P slider Value: to 180
	document.getElementById("sliderValue11").innerHTML = "180";
	//changes Genio P slider to postion 180
	document.getElementById("slider11").value = "180";
	//changes hyoglossus L slider Value: to 180
	document.getElementById("sliderValue12").innerHTML = "180";
	//changes hyoglossus L slider to position 180
	document.getElementById("slider12").value = "180";
	//changes hyoglossus R slider Value: to 180
	document.getElementById("sliderValue13").innerHTML = "180";
	//changes hyoglossus R slider to position 180
	document.getElementById("slider13").value = "180";
	
	//change servo position
	//Genio A
	updateSliderPWM(document.getElementById("slider10"));
	//Genio P
	updateSliderPWM(document.getElementById("slider11"));
	//Hyoglossus L
	updateSliderPWM(document.getElementById("slider12"));
	//Hyoglossus R
	updateSliderPWM(document.getElementById("slider13"));
}
//Retract
function retract(){ //Maritza 
	//changes superior long slider Value: to 180
	document.getElementById("sliderValue18").innerHTML = "120";
	document.getElementById("slider18").value = "120";
	//changes inferior long slider Value: to 180
	document.getElementById("sliderValue19").innerHTML = "120";
	document.getElementById("slider19").value = "120";
	
	updateSliderPWM(document.getElementById("slider18"));
	updateSliderPWM(document.getElementById("slider19"));
}

//BEGIN: functions for Lick button ----------------------------------Nathan
function leftMovement(){
	//changes superior long slider Value: to 120
	document.getElementById("sliderValue18").innerHTML = "120";
	document.getElementById("slider18").value = "120";
	
	updateSliderPWM(document.getElementById("slider18"));
	
	setTimeout(center,1000);
}
function center(){
	//changes superior long slider Value: to 0
	document.getElementById("sliderValue18").innerHTML = "0";
	document.getElementById("slider18").value = "0";
	
	updateSliderPWM(document.getElementById("slider18"));
	setTimeout(rightMovement(), 1000);
}
function rightMovement(){
	//changes inferior long slider to 120
	document.getElementById("sliderValue19").innerHTML = "120";
	document.getElementById("slider19").value = "120";
	
	updateSliderPWM(document.getElementById("slider19"));
	setTimeout(center2,1000);
}
function center2(){
	//changes inferior long slider to 0
	document.getElementById("sliderValue19").innerHTML = "0";
	document.getElementById("slider19").value = "0";
	
	updateSliderPWM(document.getElementById("slider19"));
	if(global1 < 3) { global1++; setTimeout(leftMovement,1000); }
	else { }
}
function upDown(){
	leftMovement();
}
//END: functions for Lick button ----------------------------------

//BEGIN: functions for DANCE button ----------------------------------Nathan
function circleDown(){ 
	//inferior longitudinal on
	//hyoglossus right off
	
	//changes hyoglossus right slider Value: to 0
	document.getElementById("sliderValue13").innerHTML = "0";
	document.getElementById("slider13").value = "0";
	//changes Inferior Longitudinal to 120
	document.getElementById("sliderValue19").innerHTML = "120";
	document.getElementById("slider19").value = "120";
	
	updateSliderPWM(document.getElementById("slider19"));
	updateSliderPWM(document.getElementById("slider13"));
	setTimeout(circleDownLeft, 500);
}
function circleDownLeft(){ 
	//inferior longitudinal on
	//hyoglossus left on
	//changes hyoglossus leftslider Value: to 120
	document.getElementById("sliderValue12").innerHTML = "120";
	document.getElementById("slider12").value = "120";
	
	updateSliderPWM(document.getElementById("slider12"));
	setTimeout(circleLeft, 500);
}
function circleLeft(){
	//styloglossus left on
	//inferior longitudinal off
	//hyoglossus left off
	
	//changes Styloglossus Left to 120
	document.getElementById("sliderValue14").innerHTML = "120";
	document.getElementById("slider14").value = "120";
	//Hyoglossus Left to 0
	document.getElementById("sliderValue12").innerHTML = "0";
	document.getElementById("slider12").value = "0";
	//Inferior Longitudinal to 0
	document.getElementById("sliderValue19").innerHTML = "0";
	document.getElementById("slider19").value = "0";
	
	updateSliderPWM(document.getElementById("slider19"));
	updateSliderPWM(document.getElementById("slider12"));
	updateSliderPWM(document.getElementById("slider14"));
	setTimeout(circleUpLeft, 500);
}
function circleUpLeft(){
	//superior longitudinal to 120
	
	document.getElementById("sliderValue18").innerHTML = "120";
	document.getElementById("slider18").value = "120";
	
	updateSliderPWM(document.getElementById("slider18"));
	setTimeout(circleUp, 500);
}
function circleUp(){
	//styloglossus left off (to 0)
	
	document.getElementById("sliderValue14").innerHTML = "0";
	document.getElementById("slider14").value = "0";
	
	updateSliderPWM(document.getElementById("slider14"));
	setTimeout(circleUpRight, 500);
}
function circleUpRight(){
	//styloglossus right on (to 120)
	
	document.getElementById("sliderValue15").innerHTML = "120";
	document.getElementById("slider15").value = "120";
	
	updateSliderPWM(document.getElementById("slider15"));
	setTimeout(circleRight, 500);
}
function circleRight(){
	//superior longitudinal off(to zero)
	
	document.getElementById("sliderValue18").innerHTML = "0";
	document.getElementById("slider18").value = "0";
	
	updateSliderPWM(document.getElementById("slider18"));
	setTimeout(circleDownRight, 500);
}
function circleDownRight(){
	//styloglossus right off (0) to 0
	document.getElementById("sliderValue15").innerHTML = "0";
	document.getElementById("slider15").value = "0";
	//hyoglossus right on (to 120)
	document.getElementById("sliderValue13").innerHTML = "120";
	document.getElementById("slider13").value = "120";
	//inferior longitudinal on (to 120)
	document.getElementById("sliderValue19").innerHTML = "120";
	document.getElementById("slider19").value = "120";
	
	updateSliderPWM(document.getElementById("slider19"));
	updateSliderPWM(document.getElementById("slider13"));
	updateSliderPWM(document.getElementById("slider15"));
	if(global2 < 2){ global2++; setTimeout(circleDown, 500); }
	else { 
		document.getElementById("sliderValue19").innerHTML = "120";
		document.getElementById("slider19").value = "120";
		
		updateSliderPWM(document.getElementById("slider19"));
	} 

function dance(){
	circleDown();
}
//END: functions for DANCE button ----------------------------------


//BEGIN: One slider moving two values ---------------------------------------------------------------------------------------------------
//The functions below are connected with the sliders that move two other sliders simultaneously.
function genioAP(element) { //Maritza
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue10").innerHTML = sliderValue;
	document.getElementById("sliderValue11").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider10").value = sliderValue;
	document.getElementById("slider11").value = sliderValue;
	//change servo value
    for(var i = 10; i<12; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
function hyoglossusLR(element) { //Maritza
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue12").innerHTML = sliderValue;
	document.getElementById("sliderValue13").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider12").value = sliderValue;
	document.getElementById("slider13").value = sliderValue;
	//change servo value
    for(var i = 12; i<14; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function styloglossusLR(element) {//Maritza
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue14").innerHTML = sliderValue;
	document.getElementById("sliderValue15").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider14").value = sliderValue;
	document.getElementById("slider15").value = sliderValue;
	//change servo value
    for(var i = 14; i<16; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

//END:One slider moving two values ---------------------------------------------------------------------------------------------------

//BEGIN:EDUACTION PAGE BUTTONS---------------------------------------------------------------------------------------------------
function educationPage() { //Maritza
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/education", true);
  xhr.send();
  setTimeout(function(){ window.open("/education","_self"); }, 1000);

}

function backToHomePg() { //Maritza
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/", true);
  xhr.send();
  setTimeout(function(){ window.open("/","_self"); }, 1000);

}

//END:EDUCATION PAGE ---------------------------------------------------------------------------------------------------

/* 
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-web-server-websocket-sliders/
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*/
