'use strict';

angular.module('bamApp').config(function config($routeProvider) {
    $routeProvider
        .when('/accounts/:month/reports',
        {
            templateUrl: 'scripts/account/monthlyReport/monthlyReport.tpl.html',
            controller: 'MonthlyReportCtrl'
        })
}).controller('MonthlyReportCtrl', function ($scope, $rootScope, $routeParams, $q, $translate, apiService, settingsService) {
    $rootScope.currViewMonth = parseInt($routeParams.month);
    var currYear = settingsService.getCurrentYear().name;

    function translateData(data) {
        var deferred = $q.defer();
        $translate(data).then(function (translations) {
            var result = [];
            for (var prop in translations) {
                result.push(translations[prop]);
            }
            return deferred.resolve(result);
        });
        return deferred.promise;
    }

    apiService.ReportSpendingByCategory.get({'year':currYear, 'month':$rootScope.currViewMonth}, function(res) {
        var categories = [];
        for (var i = 0, l = res.data.length; i < l; i++) {
            categories.push(res.data[i].name);
        }
        translateData(categories).then(function(data) {
            for (var i = 0, l = res.data.length; i < l; i++) {
                res.data[i].name = data[i];
            }
            $scope.spendingByCategory = res.data;
        });
    });

    apiService.ReportIncomingByCategory.get({'year':currYear, 'month':$rootScope.currViewMonth}, function(res) {
        var categories = [];
        for (var i = 0, l = res.data.length; i < l; i++) {
            categories.push(res.data[i].name);
        }
        translateData(categories).then(function(data) {
            for (var i = 0, l = res.data.length; i < l; i++) {
                res.data[i].name = data[i];
            }
            $scope.incomingByCategory = res.data;
        });
    });

    apiService.ReportTransactionsByCategory.get({'year':currYear, 'month':$rootScope.currViewMonth}, function(res) {
        translateData(res.data.categories).then(function(categories) {
            var legend = [];
            for (var i = 0, l = res.data.series.length; i < l; i++) {
                legend.push(res.data.series[i].name);
            }
            translateData(legend).then(function(data) {
                for (var i = 0, l = res.data.series.length; i < l; i++) {
                    res.data.series[i].name = data[i];
                }
                $scope.transactionsByCategory = {
                    categories: categories,
                    series: res.data.series
                };
            });
        });
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