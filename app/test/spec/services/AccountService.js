'use strict';

describe('Service: AccountService', function () {

  // load the service's module
  beforeEach(module('bamAppApp'));

  // instantiate service
  var AccountService;
  beforeEach(inject(function (_AccountService_) {
    AccountService = _AccountService_;
  }));

  it('should do something', function () {
    expect(!!AccountService).toBe(true);
  });

});
