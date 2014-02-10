'use strict';

var module = angular.module('bamApp');

module.config(function config($routeProvider) {
    $routeProvider
        .when('/',
        {
            templateUrl: 'views/checkingAccounts.html',
            controller: 'CheckingAccountCtrl'
        })
});

module.controller('CheckingAccountCtrl', function CheckingAccountCtrl($scope, accountService, settingsService, categoryService) {
    accountService.getCheckingAccounts().then(function (checkingAccounts) {
        $scope.checkingAccounts = checkingAccounts;
    });

    $scope.getCheckingAccountsForMonth = function (monthNb) {
        $scope.month = settingsService.getMonths()[parseInt(monthNb) - 1];
        //$scope.$apply();
    };

    $scope.categories = categoryService.getCategories();

    $scope.ways = settingsService.getWays();

    $scope.newTransaction = function(form) {
        if (form.$valid) {
            var Auth = $resource($rootScope.srvEndpoint + 'auth/?');
            var uriParams = {'email': form.email, 'pass': form.pass};
            Auth.get(uriParams, function(httpResponse) {
                _onLoginSuccess(form, httpResponse);
            }, function(httpResponse) {
                if(httpResponse.data.errorMessage){
                    $scope.errorMsg = httpResponse.data.errorMessage;
                } else if(httpResponse.status == 0) {
                    $scope.errorMsg = "Unable to connect to Duxter. Please check your Internet connection and try again."
                }
                tracker.trackEvent("error", "login_failed",
                    "status: " + JSON.stringify(httpResponse.status) + ", data: " + JSON.stringify(httpResponse.data));
                _onLoginError();
            });
        }
    }
});