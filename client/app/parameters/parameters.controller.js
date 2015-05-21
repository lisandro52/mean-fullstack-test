'use strict';

angular.module('afTestApp')

	.controller('ParametersCtrl', function (Param, $scope) {
	    
		var vm = $scope;
		
		vm.modified = false;
		
		Param.all()
			.success(function(incomingParams) {
				vm.processing = false;
				vm.params = incomingParams;
			});
			
		vm.modifiedInput = function() {
			vm.modified = true;
		};
		
		vm.addNewValue = function(itemId) {
			vm.params.filter(function(x) {
				return x._id === itemId;
			})[0].valueList.push({ value: '' });
			vm.modified = true;
		};
		
		vm.removeValue = function(itemId) {
			var param = vm.params.filter(function(x) {
				return x._id === itemId;
			})[0];
			
			param.valueList.splice(-1, 1);
			vm.modified = true;
		};
		
		vm.updateParam = function() {
			vm.params.forEach(function(param/*, index, array*/) {
				Param.update(param._id, param);
			});
			vm.modified = false;
		};
		
		vm.createNewParameter = function() {
			Param.create(vm.parameterData)
				.success(function(incomingParam) {
					vm.parameterData = '';
					vm.params.push(incomingParam);
				});
		};
		
		vm.deleteParameter = function(paramId) {
			Param.delete(paramId)
				.success(function() {
					vm.params = vm.params.filter(function(p) {
						return p._id !== paramId;
					});
				});
		};
});
