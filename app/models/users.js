'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github:{
		id: String,
		displayName: String,
		username: String,
		publicRepos: Number
	},
	poll:{
		name: String,
		options:[
		    {   
			    _id: false,
			    name: String,
			    clicks: Number
		    }
		]
	}
});
module.exports = mongoose.model('User', User);