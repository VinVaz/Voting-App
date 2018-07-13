'use strict';

var path = process.cwd();
var Users = require('../models/users.js');

function PollHandler(){
    
	this.addOption = function(req, res){
		var name = req.session.poll;
	    var option = req.query["newoption"];
	    Users
	        .findOneAndUpdate({$and: [{"poll.options.name": {$ne: option}}, {"poll.name": name}]}, {$push: {"poll.options": {"name":option, "clicks": 1}}})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.redirect('/profile');
		    });
	};
	this.addPoll = function(req, res){
		var name = req.query["name"];
	    var options = req.query["option"];
        var optionsArr = options.split(",");
		var profile = req.user.twitter;

		
	    if(optionsArr.length > 0){

				var newUser = new Users({
				  "twitter.id" : profile.id,
				  "twitter.username" : profile.username,
				  "twitter.displayName" : profile.displayName,
				  "poll.name" : name
				});
		
			newUser.save(function(err){
				if(err){throw err;}
				else{
					for(var i=0; i<optionsArr.length; i++){
					  var mongoQuery = {"poll.name": name};
					  var mongoOperator = {$addToSet: {"poll.options": {"name":optionsArr[i], "clicks": 1}}}
					  Users
						.update(mongoQuery, mongoOperator, {upsert:true})
						.exec(function(err, result){
						  if(err){throw err;}
						});
					}	
				}
			});
	    }
    res.redirect('/newpoll');		
	};
	this.deletePoll = function(req, res){	
	    var name = req.session.poll
		Users    
			.deleteOne({"poll.name": name})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.redirect('/home');
		    });
	};
}
module.exports = PollHandler;
