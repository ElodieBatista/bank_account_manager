'use strict';

angular.module('bamApp').directive('accessMonth', function () {
  return {
    restrict: 'A',

    link: function (scope, elem, attrs) {
      function select(element) {
        $('aside ul li').removeClass('selected');
        $(element).addClass('selected');
      }

      if (new Date().getMonth() + 1 === parseInt(attrs.month)) {
        select(elem[0]);
        scope.getCheckingAccountsForMonth(attrs.month);
      }


      elem[0].addEventListener('click', function(e) {
        select(this);
        scope.getCheckingAccountsForMonth(attrs.month);
      });
    }
  };
});
