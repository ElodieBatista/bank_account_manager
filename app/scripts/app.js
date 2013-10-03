'use strict';

/**
 * App module's configuration
 */
angular.module('bamApp', ['ngRoute']).config(function($routeProvider) {
  // Configures the routes
  $routeProvider
  .when('/',
  {
    controller: 'HomeCtrl',
    templateUrl: 'views/home.html'
  })
  .otherwise({redirectTo: '/'});
});