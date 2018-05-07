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
			    res.redirect('/loggedprofile');
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
		var name = req.query["name"]
	    var options = req.query["option"];
        var optionsArr = options.split(",");
		if(optionsArr.length > 0){
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
