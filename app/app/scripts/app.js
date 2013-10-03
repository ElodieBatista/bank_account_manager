'use strict';

angular.module('bamApp', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'CheckingAccountCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);