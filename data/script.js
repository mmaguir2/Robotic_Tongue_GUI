// Complete project details: https://randomnerdtutorials.com/esp32-web-server-websocket-sliders/

var gateway = `ws://${window.location.hostname}/ws`;
var websocket;
window.addEventListener('load', onload);

function onload(event) {
    initWebSocket();
}

function getValues(){
    websocket.send("getValues");
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Connection opened');
    getValues();
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function updateSliderPWM(element) {
    var sliderNumber = element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
    console.log(sliderValue);
    websocket.send(sliderNumber+"s"+sliderValue.toString());
}

function onMessage(event) {
    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);

    for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        document.getElementById(key).innerHTML = myObj[key];
        document.getElementById("slider"+ (i+1).toString()).value = myObj[key];
    }
}
function logoutButton() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/logout", true);
  xhr.send();
  setTimeout(function(){ window.open("/logged-out","_self"); }, 1000);
}

function resetButton(){
	for(var i=1; i<10;i++){
	//changes slider Value: to zero
	document.getElementById("sliderValue"+i.toString()).innerHTML = "0";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "0";
	updateSliderPWM(document.getElementById("slider"+i.toString()));
	}	
}

function bOne(){
	var i = 1;
	//changes slider Value: to zero
	document.getElementById("sliderValue"+i.toString()).innerHTML = "5";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "5";
	i = 2;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "10";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "10";
	i = 3;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "15";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "15";
	i = 4;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "20";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "20";
	i = 5;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "25";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "25";
	i = 6;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "30";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "30";
	i = 7;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "35";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "35";
	i = 8;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "40";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "40";
	i = 9;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "45";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "45";
	
	for(var i=1; i<10;i++){
	updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
