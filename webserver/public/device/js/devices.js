'use strict'

var audioSource = document.querySelector("select#audioSource");
var audioInput = document.querySelector("select#audioInput");
var audioOuput = document.querySelector("select#audioOutput");
var videoInput = document.querySelector("select#videoIutput");
var videoOnput = document.querySelector("select#videoOutput");

if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
	console.log('undefind devices');
} else {
	navigator.mediaDevices.enumerateDevices()
		.then(getDevices)
		.catch(getError);
}

function getDevices(devicesInfos) {
	devicesInfos.forEach(function (deviceInfo) {

		var option = document.createElement("option");
		option.text = deviceInfo.label;
		option.value = deviceInfo.deviceId;
		if (deviceInfo.kind === "audioinput") {
			audioInput.appendChild(option);
		} else if (deviceInfo.kind === "audiooutput") {
			audioOuput.appendChild(option);
		} else if(deviceInfo.kind === 'videoinput') {
			videoInput.appendChild(option);
		} else if (deviceInfo.kind === 'videooupt') {
			videoOnput.appendChild(option);
		}
	});
}

function getError(err) { console.log(err.message + " : " + err.name); }

