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
          elems += '<li class="menu-list-subitem" ng-click="selectedMenu = 1;"' +
            'ng-class="{true:\'active\',false:\'\'}[currViewMonth === ' + index + ']" data-month="' + index + '">' +
            '<a class="menu-list-subitem-link" href="#/accounts/' + index + '"><span class="menu-list-subitem-text">' +
            months[index - 1].name + '</span><span class="menu-list-subitem-text-sm">' + months[index - 1].name.substring(0, 3) + '</span></a></li>';
        }

        elems = $compile(elems)(scope);
        $(elems).insertAfter('.menu-list-item:first');
      }

      var months = settingsService.getMonths();
      //var firstMonthPromise = settingsService.getFirstMonthOfYear();
      var firstMonth = 1;

      /*if (firstMonthPromise.then !== undefined) {
        firstMonthPromise.then(function(firstMonth) {*/
          displayOrderedMonths(firstMonth);
        /*});
      }*/
    }
  };
});