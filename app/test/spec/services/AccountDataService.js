'use strict';

describe('Service: AccountDataService', function () {

  // load the service's module
  beforeEach(module('bamAppApp'));

  // instantiate service
  var AccountDataService;
  beforeEach(inject(function (_AccountDataService_) {
    AccountDataService = _AccountDataService_;
  }));

  it('should do something', function () {
    expect(!!AccountDataService).toBe(true);
  });

});
