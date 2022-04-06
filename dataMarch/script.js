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
    websocket.send(sliderNumber+"s"+sliderValue.toString());
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
	for(var i=10; i<27;i++){
	//changes slider Value: to 0
	document.getElementById("sliderValue"+i.toString()).innerHTML = "0";
	//changes slider to postion 0
	document.getElementById("slider"+i.toString()).value = "0";
	}	
	for(var i=10; i<22;i++){
	//calls updateSliderPWM() to change the servo values that are connected to each slider
	updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

/*When the first saved configuration button is clicked, the bOne() function is called
and changes specific sliders to certain values and calls updateSliderPWM() to change
the corresponding servo*/
function bOne(){ //Maritza
	//changes slider Value: to 5
	document.getElementById("sliderValue19").innerHTML = "180";
	//changes slider to postion 5
	document.getElementById("slider19").value = "180";
	
	document.getElementById("sliderValue20").innerHTML = "180";
	document.getElementById("slider20").value = "180";
	//change servo position
	updateSliderPWM(document.getElementById("slider19"));
	updateSliderPWM(document.getElementById("slider20"));
}
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

function palatoglossusLR(element) {//Maritza
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue16").innerHTML = sliderValue;
	document.getElementById("sliderValue17").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider16").value = sliderValue;
	document.getElementById("slider17").value = sliderValue;
	//change servo value
    for(var i = 16; i<18; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function superiorInferior(element) {//Maritza
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue20").innerHTML = sliderValue;
	document.getElementById("sliderValue21").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider20").value = sliderValue;
	document.getElementById("slider21").value = sliderValue;
	//change servo value
    for(var i = 20; i<22; i++){
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
