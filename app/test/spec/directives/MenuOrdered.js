'use strict';

describe('Directive: MenuOrdered', function () {
  beforeEach(module('bamAppApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<-menu-ordered></-menu-ordered>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the MenuOrdered directive');
  }));
});
