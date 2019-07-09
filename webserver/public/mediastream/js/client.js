'use strict'

var videoPlay = document.querySelector("video#player");
var audioInput = document.querySelector("select#audio_input");
var audioOutput = document.querySelector("select#audio_output");
var videoInput = document.querySelector("select#video_input");
var videoConstants = document.querySelector("div#constants");

var audioPlay = document.querySelector("audio#audio_player");

// 截图
var takePhoto = document.querySelector("button#take_photo");
var picture = document.querySelector("canvas#picture");
picture.width = 640;
picture.height = 480;

// 视频录制
var record = document.querySelector("video#rec_player");
var recRecord = document.querySelector("button#record");
var recPlay = document.querySelector("button#rec_play");
var recDownload = document.querySelector("button#rec_download");

var mediaRecord;
var buffer;


function getMediaStream(stream) {
    videoPlay.srcObject = stream;
    var videoTrack = stream.getVideoTracks()[0];
    var videoConstraints = videoTrack.getSettings();
    window.stream = stream;
    videoConstants.textContent = JSON.stringify(videoConstraints, null, 2);
    // audioPlay.srcObject = stream;
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
        if (deviceInfo.kind === 'audioinput') {
            audioInput.appendChild(option);
        } else if (deviceInfo.kind === "audiooutput") {
            audioOutput.appendChild(option);
        } else if (deviceInfo.kind === "videoinput") {
            videoInput.appendChild(option);
        }
    });
}



if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
// if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
    console.log('unsupport media captor');
} else {

    var constraints = {
        // video: false,
        video: {
            // 动态配置
            width: {
                max: 640,
                min: 480
            },
            height: 720,
            // 缩放比例
            // aspectRadio: 0.2
            // 帧率， 15 帧以下会有视觉卡顿效果， 一般设置在 40/60 帧, 部分设备有极致限制
            frameRate: 20,
            // 摄像头模式  user: 前置  environment: 后置  left： 前置左侧 right: 前置右侧
            facingMode: 'left'
        },
        audio: false
        // audio: {
        // autoGainControl: true,
        // latency: 8000,
        // volume: 0,
        // noiseSuppression: true,
        // echoCancellation: true
        // }
    };
    navigator.mediaDevices.getUserMedia(constraints)
    // navigator.mediaDevices.getDisplayMedia(constraints)
        .then(getMediaStream)
        .then(getDevices)
        .catch(handleError);
}




takePhoto.onclick = function () {
    picture.getContext('2d').drawImage(
        videoPlay, 0, 0, picture.width, picture.height

    );
}

// 录制视频
recRecord.onclick = () => {
    if (recRecord.textContent === 'Start Record') {
        recRecord.textContent = 'Stop Record';
        recPlay.disabled = true;
        recDownload.disabled = true;
        startRecord();
    } else {
        stopRecord();
        recRecord.textContent = 'Start Record';
        recPlay.disabled = false;
        recDownload.disabled = false;
    }
}

function handleDataAvailable (e){
    if(e && e.data && e.data.size > 0){
        buffer.push(e.data);
    }
}


function startRecord() {
    buffer = [];
    var options = {
        mimeType: 'video/webm;codecd=vp8'
    }

    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error("${options.mimeType} is not supported!");
        return;
    }

    try {
        mediaRecord = new MediaRecorder(window.stream, options);
    } catch (e) {
        console.error("Create Media Record Failed:", e);
    }
    mediaRecord.ondataavailable = handleDataAvailable;
    mediaRecord.start(10);
}

function stopRecord() {
    mediaRecord.stop();
}

recPlay.onclick = () => {
    var bolb = new Blob(buffer, {type: 'video/webm'});
    record.src = window.URL.createObjectURL(bolb);

    record.play();
}

recDownload.onclick = () => {
    var blob = new Blob(buffer, {type: 'video/webm'});
    var a = document.createElement('a');
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'record.webm'
    a.click();
}