'use strict';

angular.module('bamApp').config(function config($routeProvider) {
  $routeProvider
    .when('/settings',
    {
      templateUrl: 'views/settings.tpl.html',
      controller: 'SettingsCtrl'
    })
}).controller('SettingsCtrl', function ($scope, apiService, settingsService) {
  apiService.Account.get(function(res) {
    $scope.accounts = res.data;
  });

  apiService.AccountType.get(function(res) {
    $scope.accounttypes = {};

    for (var i = 0, l = res.data.length; i < l; i++) {
      $scope.accounttypes[res.data[i]._id] = res.data[i];
    }
  });


  apiService.Currency.get(function(res) {
      $scope.currencies = {};

      for (var i = 0, l = res.data.length; i < l; i++) {
          $scope.currencies[res.data[i]._id] = res.data[i];
      }
  });

  apiService.Category.get(function(res) {
    $scope.categories = res.data;
  });

  $scope.months = settingsService.getMonths();

  $scope.newAccount = function(account) {
    apiService.Account.post({'account':account}, function(res) {
      $scope.accounts.push(res.data);
    }, function(err) { /*$scope.errorShow(err);*/ console.log(err); });
  };

  $scope.editFirstMonthOfYear = function(form) {
  	
  };
});