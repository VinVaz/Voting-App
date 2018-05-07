'use strict';

var path = process.cwd();
var Users = require('../models/users.js');

module.exports = function pollApiServer(req, res){  
  Users
    .find({}, {'_id': false, 'polls.name': true})
      .exec(function(err, result){
        if(err){throw err;}
        var message = [];
		for(var i = 0; i < result.length; i++){
          var userArr = result[i].polls;
		  if(userArr){
			  for(var j = 0; j < userArr.length; j++){
			    message.push(userArr[j]);
		      } 
		  }
		 
        }
        res.json(message);
      });
};



