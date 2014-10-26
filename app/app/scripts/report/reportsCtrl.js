'use strict';

angular.module('bamApp').config(function config($routeProvider) {
    $routeProvider
        .when('/reports',
        {
            templateUrl: 'scripts/report/reports.tpl.html',
            controller: 'ReportsCtrl'
        })
}).controller('ReportsCtrl', function ($scope, apiService, settingsService) {
    var currYear = settingsService.getCurrentYear().name;

    apiService.ReportSpendingByCategory.get({'year': currYear}, function(res) {
        $scope.spendingByCategory = res.data;
    });

    apiService.ReportIncomingByCategory.get({'year': currYear}, function(res) {
        $scope.incomingByCategory = res.data;
    });

    apiService.ReportTransactionsByCategory.get({'year': currYear}, function(res) {
        $scope.transactionsByCategory = res.data;
    });

    apiService.ReportTransactionsEvolution.get({'year': currYear}, function(res) {
        $scope.transactionsEvolution = res.data;
        $scope.differenceByMonth = res.data;
    });

    apiService.ReportAccountsByMonth.get({'year': currYear}, function(res) {
        $scope.accountsByMonth = res.data;
    });

    apiService.ReportTotalByMonth.get({'year': currYear}, function(res) {
        $scope.totalByMonth = res.data;
        $scope.total = $scope.totalByMonth.series[0].data[11];
        $scope.savings = $scope.totalByMonth.series[0].data[11] - $scope.totalByMonth.series[0].data[0];
    });

    apiService.ReportSpendingByCategoryAndMonth.get({'year': currYear}, function(res) {
        $scope.spendingByCategoryAndMonth = res.data;
    });

    apiService.ReportIncomingByCategoryAndMonth.get({'year': currYear}, function(res) {
        $scope.incomingByCategoryAndMonth = res.data;
    });

    apiService.ReportTotalByAccounttype.get({'year': currYear}, function(res) {
        if (res.data.series[0].name === 'checking') {
            $scope.totalCheckingAccounts = res.data.series[0].data[11];
            $scope.totalSavingAccounts = res.data.series[1].data[11];
        } else {
            $scope.totalCheckingAccounts = res.data.series[1].data[11];
            $scope.totalSavingAccounts = res.data.series[0].data[11];
        }
    });
});