'use strict';

angular.module('bamApp').factory('categoryDataService', function ($q) {
  return {
    getCategories: function() {
      var deferred = $q.defer();

      var categories = [
        {
          name: 'Insurance',
          color: 'rgb(0, 112, 92)'
        },
        {
          name: 'Gift',
          color: 'rgb(255, 192, 0)'
        },
        {
          name: 'Divers',
          color: 'rgb(112, 48, 160)'
        },
        {
          name: 'School',
          color: 'rgb(255, 153, 255)'
        },
        {
          name: 'Tax',
          color: 'rgb(228, 108, 10)'
        },
        {
          name: 'Technology',
          color: 'rgb(228, 108, 10)'
        },
        {
          name: 'Rent',
          color: 'rgb(228, 108, 10)'
        },
        {
          name: 'Health',
          color: 'rgb(228, 108, 10)'
        },
        {
          name: 'Food',
          color: 'rgb(228, 108, 10)'
        },
        {
          name: 'Salary',
          color: 'rgb(228, 108, 10)'
        },
        {
          name: 'Transportation',
          color: 'rgb(228, 108, 10)'
        },
        {
          name: 'Clothes',
          color: 'rgb(228, 108, 10)'
        },
        {
          name: 'Trip',
          color: 'rgb(228, 108, 10)'
        },
        {
          name: 'Grant',
          color: 'rgb(228, 108, 10)'
        }
      ];

      deferred.resolve(categories);

      return deferred.promise;
    }
  };
});