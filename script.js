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
	for(var i=10; i<34;i++){
	//changes slider Value: to zero
	document.getElementById("sliderValue"+i.toString()).innerHTML = "0";
	//changes slider to postion zero
	document.getElementById("slider"+i.toString()).value = "0";
	}	
	for(var i=10; i<27;i++){
	updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function bOne(){
	var i = 10;
	//changes slider Value: to 5
	document.getElementById("sliderValue"+i.toString()).innerHTML = "5";
	//changes slider to postion 5
	document.getElementById("slider"+i.toString()).value = "5";
	i = 11;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "10";
	document.getElementById("slider"+i.toString()).value = "10";
	i = 12;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "15";
	document.getElementById("slider"+i.toString()).value = "15";
	i = 13;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "20";
	document.getElementById("slider"+i.toString()).value = "20";
	i = 14;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "25";
	document.getElementById("slider"+i.toString()).value = "25";
	i = 15;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "30";
	document.getElementById("slider"+i.toString()).value = "30";
	i = 16;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "35";
	document.getElementById("slider"+i.toString()).value = "35";
	i = 17;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "40";
	document.getElementById("slider"+i.toString()).value = "40";
	i = 18;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "45";
	document.getElementById("slider"+i.toString()).value = "45";
	i = 19;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "50";
	document.getElementById("slider"+i.toString()).value = "50";
	i = 20;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "55";
	document.getElementById("slider"+i.toString()).value = "55";
	i = 21;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "60";
	document.getElementById("slider"+i.toString()).value = "60";
	i = 22;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "65";
	document.getElementById("slider"+i.toString()).value = "65";
	i = 23;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "70";
	document.getElementById("slider"+i.toString()).value = "70";
	i = 24;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "75";
	document.getElementById("slider"+i.toString()).value = "75";
	i = 25;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "80";
	document.getElementById("slider"+i.toString()).value = "80";
	i = 26;
	document.getElementById("sliderValue"+i.toString()).innerHTML = "85";
	document.getElementById("slider"+i.toString()).value = "85";
	for(var i=10; i<27;i++){
	updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
//One slider moving two values---------------------------------------------------------------------------------------------------
function hyoglossusLR(element) {
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue13").innerHTML = sliderValue;
	document.getElementById("sliderValue14").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider13").value = sliderValue;
	document.getElementById("slider14").value = sliderValue;
    for(var i = 13; i<15; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function styloglossusLR(element) {
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue15").innerHTML = sliderValue;
	document.getElementById("sliderValue16").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider15").value = sliderValue;
	document.getElementById("slider16").value = sliderValue;
    for(var i = 15; i<17; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function palatoglossusLR(element) {
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue17").innerHTML = sliderValue;
	document.getElementById("sliderValue18").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider17").value = sliderValue;
	document.getElementById("slider18").value = sliderValue;
    for(var i = 17; i<19; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
function transversusLR(element) {
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue19").innerHTML = sliderValue;
	document.getElementById("sliderValue20").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider19").value = sliderValue;
	document.getElementById("slider20").value = sliderValue;
    for(var i = 19; i<21; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
function verticalisLR(element) {
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue21").innerHTML = sliderValue;
	document.getElementById("sliderValue22").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider21").value = sliderValue;
	document.getElementById("slider22").value = sliderValue;
    for(var i = 21; i<23; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}

function superiorLR(element) {
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue23").innerHTML = sliderValue;
	document.getElementById("sliderValue24").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider23").value = sliderValue;
	document.getElementById("slider24").value = sliderValue;
    for(var i = 23; i<25; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
function inferiorLR(element) {
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1);
    var sliderValue = document.getElementById(element.id).value;
	//change slider Value: 
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
	//change left and right slider Value:
	document.getElementById("sliderValue25").innerHTML = sliderValue;
	document.getElementById("sliderValue26").innerHTML = sliderValue;
	//move  left and right slider position
	document.getElementById("slider25").value = sliderValue;
	document.getElementById("slider26").value = sliderValue;
    for(var i = 25; i<26; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}