'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session');
	
var app = express();
//dotenv allows tha loading of environment variables from .env
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);	
mongoose.Promise = global.Promise;

	app.use('/controllers', express.static(process.cwd()+'/app/controllers'));
	app.use('/public', express.static(process.cwd()+'/public'));
	app.use('/common', express.static(process.cwd()+'/app/common'));
	
	app.use(session({
		secret: 'bb65e7ju764h3gtrbv',
		resave: true,
		saveUninitialized: false
	}));

	app.use(passport.initialize());
	app.use(passport.session());
	
	routes(app, passport);
    var PORT = process.env.PORT || 8080;

    app.listen(PORT, function(){
	console.log("Node.js is listening on port: " + PORT + "...");
});

