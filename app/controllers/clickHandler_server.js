'use strict';

var path = process.cwd();
var Users = require('../models/users.js');

function ClickHandler(){

	this.getClicks = function(req, res){  
		Users
		    .findOne({}, {'_id': false})
			.exec(function(err, result){
			    if(err){ throw err};
			    res.json(result.poll);			
			});
	};
	this.addClicks = function(req, res){
		Users
		    .findOneAndUpdate({}, {$inc: {'poll.option.clicks': 1}})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.json(result.poll);
		    });
	};
}
module.exports = ClickHandler;
