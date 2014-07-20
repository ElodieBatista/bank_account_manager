'use strict';

angular.module('bamApp').factory('accountService', function($q, accountDataService) {
  return {
    getCheckingAccountsMonth: function(month) {
      var deferred = $q.defer();

      accountDataService.getCheckingAccountsMonth(month).then(function(dataAccounts) {
        deferred.resolve(dataAccounts);
      }, function() {
        console.log('Error');
      });

      return deferred.promise;
    }/*,

    getCurrentAmount: function(account) {
      var totalTransactions = 0;
      for (var i = 0, l = account.transactionsArray.length; i < l; i++) {
        totalTransactions += account.transactionsArray[i].amount;
      }

      return account.startAmount + totalTransactions;
    }*/
  }
});