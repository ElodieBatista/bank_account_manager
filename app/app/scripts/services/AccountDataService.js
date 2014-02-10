'use strict';

angular.module('bamApp').factory('accountDataService', function ($q) {
    return {
        checkingAccounts: {},

        getCheckingAccounts: function() {
            var deferred = $q.defer(), that = this;

            var queryAccounts = new google.visualization.Query('https://docs.google.com/spreadsheet/ccc?key=0Ajhm2sR8jDvTdDc0Vm1ZSUw1bWZiRk5tRzBTUGNuZmc#gId=0');
            queryAccounts.setQuery('select *');

            queryAccounts.send(function(response) {
                if (response.isError()) {
                    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                    deferred.reject();
                }


                response = response.getDataTable();

                for (var i = 0, l = response.getNumberOfRows(); i < l; i++) {
                    that.checkingAccounts[response.getValue(i, 0)] = {
                        startAmount: response.getValue(i, 1),
                        startDate: response.getValue(i, 2),
                        transactions: {}
                    }
                }

                var queryTransactions = new google.visualization.Query('https://docs.google.com/spreadsheet/ccc?key=0Ajhm2sR8jDvTdHd1aGhFVThkRjBpeWtnNkdrYkVBM0E#gId=0');
                queryTransactions.setQuery('select *');

                queryTransactions.send(function(res) {
                    if (res.isError()) {
                        alert('Error in query: ' + res.getMessage() + ' ' + res.getDetailedMessage());
                        return;
                    }

                    res = res.getDataTable();

                    for (var j = 0, le = res.getNumberOfRows(); j < le; j++) {
                        if (that.checkingAccounts[res.getValue(j, 0)].transactions[res.getValue(j, 2)] === undefined) {
                            that.checkingAccounts[res.getValue(j, 0)].transactions[res.getValue(j, 2)] = [];
                        }

                        that.checkingAccounts[res.getValue(j, 0)].transactions[res.getValue(j, 2)][res.getValue(j, 3)] = {
                            title: res.getValue(j, 1),
                            amount: res.getValue(j, 4)
                        };
                    }

                    console.log(that.checkingAccounts);

                    deferred.resolve(that.checkingAccounts);
                });
            });

            return deferred.promise;
        }
    }
});