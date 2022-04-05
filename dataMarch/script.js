/*References
[1] R. Santos and S. Santos. "ESP32 Web Server (WebSocket) with Multiple 
Sliders: Control LEDs Brightness (PWM)" randomnerdtutorials.com. 
https://randomnerdtutorials.com/esp32-web-server-websocket-sliders/ (accessed April 5, 2022).
*/
var gateway = `ws://${window.location.hostname}/ws`; //[1]
var websocket;//[1]
window.addEventListener('load', onload); //[1]

function onload(event) { //[1]
    initWebSocket();  
}

function getValues(){  //[1]
    websocket.send("getValues");
}

function initWebSocket() {  //[1]
    console.log('Trying to open a WebSocket connection…');
    websocket = new WebSocket(gateway);
    websocket.onopen = onOpen;
    websocket.onclose = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {  //[1]
    console.log('Connection opened');
    getValues();
}

function onClose(event) {  //[1]
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function updateSliderPWM(element) {  //[1]
    var sliderNumber = element.id.charAt(element.id.length-2)+element.id.charAt(element.id.length-1); //Maritza changed this line
    var sliderValue = document.getElementById(element.id).value;
    document.getElementById("sliderValue"+sliderNumber).innerHTML = sliderValue;
    console.log(sliderValue);
    websocket.send(sliderNumber+"s"+sliderValue.toString());
}



function onMessage(event) {  //[1]
    console.log(event.data);
    var myObj = JSON.parse(event.data);
    var keys = Object.keys(myObj);
    for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        document.getElementById(key).innerHTML = myObj[key];
        document.getElementById("slider"+ (i+1).toString()).value = myObj[key];
    }
}

function logoutButton() { //Nathan
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/logout", true);
  xhr.send();
  setTimeout(function(){ window.open("/logged-out","_self"); }, 1000);
}

function resetButton(){ //Maritza
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

function bOne(){ //Maritza
	//changes slider Value: to 5
	document.getElementById("sliderValue19").innerHTML = "180";
	//changes slider to postion 5
	document.getElementById("slider19").value = "180";
	
	document.getElementById("sliderValue20").innerHTML = "180";
	document.getElementById("slider20").value = "180";
	
	updateSliderPWM(document.getElementById("slider19"));
	updateSliderPWM(document.getElementById("slider20"));
}
//One slider moving two values---------------------------------------------------------------------------------------------------
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
    for(var i = 20; i<22; i++){
		updateSliderPWM(document.getElementById("slider"+i.toString()));
	}
}
