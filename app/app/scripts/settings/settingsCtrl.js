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

    apiService.Year.get(function(res) {
        $rootScope.years = res.data;

        if (res.data.length === 0) {
            res.data.push({
                _id: -1,
                name: new Date().getFullYear()
            });
        }

        for (var i = 0, l = $rootScope.years.length; i < l; i++) {
            if ($rootScope.years[i].name === $scope.currYear.name) {
                $scope.currYear = $rootScope.years[i];
                break;
            }
        }
    });

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
                $scope.accounts.push(res.data.account);
                $scope.initAccountForm();
                if (res.data.year) {
                    $rootScope.years.push(res.data.year);
                }
            }, function(err) { console.log(err); });
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
                    $scope.editedAccount.name = res.data.name;
                    $scope.editedAccount.accounttype_id = res.data.accounttype_id;
                    $scope.editedAccount.currency_id = res.data.currency_id;
                    $scope.editedAccount.creation_day = res.data.creation_day;
                    $scope.editedAccount.creation_month = res.data.creation_month;
                    $scope.editedAccount.creation_year = res.data.creation_year;
                    $scope.initAccountForm();
                }, function(err) { console.log(err); });
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
                    break;
                }
            }

            if (res.data && res.data.yearToDelete) {
                for (var j = 0, le = $rootScope.years.length; j < le; j++) {
                    if ($rootScope.years[j]._id === res.data.yearToDelete) {
                        $rootScope.years.splice(j, 1);

                        if (res.data.yearToDelete === $scope.currYear._id) {
                            var currentYear = new Date().getFullYear();
                            for (var k = 0, len = $rootScope.years.length; k < len; k++) {
                                if ($rootScope.years[k].name === currentYear) {
                                    settingsService.setCurrentYear($rootScope.years[k]);
                                    $scope.currYear = $rootScope.years[k];
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }, function(err) { console.log(err); });
    };

    $scope.editCurrentYear = function(form) {
        settingsService.setCurrentYear(form.currentyear.$modelValue);
        $scope.currYear = settingsService.getCurrentYear();
    };

    $scope.editLanguage = function(form) {
        var language = form.language.$modelValue.abbr;
        $rootScope.language = language;
        $translate.use(language);
    }
});