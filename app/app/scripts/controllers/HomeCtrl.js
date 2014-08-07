'use strict';

angular.module('bamApp').config(function config($routeProvider) {
  $routeProvider
    .when('/',
    {
      templateUrl: 'views/home.tpl.html',
      controller: 'HomeCtrl'
    })
}).controller('HomeCtrl', function ($scope, $rootScope, apiService) {
  $scope.selectedTab = 1;

  $rootScope.currViewMonth = new Date().getMonth() + 1;

  apiService.Account.get(function(res) {
    $scope.accounts = res.data;
  });

  apiService.AccountType.get(function(res) {
    $scope.accounttypes = {};

    for (var i = 0, l = res.data.length; i < l; i++) {
      $scope.accounttypes[res.data[i]._id] = res.data[i];
    }
  });

  apiService.Category.get(function(res) {
    $scope.categories = {};

    for (var i = 0, l = res.data.length; i < l; i++) {
      $scope.categories[res.data[i]._id] = res.data[i];
    }
  });

  apiService.Paymethod.get(function(res) {
    $scope.paymethods = {};

    for (var i = 0, l = res.data.length; i < l; i++) {
      $scope.paymethods[res.data[i]._id] = res.data[i];
    }
  });

  $rootScope.changeViewMonth = function(month) {
    $rootScope.currViewMonth = month;
  };
});