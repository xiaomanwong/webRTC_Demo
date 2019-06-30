
'use strict'

var https = require('https');
var fs = require('fs');
var options = {
	key : fs.readFileSync('./cert/2429716_wong.xiaoman.ren.key'),
	cert : fs.readFileSync('./cert/2429716_wong.xiaoman.ren.pem')
}

var app = https.createServer(options, function(req, res) {
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('Https: Hello World');
}).listen(10090, '0.0.0.0');

