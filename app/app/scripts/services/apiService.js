'use strict';

angular.module('bamApp').factory('apiService', function (conf, $resource) {
    return {
        AccountType: $resource(conf.epApi + '/accounttype', {}, {
            'get': {
                method: 'GET'
            }
        }),


        Account: $resource(conf.epApi + '/account', {}, {
            'get': {
                method: 'GET'
            },

            'post': {
                method: 'POST',
                params: {
                    account:'@account'
                }
            },

            'put': {
                method: 'PUT',
                params: {
                    account:'@account'
                }
            }
        }),


        Category: $resource(conf.epApi + '/category', {}, {
            'get': {
                method: 'GET'
            }
        }),


        Currency: $resource(conf.epApi + '/currency', {}, {
            'get': {
                method: 'GET'
            }
        }),


        Paymethod: $resource(conf.epApi + '/paymethod', {}, {
            'get': {
                method: 'GET'
            }
        }),


        Years: $resource(conf.epApi + '/years', {}, {
            'get': {
                method: 'GET'
            }
        }),


        Transactions: $resource(conf.epApi + '/transaction', {}, {
            'get': {
                method: 'GET'
            },

            'post': {
                method: 'POST',
                params: {
                    transaction:'@transaction'
                }
            },

            'put': {
                method: 'PUT',
                params: {
                    transaction:'@transaction'
                }
            }
        }),

        Transaction: $resource(conf.epApi + '/transaction/:id', {id:'@id'}, {
            'delete': {
                method: 'DELETE'
            }
        }),

        ReportSpendingByCategory: $resource(conf.epApi + '/report/spending/category/:month?', {month: '@month'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportSpendingByCategoryAndMonth: $resource(conf.epApi + '/report/spending/month/category', {}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportIncomingByCategory: $resource(conf.epApi + '/report/incoming/category/:month?', {month: '@month'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportIncomingByCategoryAndMonth: $resource(conf.epApi + '/report/incoming/month/category', {}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportTransactionsByCategory: $resource(conf.epApi + '/report/transactions/category/:month?', {month: '@month'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportTransactionsEvolution: $resource(conf.epApi + '/report/transactions/evolution', {}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportAccountsByMonth: $resource(conf.epApi + '/report/accounts/month', {}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportTotalByMonth: $resource(conf.epApi + '/report/total/month', {}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportTotalByAccounttype: $resource(conf.epApi + '/report/total/accounttype', {}, {
            'get': {
                method: 'GET'
            }
        })
    }
});