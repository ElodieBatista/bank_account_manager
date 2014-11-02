'use strict';

angular.module('bamApp').config(function config($routeProvider) {
    $routeProvider
        .when('/accounts/:month',
        {
            templateUrl: 'scripts/account/home.tpl.html',
            controller: 'HomeCtrl'
        })
}).controller('HomeCtrl', function ($scope, $rootScope, $routeParams, apiService, settingsService) {
    $scope.firstMonth = 1;
    $rootScope.currViewMonth = parseInt($routeParams.month);
    var currYear = settingsService.getCurrentYear().name;

    $scope.initTransactionForm = function(form) {
        form = {
            name: '',
            sign: '-',
            amount: '',
            category_id: '',
            paymethod_id: '',
            day: '',
            isDone: false
        };
        return form;
    };


    $scope.isMonthOutOfBound = function(month, inboundMonth, outboundMonth) {
        return ((inboundMonth <= month && (outboundMonth < month && outboundMonth >= inboundMonth)) ||
            (inboundMonth > month && (outboundMonth <month || outboundMonth >= inboundMonth)));
    };


    apiService.AccountsByYear.get({'year':currYear}, function(res) {
        $scope.accounts = res.data;

        for (var i = 0, l = $scope.accounts.length; i < l; i++) {
            $scope.accounts[i].amount = $scope.getAmounts($scope.accounts[i], $rootScope.currViewMonth);
            $scope.accounts[i].formNewTransaction = $scope.initTransactionForm($scope.accounts[i].formNewTransaction);
            $scope.accounts[i].currencySelected = ($scope.currencies[$scope.accounts[i].currency_id].name === 'dollar') ? 1 : 2;
            if ($scope.accounts[i].currencySelected === 1) {
                $scope.accounts[i].currencyFactor = [1, settingsService.change['DollarEuro']];
            } else {
                $scope.accounts[i].currencyFactor = [settingsService.change['EuroDollar'], 1];
            }
        }
    }, function(err) { console.log(err); });


    $rootScope.changeViewMonth = function(month) {
        $rootScope.currViewMonth = month;

        for (var i = 0, l = $scope.accounts.length; i < l; i++) {
            $scope.accounts[i].amount = $scope.getAmounts($scope.accounts[i], $rootScope.currViewMonth);
        }
    };


    $scope.getAmounts = function(account, currMonth) {
        if ($scope.isMonthOutOfBound(account.creation_month, $scope.firstMonth, currMonth)) {
            return { curr: 0, future: 0 };
        }

        var currAmount = 0;
        var futureAmount = 0;
        for (var i = account.creation_month; i <= currMonth; i++) {
            for (var j = 0, l = account.transactions[i].length; j < l; j++) {
                futureAmount += account.transactions[i][j].amount;
                if (account.transactions[i][j].isDone) {
                    currAmount += account.transactions[i][j].amount;
                }
            }
        }

        return { curr: parseFloat(currAmount.toFixed(2)), future: parseFloat(futureAmount.toFixed(2)) };
    };


    $scope.updateAmountsWithTransaction = function(account, transaction, isNew, isDeleted) {
        if (isNew) {
            account.amount.future = parseFloat((account.amount.future + transaction.amount).toFixed(2));
        }

        if (isDeleted) {
            account.amount.future = parseFloat((account.amount.future - transaction.amount).toFixed(2));
        }

        if (transaction.isDone && isDeleted) {
            account.amount.curr = parseFloat((account.amount.curr - transaction.amount).toFixed(2));
        } else if (transaction.isDone) {
            account.amount.curr = parseFloat((account.amount.curr + transaction.amount).toFixed(2));
        } else if (!isNew && !isDeleted) {
            account.amount.curr = parseFloat((account.amount.curr - transaction.amount).toFixed(2));
        }
    };


    $scope.getAccountById = function(id) {
        for (var i = 0, l = $scope.accounts.length; i < l; i++) {
            if ($scope.accounts[i]._id === id) {
                return $scope.accounts[i];
            }
        }
        return null;
    };


    $scope.addTransaction = function(transaction) {
        var account = $scope.getAccountById(transaction.account_id);

        if (account !== null) {
            account.transactions[transaction.month].push(transaction);
            $scope.updateAmountsWithTransaction(account, transaction, true, false);
        }
    };

    $scope.deleteTransaction = function(transaction) {
        var account = $scope.getAccountById(transaction.account_id);

        if (account !== null) {
            apiService.Transaction.delete({'id':transaction._id}, function(res) {
                for (var i = 0, l = account.transactions[transaction.month].length; i < l; i++) {
                    if (account.transactions[transaction.month][i]._id === transaction._id) {
                        account.transactions[transaction.month].splice(i, 1);
                        $scope.updateAmountsWithTransaction(account, transaction, false, true);
                        return;
                    }
                }
            }, function(err) { console.log(err); });
        }
    };


    $scope.newTransaction = function(form, account_id) {
        var transaction = {
            name: form.name,
            category_id: form.category_id,
            account_id: account_id,
            paymethod_id: form.paymethod_id,
            amount: parseFloat(form.sign + form.amount),
            day: form.day,
            month: $rootScope.currViewMonth,
            year: settingsService.getCurrentYear().name,
            isDone: (form.isDone !== undefined ? form.isDone : false)
        };

        apiService.Transactions.post({'transaction':transaction}, function(res) {
            $scope.addTransaction(res.data);

            var account = $scope.getAccountById(transaction.account_id);
            account.formNewTransaction = $scope.initTransactionForm(account.formNewTransaction);
        }, function(err) { console.log(err); });
    };


    $scope.completeTransaction = function(transaction) {
        apiService.Transactions.put({'transaction':transaction}, function(res) {
            var account = $scope.getAccountById(transaction.account_id);

            $scope.updateAmountsWithTransaction(account, transaction, false, false);
        }, function(err) { console.log(err); });
    };
});