'use strict';

describe('Component: grid-column', function () {
  var compile, scope;

  beforeEach(module('components/grid-column.html'));
  beforeEach(module('compileMock'));

  beforeEach(inject(function (_$rootScope_, _compile_) {
    compile = _compile_('components/grid-column.html');
    scope = _$rootScope_;
  }));

  it('should read the HTML classes of the selection', function () {
    var options = compile('<div class="col-lg-3 col-md-6 col-xs-12">', scope);

    expect(options.find('#optionsGridColumnXs option:selected').text()).toBe('12');
    expect(options.find('#optionsGridColumnMd option:selected').text()).toBe('6');
    expect(options.find('#optionsGridColumnSm option:selected').text()).toBe('same as phones');
    expect(options.find('#optionsGridColumnLg option:selected').text()).toBe('3');
  });

  it('should write HTML classes to the selection', function () {
    var element = angular.element('<div>');
    compile(element, scope);

    scope.options.widths = {sm: '12', md: '6'};
    scope.update();

    expect(element.attr('class').split(' ').length).toBe(2);
    expect(element.hasClass('col-sm-12')).toBe(true);
    expect(element.hasClass('col-md-6')).toBe(true);
  });
});
