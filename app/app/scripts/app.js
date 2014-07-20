'use strict';

angular.module('bamApp', [
  'ngResource',
  'ngRoute',
  'ngSanitize'
])
  .constant('conf', {
    'epApi': ''
  })
  .config(function ($routeProvider) {
    // Set a default route
    $routeProvider.otherwise({redirectTo: '/'});
  });