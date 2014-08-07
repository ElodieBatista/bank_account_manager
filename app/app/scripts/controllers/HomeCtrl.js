'use strict';

angular.module('bamApp').config(function config($routeProvider) {
  $routeProvider
    .when('/',
    {
      templateUrl: 'views/home.tpl.html',
      controller: 'HomeCtrl'
    })
}).controller('HomeCtrl', function ($scope, $rootScope, apiService, settingsService) {
  $scope.selectedTab = 1;

  $rootScope.currViewMonth = new Date().getMonth() + 1;

  apiService.Account.get(function(res) {
    $scope.accounts = res.data;

    for (var i = 0, l = $scope.accounts.length; i < l; i++) {
      $scope.accounts[i].amount = $scope.getAmounts($scope.accounts[i], $rootScope.currViewMonth);
    }
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

    for (var i = 0, l = $scope.accounts.length; i < l; i++) {
      $scope.accounts[i].amount = $scope.getAmounts($scope.accounts[i], $rootScope.currViewMonth);
    }
  };


  $scope.getAmounts = function(account, currMonth) {
    var firstMonth = settingsService.getFirstMonthOfYear();

    if ((firstMonth <= account.creation_month && (currMonth < account.creation_month && currMonth >= firstMonth)) ||
      (firstMonth > account.creation_month && (currMonth < account.creation_month || currMonth >= firstMonth))) {
      return { curr: 0, future: 0 };
    }

    var currAmount = account.creation_amount;
    var futureAmount = account.creation_amount;
    for (var i = account.creation_month; i <= currMonth; i++) {
      for (var j = 0, l = account.transactions[i].length; j < l; j++) {
          futureAmount += account.transactions[i][j].value;
        if (account.transactions[i][j].isDone) {
          currAmount += account.transactions[i][j].value;
        }
      }
    }

    return { curr: currAmount, future: futureAmount };
  }
});