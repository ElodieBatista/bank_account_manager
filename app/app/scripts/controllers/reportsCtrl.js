'use strict';

angular.module('bamApp').config(function config($routeProvider) {
  $routeProvider
    .when('/reports',
    {
      templateUrl: 'views/reports.tpl.html',
      controller: 'ReportsCtrl'
    })
}).controller('ReportsCtrl', function ($scope, $rootScope) {

});