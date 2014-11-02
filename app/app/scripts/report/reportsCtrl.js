'use strict';

angular.module('bamApp').config(function config($routeProvider) {
    $routeProvider
        .when('/reports',
        {
            templateUrl: 'scripts/report/reports.tpl.html',
            controller: 'ReportsCtrl'
        })
}).controller('ReportsCtrl', function ($scope, $q, $translate, apiService, settingsService) {
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

    apiService.ReportSpendingByCategory.get({'year': currYear}, function(res) {
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
    }, function(err) { console.log(err); });

    apiService.ReportIncomingByCategory.get({'year': currYear}, function(res) {
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
    }, function(err) { console.log(err); });

    apiService.ReportTransactionsByCategory.get({'year': currYear}, function(res) {
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
    }, function(err) { console.log(err); });

    apiService.ReportTransactionsEvolution.get({'year': currYear}, function(res) {
        translateData(res.data.categories).then(function(categories) {
            var legend = [];
            for (var i = 0, l = res.data.series.length; i < l; i++) {
                legend.push(res.data.series[i].name);
            }
            translateData(legend).then(function (data) {
                for (var i = 0, l = res.data.series.length; i < l; i++) {
                    res.data.series[i].name = data[i];
                }
                $scope.transactionsEvolution = {
                    categories: categories,
                    series: res.data.series
                };
            });
        });
        $scope.differenceByMonth = res.data;
    }, function(err) { console.log(err); });

    apiService.ReportAccountsByMonth.get({'year': currYear}, function(res) {
        translateData(res.data.categories).then(function(categories) {
            res.data.categories = categories;
            $scope.accountsByMonth = res.data;
        });
    }, function(err) { console.log(err); });

    apiService.ReportTotalByMonth.get({'year': currYear}, function(res) {
        translateData(res.data.categories).then(function(categories) {
            var legend = [];
            for (var i = 0, l = res.data.series.length; i < l; i++) {
                legend.push(res.data.series[i].name);
            }
            translateData(legend).then(function (data) {
                for (var i = 0, l = res.data.series.length; i < l; i++) {
                    res.data.series[i].name = data[i];
                }
                res.data.categories = categories;
                $scope.totalByMonth = res.data;
                $scope.total = $scope.totalByMonth.series[0].data[11];
                $scope.savings = $scope.totalByMonth.series[0].data[11] - $scope.totalByMonth.series[0].data[0];
            });
        });
    }, function(err) { console.log(err); });

    apiService.ReportSpendingByCategoryAndMonth.get({'year': currYear}, function(res) {
        $scope.spendingByCategoryAndMonth = res.data;
    }, function(err) { console.log(err); });

    apiService.ReportIncomingByCategoryAndMonth.get({'year': currYear}, function(res) {
        $scope.incomingByCategoryAndMonth = res.data;
    }, function(err) { console.log(err); });

    apiService.ReportTotalByAccounttype.get({'year': currYear}, function(res) {
        if (res.data.series[0].name === 'checking') {
            $scope.totalCheckingAccounts = res.data.series[0].data[11];
            $scope.totalSavingAccounts = res.data.series[1].data[11];
        } else {
            $scope.totalCheckingAccounts = res.data.series[1].data[11];
            $scope.totalSavingAccounts = res.data.series[0].data[11];
        }
    }, function(err) { console.log(err); });
});