'use strict';

var _ = require('lodash');
var Parameter = require('./parameter.model');
var regex = require('node-regexp');

// Get list of parameters
exports.index = function (req, res) {
	Parameter.find()
	.sort({ parameter: 'asc' })
	.exec(function (err, parameters) {
		if (err) { return handleError(res, err); }
		return res.json(200, parameters);
	});	
};

// Get a single parameter
exports.show = function (req, res) {
	Parameter.findById(req.params.id, function (err, parameter) {
		if (err) { return handleError(res, err); }
		if (!parameter) { return res.send(404); }
		return res.json(parameter);
	});
};

// Creates a new parameter in the DB.
exports.create = function (req, res) {
	Parameter.create(parseBodyToDocument(req.body), 
		function (err, parameter) {
			if (err) { return handleError(res, err); }
			return res.json(parameter);
	});
};

// Updates an existing parameter in the DB.
exports.update = function (req, res) {
	//if (req.body._id) { delete req.body._id; }
	Parameter.findById(req.params.id, function (err, parameter) {
		if (err) { return handleError(res, err); }
		if (!parameter) { return res.send(404); }
		//var updated = _.merge(parameter, parseBodyToDocument(req.body));
		parameter.valueList = req.body.valueList;
		parameter.save(function (err) {
			if (err) { return handleError(res, err); }
			return res.json(200, parameter);
		});
	});
};

// Deletes a parameter from the DB.
exports.destroy = function (req, res) {
	Parameter.findById(req.params.id, function (err, parameter) {
		if (err) { return handleError(res, err); }
		if (!parameter) { return res.send(404); }
		parameter.remove(function (err) {
			if (err) { return handleError(res, err); }
			return res.send(200);
		});
	});
};

function parseBodyToDocument(reqBody) {
	return { 
		parameter: reqBody.parameterName, 
		valueList: [] 
	};
}

function handleError(res, err) {
	return res.send(500, err);
}