'use strict';

angular.module('afTestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('parameters', {
        url: '/parameters',
        templateUrl: 'app/parameters/parameters.html',
        controller: 'ParametersCtrl'
      });
  });