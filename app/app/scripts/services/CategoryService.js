'use strict';

angular.module('bamApp').factory('categoryService', function ($q, apiService) {
  return {
    categories: null,

    getCategories: function() {
      var deferred = $q.defer();

      if (this.categories === null) {
        var that = this;

        apiService..getCategories().then(function(dataCategories) {
          that.categories = dataCategories;

          deferred.resolve(that.categories);
        }, function() {
          console.log('Error');
        });

        return deferred.promise;
      } else {
        return this.categories;
      }
    }
  };
});