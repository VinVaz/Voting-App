'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
	mongoose = require('mongoose');

var app = express();

mongoose.connect(process.env.MONGO_URI);	

	app.use('/controllers', express.static(process.cwd()+'/app/controllers'));
	app.use('/public', express.static(process.cwd()+'/public'));
	app.use('/common', express.static(process.cwd()+'/app/common'));
	
	routes(app);
var PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
	console.log("Node.js listening on port: "+ PORT +"...");
});

