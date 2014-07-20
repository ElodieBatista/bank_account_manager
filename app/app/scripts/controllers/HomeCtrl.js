'use strict';

angular.module('bamApp').config(function config($routeProvider) {
  $routeProvider
    .when('/',
    {
      templateUrl: 'views/home.tpl.html',
      controller: 'HomeCtrl'
    })
}).controller('HomeCtrl', function ($scope, $rootScope, accountService) {
  $scope.test = 'test';

  $rootScope.currViewMonth = new Date().getMonth() + 1;

  accountService.getCheckingAccountsMonth($rootScope.currViewMonth).then(function(accounts) {
    $scope.checkingAccounts = accounts;
  });


  $rootScope.changeViewMonth = function(month) {
    $rootScope.currViewMonth = month;
  };

  $rootScope.$watch('currViewMonth', function () {
    $scope.getViewMonth($rootScope.currViewMonth);
  });

  $scope.getViewMonth = function(month) {
    $scope.test = month;
    accountService.getCheckingAccountsMonth(month).then(function(accounts) {
      $scope.checkingAccounts = accounts;
    });
  }
});