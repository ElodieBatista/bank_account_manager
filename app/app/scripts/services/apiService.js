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


    Paymethod: $resource(conf.epApi + '/paymethod', {}, {
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
    })
  }
});