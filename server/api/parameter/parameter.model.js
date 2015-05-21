'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ParameterSchema = new Schema({
	parameter: String,
	valueList: [{
		value: String //Using a wrapper object array instead of a string array because of the angular 2-way binding
	}]
});

module.exports = mongoose.model('Parameter', ParameterSchema);