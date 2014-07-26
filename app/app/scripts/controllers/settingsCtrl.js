'use strict';

angular.module('bamApp').config(function config($routeProvider) {
  $routeProvider
    .when('/settings',
    {
      templateUrl: 'views/settings.tpl.html',
      controller: 'SettingsCtrl'
    })
}).controller('SettingsCtrl', function ($scope, $rootScope) {

});