'use strict';

angular.module('bamApp').factory('settingsService', function ($q) {
  return {
    firstMonthOfYear: null,

    getFirstMonthOfYear: function() {
      /*var deferred = $q.defer();

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
      }*/

      return 1;
    },

    // TODO: be careful with first month of Year
    getYearOfMonth: function(month) {
      return '2014';
    },

    getMonths: function() {
      return [
        {
          number: 1,
          name: 'January'
        },
        {
          number: 2,
          name: 'February'
        },
        {
          number: 3,
          name: 'March'
        },
        {
          number: 4,
          name: 'April'
        },
        {
          number: 5,
          name: 'May'
        },
        {
          number: 6,
          name: 'June'
        },
        {
          number: 7,
          name: 'July'
        },
        {
          number: 8,
          name: 'August'
        },
        {
          number: 9,
          name: 'September'
        },
        {
          number: 10,
          name: 'October'
        },
        {
          number: 11,
          name: 'November'
        },
        {
          number: 12,
          name: 'December'
        }
      ];
    }
  };
});