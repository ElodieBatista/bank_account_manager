'use strict';

angular.module('bamApp').factory('accountService', function($q, accountDataService) {
    return {
        /*getCheckingAccounts: function() {
            var deferred = $q.defer();

            accountDataService.getCheckingAccounts().then(function(dataCheckingAccounts) {
                deferred.resolve(dataCheckingAccounts);
            }, function() {
                console.log('Error');
                deferred.reject();
            });

            return deferred.promise;
        },

        getCurrentAmount: function(account) {
            var totalTransactions = 0;
            for (var i = 0, l = account.transactions.getNumberOfRows(); i < l; i++) {
                totalTransactions += account.transactions.getValue(i, 2);
            }

            return account.startAmount + totalTransactions;
        }*/

        getCheckingAccounts: function() {

        }
    }
});