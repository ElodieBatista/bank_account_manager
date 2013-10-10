'use strict';

angular.module('bamApp').factory('categoryDataService', function ($q) {
  return {
    getCategories: function() {
      var deferred = $q.defer();

      var categories = [
        {
          id: 0,
          name: 'Insurance',
          color: 'rgb(0, 112, 92)'
        },
        {
          id: 1,
          name: 'Gift',
          color: 'rgb(255, 192, 0)'
        },
        {
          id: 2,
          name: 'Divers',
          color: 'rgb(112, 48, 160)'
        },
        {
          id: 3,
          name: 'School',
          color: 'rgb(255, 153, 255)'
        },
        {
          id: 4,
          name: 'Tax',
          color: 'rgb(228, 108, 10)'
        },
        {
          id: 5,
          name: 'Technology',
          color: 'rgb(228, 108, 10)'
        },
        {
          id: 6,
          name: 'Rent',
          color: 'rgb(228, 108, 10)'
        },
        {
          id: 7,
          name: 'Health',
          color: 'rgb(228, 108, 10)'
        },
        {
          id: 8,
          name: 'Food',
          color: 'rgb(228, 108, 10)'
        },
        {
          id: 9,
          name: 'Salary',
          color: 'rgb(228, 108, 10)'
        },
        {
          id: 10,
          name: 'Transportation',
          color: 'rgb(228, 108, 10)'
        },
        {
          id: 11,
          name: 'Clothes',
          color: 'rgb(228, 108, 10)'
        },
        {
          id: 12,
          name: 'Trip',
          color: 'rgb(228, 108, 10)'
        },
        {
          id: 13,
          name: 'Grant',
          color: 'rgb(228, 108, 10)'
        }
      ];

      deferred.resolve(categories);

      return deferred.promise;
    }
  };
});