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


    Transaction: $resource(conf.epApi + '/transaction', {}, {
      'get': {
        method: 'GET'
      }
    })
  }
});