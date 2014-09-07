'use strict';

angular.module('bamApp').config(function config($routeProvider) {
  $routeProvider
    .when('/reports',
    {
      templateUrl: 'views/reports.tpl.html',
      controller: 'ReportsCtrl'
    })
}).controller('ReportsCtrl', function ($scope, apiService) {
  apiService.ReportSpendingByCategory.get(function(res) {
    $scope.spendingByCategory = res.data;
  });

  apiService.ReportIncomingByCategory.get(function(res) {
    $scope.incomingByCategory = res.data;
  });

  apiService.ReportTransactionsByCategory.get(function(res) {
    $scope.transactionsByCategory = res.data;
  });
});