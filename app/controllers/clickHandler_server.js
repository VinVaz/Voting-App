'use strict';

var path = process.cwd();
var Users = require('../models/users.js');
var URL = require('url');

function ClickHandler(){
	this.getClicks = function(req, res){	
		Users
		    .findOne({"poll.name": req.session.poll}, {'_id': false, 'poll': true})
			.exec(function(err, result){
			    if(err){ throw err};
			    res.json(result);			
			});
	};
	this.addClicks = function(req, res){
		var option = req.query[req.session.poll];
		var operator = {$inc: {"poll.options.$.clicks": 1}}
		Users
		    .findOneAndUpdate({"poll.name": req.session.poll, "poll.options.name": option}, operator)
			.exec(function(err, result){
			    if(err){throw err;}
		    });
        res.redirect('back');		
	};
}

module.exports = ClickHandler;
