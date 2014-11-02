'use strict';

angular.module('bamApp').config(function config($routeProvider) {
    $routeProvider
        .when('/load',
        {
            template: '',
            controller: 'LoadCtrl',
            resolve: LoadCtrl.resolve
        })
}).controller('LoadCtrl', LoadCtrl);

function LoadCtrl($rootScope, $location, $window, $translate, settingsService, currencies, accounttypes, categories, paymethods, years) {
    $rootScope.currencies = currencies;
    $rootScope.accounttypes = accounttypes;
    $rootScope.categories = categories;
    $rootScope.paymethods = paymethods;
    $rootScope.years = years;

    var year = new Date().getFullYear();
    for (var i = 0, l = $rootScope.years.length; i < l; i++) {
        if ($rootScope.years[i].name === year) {
            settingsService.setCurrentYear($rootScope.years[i]);
        }
    }

    var lang = $window.navigator.userLanguage || $window.navigator.language;
    lang = lang.substring(0, 2);
    $translate.use(lang);
    $rootScope.language = lang;

    $location.path('/');
}

LoadCtrl.resolve = {
    currencies: function($q, apiService) {
        var deferred = $q.defer();
        apiService.Currency.get(function(res) {
            var currencies = {};
            for (var i = 0, l = res.data.length; i < l; i++) {
                currencies[res.data[i]._id] = res.data[i];
            }
            deferred.resolve(currencies);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },

    accounttypes: function($q, apiService) {
        var deferred = $q.defer();
        apiService.AccountType.get(function(res) {
            var accounttypes = {};
            for (var i = 0, l = res.data.length; i < l; i++) {
                accounttypes[res.data[i]._id] = res.data[i];
            }
            deferred.resolve(accounttypes);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },

    categories: function($q, apiService) {
        var deferred = $q.defer();
        apiService.Category.get(function(res) {
            var categories = {};
            for (var i = 0, l = res.data.length; i < l; i++) {
                categories[res.data[i]._id] = res.data[i];
            }
            deferred.resolve(categories);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    },

    paymethods: function($q, apiService) {
        var deferred = $q.defer();
        apiService.Paymethod.get(function(res) {
            var paymethods = {};
            for (var i = 0, l = res.data.length; i < l; i++) {
                paymethods[res.data[i]._id] = res.data[i];
            }
            deferred.resolve(paymethods);
        }, function(err) {
            deferred.reject();
        });
        return deferred.promise;
    },

    years: function($q, apiService) {
        var deferred = $q.defer();
        apiService.Year.get(function(res) {
            if (res.data.length === 0) {
                res.data.push({
                    _id: -1,
                    name: new Date().getFullYear()
                });
            }
            deferred.resolve(res.data);
        }, function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
};