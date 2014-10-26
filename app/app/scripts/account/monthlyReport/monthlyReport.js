'use strict';

angular.module('bamApp').controller('MonthlyReportCtrl', function ($scope, $rootScope, $routeParams, apiService, settingsService) {
    $rootScope.currViewMonth = parseInt($routeParams.month);
    var currYear = settingsService.getCurrentYear().name;

    apiService.ReportSpendingByCategory.get({'year':currYear, 'month':$rootScope.currViewMonth}, function(res) {
        $scope.spendingByCategory = res.data;
    });

    apiService.ReportIncomingByCategory.get({'year':currYear, 'month':$rootScope.currViewMonth}, function(res) {
        $scope.incomingByCategory = res.data;
    });

    apiService.ReportTransactionsByCategory.get({'year':currYear, 'month':$rootScope.currViewMonth}, function(res) {
        $scope.transactionsByCategory = res.data;
    });

    apiService.ReportTotalByMonth.get({'year':currYear}, function(res) {
        $scope.total = res.data.series[0].data[$rootScope.currViewMonth - 1];
        $scope.savings = res.data.series[0].data[$rootScope.currViewMonth - 1] - res.data.series[0].data[0];
    });

    apiService.ReportTotalByAccounttype.get({'year':currYear}, function(res) {
        if (res.data.series[0].name === 'checking') {
            $scope.totalCheckingAccounts = res.data.series[0].data[$rootScope.currViewMonth - 1];
            $scope.totalSavingAccounts = res.data.series[1].data[$rootScope.currViewMonth - 1];
        } else {
            $scope.totalCheckingAccounts = res.data.series[1].data[$rootScope.currViewMonth - 1];
            $scope.totalSavingAccounts = res.data.series[0].data[$rootScope.currViewMonth - 1];
        }
    });
});