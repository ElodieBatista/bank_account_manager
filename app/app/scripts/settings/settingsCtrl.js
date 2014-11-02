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

    $scope.initAccountForm = function() {
        $scope.newaccount = {
            name: '',
            accounttype_id: '',
            currency_id: '',
            creation_day: '',
            creation_month: '',
            creation_year: ''
        }
    };

    apiService.Accounts.get(function(res) {
        $scope.accounts = res.data;
        $scope.initAccountForm();
    });

    $scope.newAccount = function(form) {
        if (form.$valid) {
            apiService.Accounts.post({'account':$scope.newaccount}, function(res) {
                $scope.accounts.push(res.data);
                $scope.initAccountForm();
            }, function(err) { /*$scope.errorShow(err);*/ console.log(err); });
        }
    };

    $scope.editAccount = function(account) {
        account.editing = true;
        $scope.newaccount = angular.copy(account);
        $scope.editedAccount = account;
    };

    $scope.saveEditAccount = function(form) {
        if (form.$valid) {
            apiService.Account.put({'id':$scope.newaccount._id}, {'account':$scope.newaccount}, function(res) {
                delete $scope.editedAccount.editing;
                delete $scope.editedAccount;
                $scope.initAccountForm();
            }, function(err) { /*$scope.errorShow(err);*/ console.log(err); });
        }
    };

    $scope.cancelEditAccount = function(account) {
        delete account.editing;
        $scope.formNewAccount = $scope.initAccountForm($scope.formNewAccount);
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