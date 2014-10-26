'use strict';

angular.module('bamApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'pascalprecht.translate'
])
    .constant('conf', {
        'epApi': 'http://localhost:3000'
    })
    .config(function (conf, $routeProvider, $httpProvider, $provide, $translateProvider) {
        // Set a default route
        $routeProvider.otherwise({redirectTo: '/accounts/' + parseInt(new Date().getMonth() + 1)});

        function comesFromBAM(url) {
            return (url.indexOf(conf.epApi) !== -1);
        }

        $provide.factory('httpInterceptor', function($q, $rootScope) {
            return {
                'request': function(config) {
                    if (comesFromBAM(config.url)) {
                        $rootScope.displaySpinner = true;
                    }
                    return config || $q.when(config);
                },

                'response': function(response) {
                    if (comesFromBAM(response.config.url)) {
                        $rootScope.displaySpinner = false;
                    }
                    return response || $q.when(response);
                }
            };
        });

        $httpProvider.interceptors.push('httpInterceptor');

        // Translations
        $translateProvider.useStaticFilesLoader({
            prefix: 'translations/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('fr');
    })
    .run(function($location) {
        $location.path('/load');
    });