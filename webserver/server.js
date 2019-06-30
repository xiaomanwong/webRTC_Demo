'use strict'
var http = require('http');
var https = require('https');
var fs = require('fs');

// 需要 npm 安装
var express = require('express');
var serverIndex = require('serve-index');

var app = express();

// 文件位置
app.use(serverIndex('./public'));
// 设置发布路径
app.use(express.static('./public'));


// http server
var http_server = http.createServer(app);
http_server.listen(80, '0.0.0.0');


// https server
var options = {
    key : fs.readFileSync('./cert/2429716_wong.xiaoman.ren.key'),
    cert : fs.readFileSync('./cert/2429716_wong.xiaoman.ren.pem')
}

var https_server = https.createServer(options, app);
https_server.listen(443, '0.0.0.0');