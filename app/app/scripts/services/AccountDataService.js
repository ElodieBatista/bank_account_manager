'use strict';

angular.module('bamApp').factory('accountDataService', function ($q) {
  return {
    getCheckingAccountsMonth: function(month) {
      var deferred = $q.defer();

      var checkingAccounts = [
        {
          id: 0,
          name: 'Bank Of America',
          startAmount: 1000,
          transactions: [
            {
              name: 'BART',
              date: new Date(),
              isDone: true,
              value: -90,
              category: {
                id: 10,
                name: 'Transportation',
                color: 'rgb(228, 108, 10)'
              },
              way: {
                id: 4,
                name: 'Credit Card'
              }
            }
          ]
        },
        {
          id: 1,
          name: 'Chase',
          startAmount: 2000,
          transactions: [
            {
              name: 'Muni',
              date: new Date(),
              isDone: true,
              value: -120,
              category: {
                id: 10,
                name: 'Transportation',
                color: 'rgb(228, 108, 10)'
              },
              way: {
                id: 4,
                name: 'Credit Card'
              }
            }
          ]
        }
      ];

      deferred.resolve(checkingAccounts);

      return deferred.promise;
    }
  }
});