'use strict';

var path = process.cwd();
var Users = require('../models/users.js');

module.exports = function pollApiServer(req, res){  

Users
  .find({}, {'_id': false, 'poll.name': true})
  .exec(function(err, result){
    if(err){throw err;}
    var message = [];
    for(var i = 0; i < result.length; i++){
	  if(result[i].poll.name){
		message.push(result[i].poll.name);	
	  }
    }
    res.json(message);
  });
};



