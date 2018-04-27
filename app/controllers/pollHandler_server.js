'use strict';

var path = process.cwd();
var Users = require('../models/users.js');

function PollHandler(){
    
	this.addOption = function(req, res){  
		Users
	.findOneAndUpdate({$and: [{"poll.options.name": {$ne:"japan"}}, {"poll.name": "Best country"}]}, {$push: {"poll.options": {"name":"japan", "clicks": 1}}})
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
		Users.create({"poll.name": "Best country"})	
	};
	this.deletePoll = function(req, res){	
		Users    
			.deleteOne({"poll.name":"Places"})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.json(result);
		    });
	};
}
module.exports = PollHandler;
