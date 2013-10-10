'use strict';

angular.module('bamApp').factory('accountDataService', function ($q) {
  return {
    getCheckingAccounts: function() {
      var deferred = $q.defer();

      var checkingAccounts = [
        {
          name: 'Main BoA',
          startAmount: 2500,
          startDate: new Date(2013, 9, 1),
          lastMonthSaved: new Date(2013, 8),
          amountsEndOfEachMonth: {
            2013: [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              2500,
              null,
              null,
              null
            ]
          },
          transactions: [
            {
              title: 'Space Needle Tour',
              amount: '-19',

            }
          ]
        },
        {
          name: 'Chase',
          startAmount: 1800,
          startDate: new Date(2012, 11, 1),
          lastMonthSaved: new Date(2013, 8),
          amountsEndOfEachMonth: {
            2013: [
              900,
              100,
              200,
              3000,
              50,
              12,
              75,
              800,
              125,
              null,
              null,
              null
            ],
            2012: [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              658
            ]
          }
        }
      ];

      deferred.resolve(checkingAccounts);

      return deferred.promise;
    }
  }
});