'use strict'

var videoPlay = document.querySelector("video#player");
var audioInput = document.querySelector("select#audio_input");
var audioOutput = document.querySelector("select#audio_output");
var videoInput = document.querySelector("select#video_input");
function getMediaStream(stream) {
    videoPlay.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
}

function handleError(errr) {
    console.log(errr.name);
}

function getDevices(deviceInfos) {
    deviceInfos.forEach(function (deviceInfo) {

        var option = document.createElement("option");
        option.text = deviceInfo.label;
        option.value = deviceInfo.deviceId;
        if(deviceInfo.kind === 'audioinput') {
            audioInput.appendChild(option);
        } else if (deviceInfo.kind === "audiooutput") {
            audioOutput.appendChild(option);
        } else if (deviceInfo.kind === "videoinput") {
            videoInput.appendChild(option);
        }
    });
}


if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.log('unsupport media captor');
} else {

    var constraints = {
        video: true,
        audio: true
    };
    navigator.mediaDevices.getUserMedia(constraints)
        .then(getMediaStream)
        .then(getDevices)
        .catch(handleError);
}