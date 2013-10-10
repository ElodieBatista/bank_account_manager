'use strict';

angular.module('bamApp').controller('CheckingAccountCtrl', function ($scope, accountService, settingsService, categoryService) {
  var result = accountService.getCheckingAccounts();

  if (result.then !== undefined) {
    result.then(function (dataCheckingAccounts) {
      $scope.checkingAccounts = dataCheckingAccounts;

      for (var i = 0, l = $scope.checkingAccounts.length; i < l; i++) {
        $scope.checkingAccounts[i].amount = accountService.getCurrentAmount($scope.checkingAccounts[i]);
        $scope.checkingAccounts[i].futureAmount = accountService.getCurrentAmount($scope.checkingAccounts[i]) - 100;
      }
    });
  } else {
    $scope.checkingAccounts = result;
  }

  $scope.getCheckingAccountsForMonth = function (monthNb) {
    $scope.month = settingsService.getMonths()[parseInt(monthNb) - 1];
    //$scope.$apply();
  };

  $scope.categories = categoryService.getCategories();

  $scope.ways = settingsService.getWays();
});