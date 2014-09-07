'use strict';

angular.module('bamApp', [
  'ngResource',
  'ngRoute',
  'ngSanitize'
])
  .constant('conf', {
    'epApi': 'http://localhost:3000'
  })
  .config(function ($routeProvider) {
    // Set a default route
    $routeProvider.otherwise({redirectTo: '/accounts/' + parseInt(new Date().getMonth() + 1)});
  });