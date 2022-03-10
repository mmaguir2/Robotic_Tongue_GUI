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
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
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
	for(var i=10; i<27;i++){
	//changes slider Value: to zero
	document.getElementById("sliderValue"+i.toString()).innerHTML = "0";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "0";
	}	
	for(var i=10; i<22;i++){
	updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function bOne(){
	//changes slider Value: to 5
	document.getElementById("sliderValue10").innerHTML = "5";
	//changes slider to postion 5
	document.getElementById("slider10").value = "5";
	
	document.getElementById("sliderValue11").innerHTML = "10";
	document.getElementById("slider11").value = "10";
	
	document.getElementById("sliderValue12").innerHTML = "15";
	document.getElementById("slider12").value = "15";

	document.getElementById("sliderValue13").innerHTML = "20";
	document.getElementById("slider13").value = "20";

	document.getElementById("sliderValue14").innerHTML = "25";
	document.getElementById("slider14").value = "25";
	//only update servos of slider values that dont move two at a time
	for(var i=10; i<15;i++){
	updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
//One slider moving two values---------------------------------------------------------------------------------------------------
function genioAP(element) {
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
    for(var i = 10; i<12; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
function hyoglossusLR(element) {
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
    for(var i = 12; i<14; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function styloglossusLR(element) {
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
    for(var i = 14; i<16; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function palatoglossusLR(element) {
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
    for(var i = 16; i<18; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function superiorInferior(element) {
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
    for(var i = 20; i<22; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
