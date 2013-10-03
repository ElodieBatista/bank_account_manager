'use strict';

describe('Service: CategoryDataService', function () {

  // load the service's module
  beforeEach(module('bamAppApp'));

  // instantiate service
  var CategoryDataService;
  beforeEach(inject(function (_CategoryDataService_) {
    CategoryDataService = _CategoryDataService_;
  }));

  it('should do something', function () {
    expect(!!CategoryDataService).toBe(true);
  });

});
