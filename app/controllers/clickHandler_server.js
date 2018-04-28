'use strict';

var path = process.cwd();
var Users = require('../models/users.js');
var URL = require('url');

//only works for one query
function queryParser(req){
  var myQuery = URL.parse(req.url).query;
  var arr = "";
  if(myQuery){
	var arr = myQuery.split("=");
    arr[0] = arr[0].replace(/[+]/g, " ");
  }
 return arr;  
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
		var answer = queryParser(req)[1];
		var question = queryParser(req)[0];
		var operator = {$inc: {"poll.options.$.clicks": 1}}
		Users
		    .findOneAndUpdate({"poll.name": question, "poll.options.name": answer}, operator)
			.exec(function(err, result){
			    if(err){throw err;}
		    });
        res.redirect('back');		
	};
}
module.exports = ClickHandler;
