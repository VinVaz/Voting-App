'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js');

var app = express();
	
	app.use('/public', express.static(process.cwd()+'/public'));
	
	routes(app);
var PORT = process.env.PORT || 8080;

app.listen(PORT, function(){
	console.log("Node.js listening on port: "+ PORT +"...");
});

