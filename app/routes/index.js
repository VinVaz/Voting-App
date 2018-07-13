'use strict';

const path = process.cwd();
const ClickHandler = require(path + '/app/controllers/clickHandler_server.js');
const LoggedHandler = require(path + '/app/controllers/privateUserHandler_server.js');
var pollServer = require(path + '/app/controllers/pollHandler_server.js');
var mypollsServer = require(path + '/app/controllers/mypollsHandler_server.js');

module.exports = function(app, passport){
	
	var clickHandler = new ClickHandler();
	var loggedHandler = new LoggedHandler();
	
	
	//AUTHENTICATION:	
	app.get('/auth/twitter', passport.authenticate('twitter'));
	app.get('/auth/twitter/callback', 
	  passport.authenticate('twitter', { failureRedirect: '/' }),
	  function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/');
	  });
	
	app.get('/', function(req, res){
		if(req.isAuthenticated()){
			res.sendFile(path + '/public/loggedindex.html');
		} else {
			res.sendFile(path + '/public/index.html');
		}
	});
	app.get('/home', function(req, res){
	    res.redirect('/');
	});
	app.get('/profile', function(req, res){
		if(req.isAuthenticated()){
			res.sendFile(path + '/public/loggedprofile.html');
		} else{
			res.sendFile(path + '/public/profile.html');
		}
	});
	app.get('/newpoll', function(req, res){
		res.sendFile(path + '/public/newpoll.html');
	});
	app.get('/mypolls', function(req, res){
		res.sendFile(path + '/public/mypolls.html');
	});
	
	app.route('/logout')
        .get(function(req, res){
			req.logout();
			res.redirect('/home');
		});	
	
	app.route('/api/:user/user').get(function(req, res){
		if(req.isAuthenticated()){
			//req.user is provided by passport after the authentication
			res.json(req.user.twitter);
		} else{
			res.redirect('/home');
		}
	});
	app.route('/api/:user/polls')
	    .get(mypollsServer)
		.delete(loggedHandler.deletePoll)

    //from now on the currently viewed poll is saved in session:
	app.route('/profile/:poll')
	  .get(function(req, res){
		   req.session.poll = req.params.poll;
		   res.redirect('/profile');
	  }) 
	
	app.get('/newoption/add', loggedHandler.addOption);	
	app.get('/newpoll/add', loggedHandler.addPoll)
		
   
	app.route('/profile/:poll/api/clicks')
	    .get(clickHandler.getClicks)
	app.route('/profile/:poll/api/clicks/update')
	    .get(clickHandler.addClicks)	
		
	app.route('/current').get(function(req, res){
		if(req.session.poll){
			res.json(req.session.poll)
		}
		else res.redirect('/home');
	});
	
	app.get('/api/polls', pollServer);
}