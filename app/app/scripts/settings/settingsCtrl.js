'use strict';

angular.module('bamApp').config(function config($routeProvider) {
    $routeProvider
        .when('/settings',
        {
            templateUrl: 'scripts/settings/settings.tpl.html',
            controller: 'SettingsCtrl'
        })
}).controller('SettingsCtrl', function ($rootScope, $scope, $translate, apiService, settingsService) {
    $scope.currYear = settingsService.getCurrentYear();

    $scope.languages = settingsService.languages;

    for (var prop in $scope.languages) {
        if ($scope.languages[prop].abbr === $rootScope.language) {
            $scope.lang = $scope.languages[prop];
            break;
        }
    }

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
        delete $scope.newaccount.transactions;
        $scope.editedAccount = account;
    };

    $scope.saveEditAccount = function(form) {
        if (form.$valid) {
            if (form.$dirty) {
                delete $scope.newaccount.editing;
                delete $scope.editedAccount.editing;
                apiService.Account.put({'id':$scope.newaccount._id}, {'account':$scope.newaccount}, function(res) {
                    $scope.editedAccount.name = res.data[0].name;
                    $scope.editedAccount.accounttype_id = res.data[0].accounttype_id;
                    $scope.editedAccount.currency_id = res.data[0].currency_id;
                    $scope.editedAccount.creation_day = res.data[0].creation_day;
                    $scope.editedAccount.creation_month = res.data[0].creation_month;
                    $scope.editedAccount.creation_year = res.data[0].creation_year;
                    $scope.initAccountForm();
                }, function(err) { /*$scope.errorShow(err);*/ console.log(err); });
            } else {
                $scope.cancelEditAccount();
            }
        }
    };

    $scope.cancelEditAccount = function() {
        delete $scope.newaccount.editing;
        delete $scope.editedAccount.editing;
        $scope.initAccountForm();
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

    $scope.editCurrentYear = function(form) {
        settingsService.setCurrentYear(form.currentyear.$modelValue);
    };

    $scope.editLanguage = function(form) {
        var language = form.language.$modelValue.abbr;
        $rootScope.language = language;
        $translate.use(language);
    }
});