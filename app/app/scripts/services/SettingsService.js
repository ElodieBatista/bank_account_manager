'use strict';

angular.module('bamApp').factory('settingsService', function ($q, settingsDataService) {
    return {
      firstMonthOfYear: null,

      getFirstMonthOfYear: function() {
        var deferred = $q.defer();


        if (this.firstMonthOfYear === null) {
          var that = this;

          settingsDataService.getFirstMonthOfYear().then(function(dataFirstMonthOfYear) {
            that.firstMonthOfYear = dataFirstMonthOfYear;

            deferred.resolve(that.firstMonthOfYear);
          }, function() {
            console.log('Error');
          });

          return deferred.promise;
        } else {
          return this.firstMonthOfYear;
        }
      },

      getMonths: function() {
        return [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ];
      },

      getWays: function() {
        return [
          {
            id: 0,
            name: 'Withdrawal'
          },
          {
            id: 1,
            name: 'Check'
          },
          {
            id: 2,
            name: 'Cash'
          },
          {
            id: 3,
            name: 'Levy'
          },
          {
            id: 4,
            name: 'Credit Card'
          }
        ];
      }
    };
});