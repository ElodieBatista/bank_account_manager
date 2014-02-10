'use strict';

var module = angular.module('bamApp');

module.config(function config($routeProvider) {
    $routeProvider
        .when('/',
        {
            templateUrl: 'views/checkingAccounts.html',
            controller: 'CheckingAccountCtrl'
        })
});

module.controller('CheckingAccountCtrl', function CheckingAccountCtrl($scope, accountService, settingsService, categoryService, accountDataService) {

    var result = accountDataService.getCheckingAccounts();

    if (result !== undefined) {
        result.then(function(dataCheckingAccounts) {
            $scope.checkingAccounts = [];
            var i = 0;
            for (var account in dataCheckingAccounts) {
                $scope.checkingAccounts.push(dataCheckingAccounts[account]);

                $scope.checkingAccounts[i].name = account;
                $scope.checkingAccounts[i].transactionsArray = [];

                for (var transaction in $scope.checkingAccounts[i].transactions) {
                    for (var t_month in $scope.checkingAccounts[i].transactions[transaction]) {
                        for (var j = 0, l = $scope.checkingAccounts[i].transactions[transaction][t_month].length; j < l; j++) {
                            $scope.checkingAccounts[i].transactionsArray.push($scope.checkingAccounts[i].transactions[transaction][t_month][j]);
                        }

                    }
                }
                i++;
            }

            for (var k = 0, le = $scope.checkingAccounts.length; k < le; k++) {
                $scope.checkingAccounts[k].amount = accountService.getCurrentAmount($scope.checkingAccounts[k]);
                $scope.checkingAccounts[k].futureAmount = accountService.getCurrentAmount($scope.checkingAccounts[k]);
            }
        }, function() {
            console.log('Error');
        });
    }

    $scope.getCheckingAccountsForMonth = function (monthNb) {
        $scope.month = settingsService.getMonths()[parseInt(monthNb) - 1];
        //$scope.$apply();
    };

    $scope.categories = categoryService.getCategories();

    $scope.ways = settingsService.getWays();
});