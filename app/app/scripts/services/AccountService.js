'use strict';

angular.module('bamApp').factory('accountService', function ($q, accountDataService) {
  return {
    checkingAccounts: null,

    getCheckingAccounts: function() {
      var deferred = $q.defer();

      if (this.checkingAccounts === null) {
        var that = this;

        accountDataService.getCheckingAccounts().then(function(dataCheckingAccounts) {
          that.checkingAccounts = dataCheckingAccounts;

          deferred.resolve(that.checkingAccounts);
        }, function() {
          console.log('Error');
        });

        return deferred.promise;
      } else {
        return this.checkingAccounts;
      }
    },

    getCurrentAmount: function(account) {
      return account.amountsEndOfEachMonth[account.lastMonthSaved.getFullYear()][account.lastMonthSaved.getMonth()];
    }
  }
});