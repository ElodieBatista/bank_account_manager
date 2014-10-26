'use strict';

angular.module('bamApp').config(function config($routeProvider) {
    $routeProvider
        .when('/settings',
        {
            templateUrl: 'scripts/settings/settings.tpl.html',
            controller: 'SettingsCtrl'
        })
}).controller('SettingsCtrl', function ($scope, $translate, apiService, settingsService) {
    $scope.formCurrentYear = {
        year: settingsService.getCurrentYear()
    };

    $scope.languages = settingsService.languages;

    apiService.Accounts.get(function(res) {
        $scope.accounts = res.data;
    });

    $scope.newAccount = function(account) {
        apiService.Accounts.post({'account':account}, function(res) {
            $scope.accounts.push(res.data);
        }, function(err) { /*$scope.errorShow(err);*/ console.log(err); });
    };

    $scope.deleteAccount = function(accountId) {
        apiService.Account.delete({'id':accountId}, function(res) {
            for (var i = 0, l = $scope.accounts.length; i < l; i++) {
                if ($scope.accounts[i]._id === accountId) {
                    $scope.accounts.splice(i, 1);
                }
            }
        }, function(err) { /*$scope.errorShow(err);*/ console.log(err); });
    };

    $scope.editCurrentYear = function(year) {
        settingsService.setCurrentYear(JSON.parse(year));
    };

    $scope.editLanguage = function(language) {
        $translate.use(JSON.parse(language).abbr);
    }
});