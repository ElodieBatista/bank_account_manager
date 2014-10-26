'use strict';

angular.module('bamApp').config(function config($routeProvider) {
    $routeProvider
        .when('/settings',
        {
            templateUrl: 'scripts/settings/settings.tpl.html',
            controller: 'SettingsCtrl'
        })
}).controller('SettingsCtrl', function ($scope, apiService, settingsService) {
    apiService.Account.get(function(res) {
        $scope.accounts = res.data;
    });

    apiService.AccountType.get(function(res) {
        $scope.accounttypes = {};

        for (var i = 0, l = res.data.length; i < l; i++) {
            $scope.accounttypes[res.data[i]._id] = res.data[i];
        }
    });

    apiService.Currency.get(function(res) {
        $scope.currencies = {};

        for (var i = 0, l = res.data.length; i < l; i++) {
            $scope.currencies[res.data[i]._id] = res.data[i];
        }
    });

    apiService.Category.get(function(res) {
        $scope.categories = res.data;
    });

    apiService.Years.get(function(res) {
        $scope.years = res.data;
        var years = [
            2014, 2013
        ];
    });

    $scope.newAccount = function(account) {
        apiService.Account.post({'account':account}, function(res) {
            $scope.accounts.push(res.data);
        }, function(err) { /*$scope.errorShow(err);*/ console.log(err); });
    };

    $scope.editCurrentYear = function(form) {

    };
});