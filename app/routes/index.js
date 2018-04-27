'use strict';

const path = process.cwd();
const ClickHandler = require(path + '/app/controllers/clickHandler_server.js');
const PollHandler = require(path + '/app/controllers/pollHandler_server.js')

module.exports = function(app){
	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();
	
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
		
	app.route('/api/clicks/user')
	    .post(pollHandler.addOption)
		.delete(pollHandler.deleteOption);
	
	app.route('/api/user')
		.post(pollHandler.addPoll)
		.delete(pollHandler.deletePoll);
        		
}