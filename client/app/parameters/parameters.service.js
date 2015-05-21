'use strict';

angular.module('afTestApp')
	.factory('Param', function ($http) {

	var paramFactory = {};
	
	//get all params
	paramFactory.all = function () {
		return $http.get('/api/parameters');
	};
	
	paramFactory.create = function (paramData) {
		return $http.post('/api/parameters', paramData);
	};
	
	paramFactory.update = function(id, paramData) {
		return $http.put('/api/parameters/' + id, paramData);
	};
	
	paramFactory.delete = function(id) {
		return $http.delete('/api/parameters/' + id);
	};
	
	return paramFactory;
});
