'use strict';

describe('Directive: AccessMonth', function () {
  beforeEach(module('bamAppApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<-access-month></-access-month>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the AccessMonth directive');
  }));
});
