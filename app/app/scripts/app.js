'use strict';

var app = angular.module('bamApp', ['ngResource', 'ngRoute', 'ngSanitize']);

app.config(function ($routeProvider) {
    // Set a default route
    $routeProvider.otherwise({redirectTo: '/'});
});