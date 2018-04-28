'use strict';

const path = process.cwd();
const ClickHandler = require(path + '/app/controllers/clickHandler_server.js');
const LoggedHandler = require(path + '/app/controllers/privateUserHandler_server.js');
var pollServer = require(path + '/app/controllers/pollHandler_server.js');

module.exports = function(app){
	var clickHandler = new ClickHandler();
	var loggedHandler = new LoggedHandler();
	
	app.route('/').get(function(req, res){
		res.sendFile(path + '/public/index.html');
	});
	app.route('/home').get(function(req, res){
	    res.redirect('/');
	});
	app.route('/profile').get(function(req, res){
		res.sendFile(path + '/public/profile.html');
	});
	app.route('/api/clicks')
	    .get(clickHandler.getClicks);
		
	app.route('/api/clicks/update')
	    .get(clickHandler.addClicks);
		
	app.route('/api/polls')
	    .get(pollServer);
	/*	
	app.route('/api/clicks/user')
	    .post(loggedHandler.addOption)
		.delete(loggedHandler.deleteOption);
	
	app.route('/api/user')
		.post(loggedHandler.addPoll)
		.delete(loggedHandler.deletePoll);
     */   		
}