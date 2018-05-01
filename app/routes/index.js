'use strict';

const path = process.cwd();
const ClickHandler = require(path + '/app/controllers/clickHandler_server.js');
const LoggedHandler = require(path + '/app/controllers/privateUserHandler_server.js');
var pollServer = require(path + '/app/controllers/pollHandler_server.js');

module.exports = function(app){
	function isLogged(req, res, next){
		var ImLogged = false;
		if(ImLogged){
			return next();
		}else{
			res.redirect('/loggedprofile');
		}
	}
	
	var clickHandler = new ClickHandler();
	var loggedHandler = new LoggedHandler();
	
	app.route('/').get(function(req, res){
		res.sendFile(path + '/public/index.html');
	});
	app.route('/home').get(function(req, res){
	    res.redirect('/');
	});
	app.route('/profile').get(isLogged, function(req, res){
		   res.sendFile(path + '/public/profile.html');
	});
	////////////////IF LOGGED///////////////////////////
	app.route('/newpoll').get(function(req, res){
		res.sendFile(path + '/public/newpoll.html');
	});
	app.route('/mypolls').get(function(req, res){
		res.sendFile(path + '/public/mypolls.html');
	});
	app.route('/loggedprofile').get(function(req, res){
		res.sendFile(path + '/public/loggedprofile.html');
	});
	/////////////////////////////////////////////////////
	app.route('/profile/:poll').get(function(req, res){
		   req.session.poll = req.params.poll
		   res.redirect('/profile');
	});
	app.route('/profile/:poll/api/clicks')
	    .get(clickHandler.getClicks)
    
	app.route('/profile/:poll/api/clicks/update')
	    .get(clickHandler.addClicks)	
    
	app.route('/api/polls')
	    .get(pollServer);
	
	app.route('/newoption').get(function(req, res){
		res.sendFile(path + '/public/newoption.html');
	});
	
	app.route('/newoption/add')
		.get(loggedHandler.addOption)
	
	app.route('/newpoll/add')
		.get(loggedHandler.addPoll)
		.delete(loggedHandler.deletePoll);
	
	app.route('/newpoll/delete')
		.get(loggedHandler.deletePoll)
}