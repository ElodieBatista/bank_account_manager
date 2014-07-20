'use strict';

angular.module('bamApp').directive('olMonths', function ($compile, settingsService) {
  return {
    restrict: 'A',

    link: function (scope, elem, attrs) {
      function displayOrderedMonths(firstMonth) {
        var elems = '';
        var index = 0;

        for (var i = 0, l = months.length; i < l; i++) {
          index = firstMonth + i;
          if (index === months.length + 1) {
            index = 1;
            firstMonth = -1;
          }
          elems += '<li class="menu-list-subitem" ng-click="changeViewMonth(' + index + ')"' +
            'ng-class="{true:\'active\',false:\'\'}[currViewMonth === ' + index + ']" data-month="' + index + '">' +
            months[index - 1] + '</li>';
        }

        elems = $compile(elems)(scope);
        $(elems).insertAfter('.menu-list-item:first');
      }

      var months = settingsService.getMonths();
      var firstMonthPromise = settingsService.getFirstMonthOfYear();

      if (firstMonthPromise.then !== undefined) {
        firstMonthPromise.then(function(firstMonth) {
          displayOrderedMonths(firstMonth);
        });
      }
    }
  };
});