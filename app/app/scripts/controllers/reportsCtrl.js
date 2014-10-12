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

    apiService.ReportTransactionsEvolution.get(function(res) {
        $scope.transactionsEvolution = res.data;
        $scope.differenceByMonth = res.data;
    });

    apiService.ReportAccountsByMonth.get(function(res) {
        $scope.accountsByMonth = res.data;
    });

    apiService.ReportTotalByMonth.get(function(res) {
        $scope.totalByMonth = res.data;
        $scope.total = $scope.totalByMonth.series[0].data[11];
        $scope.savings = $scope.totalByMonth.series[0].data[11] - $scope.totalByMonth.series[0].data[0];
    });

    apiService.ReportSpendingByCategoryAndMonth.get(function(res) {
        $scope.spendingByCategoryAndMonth = res.data;
    });

    apiService.ReportIncomingByCategoryAndMonth.get(function(res) {
        $scope.incomingByCategoryAndMonth = res.data;
    });

    apiService.ReportTotalByAccounttype.get(function(res) {
        if (res.data.series[0].name === 'checking') {
            $scope.totalCheckingAccounts = res.data.series[0].data[11];
            $scope.totalSavingAccounts = res.data.series[1].data[11];
        } else {
            $scope.totalCheckingAccounts = res.data.series[1].data[11];
            $scope.totalSavingAccounts = res.data.series[0].data[11];
        }
    });
});