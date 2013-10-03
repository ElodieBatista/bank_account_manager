'use strict';

describe('Controller: CheckingAccountCtrl', function () {

  // load the controller's module
  beforeEach(module('bamAppApp'));

  var CheckingAccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CheckingAccountCtrl = $controller('CheckingAccountCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
