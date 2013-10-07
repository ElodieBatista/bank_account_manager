'use strict';

angular.module('bamApp', [])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/checkingAccounts.html',
        controller: 'CheckingAccountCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);