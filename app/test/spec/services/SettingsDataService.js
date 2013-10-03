'use strict';

describe('Service: SettingsDataService', function () {

  // load the service's module
  beforeEach(module('bamAppApp'));

  // instantiate service
  var SettingsDataService;
  beforeEach(inject(function (_SettingsDataService_) {
    SettingsDataService = _SettingsDataService_;
  }));

  it('should do something', function () {
    expect(!!SettingsDataService).toBe(true);
  });

});
