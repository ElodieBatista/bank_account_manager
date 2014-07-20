'use strict';

angular.module('bamApp').factory('settingsDataService', function ($q) {
  return {
    getFirstMonthOfYear: function () {
      var deferred = $q.defer();

      deferred.resolve(11);

      return deferred.promise;
    }
  };
});