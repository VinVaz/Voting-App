'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler_server.js');

module.exports = function(app){
	
	var clickHandler = new ClickHandler();
	
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
	    .get(clickHandler.getClicks)
		.post(clickHandler.addClicks);
}