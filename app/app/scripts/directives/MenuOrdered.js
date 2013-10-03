'use strict';

angular.module('bamApp').directive('menuOrdered', function ($compile, settingsService) {
  return {
    restrict: 'A',

    link: function (scope, elem, attrs) {
      function displayOrderedMonths(firstMonth) {
        var elems = '';
        var count = 0;
        var index = firstMonth;

        while (count !== months.length) {
          elems += '<li access-month month="' + index + '"><i class="icon-caret-right"></i>' + months[index - 1] + '</li>';

          index++;

          if (index === months.length + 1) {
            index = 1;
          }

          count++;
        }


        var elemsToInsert = $compile(elems)(scope);

        $(elemsToInsert).insertAfter('aside ul li:first');
      }

      var months = settingsService.getMonths();
      var first = settingsService.getFirstMonthOfYear();

      if (first.then !== undefined) {
        first.then(function(dataFirst) {
          first = dataFirst;
          displayOrderedMonths(first);
        });
      }
    }
  };
});