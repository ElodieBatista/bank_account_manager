'use strict';

angular.module('bamApp').controller('CheckingAccountCtrl', function ($scope, settingsService) {
  $scope.getCheckingAccountsForMonth = function (monthNb) {
    $scope.month = settingsService.getMonths()[parseInt(monthNb) - 1];
    $scope.$apply();
  };
});