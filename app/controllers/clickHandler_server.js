'use strict';

var path = process.cwd();
var Users = require('../models/users.js');

function ClickHandler(){

	this.getClicks = function(req, res){  
		Users
		    .findOne({"poll.name": "Best food"}, {'_id': false, 'poll': true})
			.exec(function(err, result){
			    if(err){ throw err};
			    res.json(result);			
			});
	};
	this.addClicks = function(req, res){
		Users
		    .findOneAndUpdate({"poll.name": "Best food"}, {$inc: {'poll.options.1.clicks': 1}})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.json(result);
		    });
	};
}
module.exports = ClickHandler;
