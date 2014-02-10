'use strict';

angular.module('bamApp').controller('CheckingAccountCtrl', function ($scope, accountService, settingsService, categoryService, accountDataService) {


    accountDataService.getCheckingAccounts().then(function(dataCheckingAccounts) {
        $scope.checkingAccounts = [];
        for (var account in dataCheckingAccounts) {
            $scope.checkingAccounts.push(account);

            $scope.checkingAccounts.transactionsArray = [];

            for (var transaction in account.transactions) {
                for (var t_year in transaction) {
                    for (var t_month in t_year) {
                        for (var i = 0, l = t_month.length; i < l; i++) {
                            $scope.checkingAccounts.transactionArray.push(t_month[i]);
                        }
                    }

                }
            }
        }

        /*for (var i = 0, l = $scope.checkingAccounts.length; i < l; i++) {
            $scope.checkingAccounts[i].amount = accountService.getCurrentAmount($scope.checkingAccounts[i]);
            $scope.checkingAccounts[i].futureAmount = accountService.getCurrentAmount($scope.checkingAccounts[i]);
        }
        $scope.$apply();*/
    }, function() {
        console.log('tutute');
    });

    $scope.getCheckingAccountsForMonth = function (monthNb) {
        $scope.month = settingsService.getMonths()[parseInt(monthNb) - 1];
        //$scope.$apply();
    };

    $scope.categories = categoryService.getCategories();

    $scope.ways = settingsService.getWays();
});