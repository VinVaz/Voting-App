'use strict';
var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', function(req, res){
	res.send("It's alive!");
});

app.listen(8080, function(){
	console.log("Listening on port 8080...");
});