'use strict';

var path = process.cwd();
var Users = require('../models/users.js');
var URL = require('url');

//only works the form request has only one value
function getQueryAnswerFromReq(req){
  var myQuery = URL.parse(req.url).query;
  var answer = "";
  if(myQuery){
	answer = myQuery.split("=")[1];
  }
 return answer;  
}

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
		var answer = getQueryAnswerFromReq(req);
		Users
		    .findOneAndUpdate({"poll.name": "Best food"}, {$inc: {'poll.options.0.clicks': 1}})
			.exec(function(err, result){
			    if(err){throw err;}
			    res.json(result);
		    });
	};
}
module.exports = ClickHandler;
