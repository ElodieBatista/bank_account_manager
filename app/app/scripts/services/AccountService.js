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
        },*/

        getCurrentAmount: function(account) {
            var totalTransactions = 0;
            for (var i = 0, l = account.transactionsArray.length; i < l; i++) {
                totalTransactions += account.transactionsArray[i].amount;
            }

            return account.startAmount + totalTransactions;
        }
    }
});