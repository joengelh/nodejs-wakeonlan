// import modules
var util = require('util'),
    exec = require('child_process').exec,
    child;
var wol = require('wake_on_lan');
var ping = require('net-ping');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// serve static index.html
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Content-Security-Policy", "default-src *  data: blob: filesystem: about: ws: wss: 'unsafe-inline' 'unsafe-eval' 'unsafe-dynamic'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * data: blob: 'unsafe-inline';font-src * data: blob: 'unsafe-inline';");
    return next();
});
app.use(express.static('./public'));
app.listen(8080, () => console.log('listening on port 8080'));

// wake server based on mac address
app.post('/wake', function(req, res) {
	console.log(req);
	wol.wake(req.body.mac);
	res.send("woke");
});

app.post('/ping', function(req, res) {
	console.log(req);
	var child = exec('ping -c 1 ' + req.body.address + '; echo $?', function(error, stdout, stderr) {
		if (error) console.log(error);
		lastLine = stdout.slice(-2)
		process.stdout.write(stdout);
		process.stderr.write(stderr);
		res.send(lastLine);
	});
});
