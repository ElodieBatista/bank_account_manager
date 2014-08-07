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
            firstMonth = firstMonth - 12;
          }
          elems += '<li class="menu-list-subitem" ng-click="changeViewMonth(' + index + ')"' +
            'ng-class="{true:\'active\',false:\'\'}[currViewMonth === ' + index + ']" data-month="' + index + '">' +
            '<a class="menu-list-subitem-link" href="index.html">' +
            months[index - 1] + '</a></li>';
        }

        elems = $compile(elems)(scope);
        $(elems).insertAfter('.menu-list-item:first');
      }

      var months = settingsService.getMonths();
      //var firstMonthPromise = settingsService.getFirstMonthOfYear();
      var firstMonth = settingsService.getFirstMonthOfYear();

      /*if (firstMonthPromise.then !== undefined) {
        firstMonthPromise.then(function(firstMonth) {*/
          displayOrderedMonths(firstMonth);
        /*});
      }*/
    }
  };
});