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
      }
    };
});