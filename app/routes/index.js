'use strict';

var path = process.cwd();

module.exports = function(app){
	app.route('/').get(function(req, res){
		res.sendFile(path + '/public/index.html');
	});
	app.route('/home').get(function(req, res){
	    res.redirect('/');
	});
	app.route('/profile').get(function(req, res){
		res.sendFile(path + '/public/profile.html');
	});
}