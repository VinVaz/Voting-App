'use strict';

const path = process.cwd();
const ClickHandler = require(path + '/app/controllers/clickHandler_server.js');
const LoggedHandler = require(path + '/app/controllers/privateUserHandler_server.js');
var pollServer = require(path + '/app/controllers/pollHandler_server.js');
var mypollsServer = require(path + '/app/controllers/mypollsHandler_server.js');

module.exports = function(app, passport){
	
	var clickHandler = new ClickHandler();
	var loggedHandler = new LoggedHandler();
	
	app.route('/').get(function(req, res){
		if(req.isAuthenticated()){
			res.sendFile(path + '/public/loggedindex.html');
		}
		else{
			res.sendFile(path + '/public/index.html');
		}
	});
	app.route('/home').get(function(req, res){
	    res.redirect('/');
	});
	app.route('/profile').get(function(req, res){
		if(req.isAuthenticated()){
			res.sendFile(path + '/public/loggedprofile.html');
		}
		else{
			res.sendFile(path + '/public/profile.html');
		}
	});
	app.route('/logout')
        .get(function(req, res){
			req.logout();
			res.redirect('/home');
		});

	////////////////IF LOGGED///////////////////////////
	app.route('/newpoll').get(function(req, res){
		res.sendFile(path + '/public/newpoll.html');
	});
	app.route('/mypolls').get(function(req, res){
		res.sendFile(path + '/public/mypolls.html');
	});
		////////
	app.route('/api/:user/user').get(function(req, res){
		if(req.isAuthenticated()){
			res.json(req.user.github)
		}
		else{
			res.redirect('/home')
		}
	});
		
	app.route('/api/:user/polls')
	    .get(mypollsServer);
	////////
	app.route('/newoption/add')
		.get(loggedHandler.addOption)
	
	app.route('/newpoll/add')
		.get(loggedHandler.addPoll)
		.delete(loggedHandler.deletePoll);
	
	app.route('/newpoll/delete')
		.get(loggedHandler.deletePoll)
	/////////////////////////////////////////////////////
	app.route('/profile/:poll').get(function(req, res){
		   req.session.poll = req.params.poll
		   res.redirect('/profile');
	});
    app.route('/current').get(function(req, res){
		if(req.session.poll){
			res.json(req.session.poll)
		}
		else res.redirect('/home');
	});
	app.route('/profile/:poll/api/clicks')
	    .get(clickHandler.getClicks)
    
	app.route('/profile/:poll/api/clicks/update')
	    .get(clickHandler.addClicks)	
		
	app.route('/api/polls')
	    .get(pollServer);
	app.route('/auth/github')
		.get(passport.authenticate('github'));
	
	app.route('/auth/github/callback')
	    .get(passport.authenticate('github', {
		    successRedirect: '/',
		    failureRedirect: '/'
	    }));
	
}