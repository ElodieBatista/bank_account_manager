'use strict';

angular.module('bamApp').factory('apiService', function (conf, $resource) {
    return {
        AccountType: $resource(conf.epApi + '/accounttype', {}, {
            'get': {
                method: 'GET'
            }
        }),


        AccountsByYear: $resource(conf.epApi + '/accounts/:year', {year:'@year'}, {
            'get': {
                method: 'GET'
            }
        }),


        Accounts: $resource(conf.epApi + '/accounts', {}, {
            'get': {
                method: 'GET'
            },

            'post': {
                method: 'POST',
                params: {
                    account:'@account'
                }
            }
        }),

        Account: $resource(conf.epApi + '/account/:id', {id:'@id'}, {
            'delete': {
                method: 'DELETE'
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


        Year: $resource(conf.epApi + '/year', {}, {
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

        ReportSpendingByCategory: $resource(conf.epApi + '/report/spending/category/:year/:month?', {year: '@year', month: '@month'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportSpendingByCategoryAndMonth: $resource(conf.epApi + '/report/spending/:year/month/category', {year: '@year'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportIncomingByCategory: $resource(conf.epApi + '/report/incoming/category/:year/:month?', {year: '@year', month: '@month'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportIncomingByCategoryAndMonth: $resource(conf.epApi + '/report/incoming/:year/month/category', {year: '@year'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportTransactionsByCategory: $resource(conf.epApi + '/report/transactions/category/:year/:month?', {year: '@year', month: '@month'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportTransactionsEvolution: $resource(conf.epApi + '/report/transactions/evolution/:year', {year: '@year'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportAccountsByMonth: $resource(conf.epApi + '/report/accounts/:year/month', {year: '@year'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportTotalByMonth: $resource(conf.epApi + '/report/total/:year/month', {year: '@year'}, {
            'get': {
                method: 'GET'
            }
        }),

        ReportTotalByAccounttype: $resource(conf.epApi + '/report/total/accounttype/:year', {year: '@year'}, {
            'get': {
                method: 'GET'
            }
        })
    }
});