'use strict';

var path = process.cwd();
var Users = require('../models/users.js');

function PollHandler(){
    
	this.addOption = function(req, res){  
		Users
		    .findOneAndUpdate({"poll.name": "Biggest Country"}, {$push: {"poll.options": {"name":"canada", "clicks": 0}}}, {'_id': false})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.json(result);
		    });
		    
	};
	this.deleteOption = function(req, res){  
		Users
		    .findOneAndUpdate({"poll.name": "Biggest Country"}, {$set: {"poll.options": []}})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.json(result);
		    });
	}; 
	this.addPoll = function(req, res){
		Users
		    .create({"poll": {"name": "Best food", "options": []}})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.json(result);
		    });
	};
	this.deletePoll = function(req, res){	
		Users    
			.deleteOne({"poll.name":"Best food"})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.json(result);
		    });
	};
}
module.exports = PollHandler;
