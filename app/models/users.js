'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	poll:{
		name: String,
		option:{
			name: String,
			clicks: Number
		}
	}
});
module.exports = mongoose.model('User', User);