'use strict';

angular.module('bamApp').factory('accountService', function($q, accountDataService) {
    return {
        getCheckingAccounts: function() {
            var deferred = $q.defer(), that = this, checkingAccounts = [], i = 0;

            var result = accountDataService.getCheckingAccounts();

            if (result !== undefined) {
                result.then(function(dataCheckingAccounts) {
                    for (var account in dataCheckingAccounts) {
                        checkingAccounts.push(dataCheckingAccounts[account]);

                        checkingAccounts[i].name = account;
                        checkingAccounts[i].transactionsArray = [];

                        for (var transaction in checkingAccounts[i].transactions) {
                            for (var t_month in checkingAccounts[i].transactions[transaction]) {
                                for (var j = 0, l = checkingAccounts[i].transactions[transaction][t_month].length; j < l; j++) {
                                    checkingAccounts[i].transactionsArray.push(checkingAccounts[i].transactions[transaction][t_month][j]);
                                }
                            }
                        }
                        i++;
                    }

                    for (var k = 0, le = checkingAccounts.length; k < le; k++) {
                        checkingAccounts[k].amount = that.getCurrentAmount(checkingAccounts[k]);
                        checkingAccounts[k].futureAmount = that.getCurrentAmount(checkingAccounts[k]);
                    }

                    deferred.resolve(checkingAccounts);
                }, function() {
                    console.log('Error retrieving checking accounts.');
                    deferred.reject();
                });
            }

            return deferred.promise;
        },

        getCurrentAmount: function(account) {
            var totalTransactions = 0;
            for (var i = 0, l = account.transactionsArray.length; i < l; i++) {
                totalTransactions += account.transactionsArray[i].amount;
            }

            return account.startAmount + totalTransactions;
        }
    }
});