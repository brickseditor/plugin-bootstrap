'use strict';

describe('Component: description', function () {
  var compile, scope;

  beforeEach(module('components/description.html'));
  beforeEach(module('compileMock'));

  beforeEach(inject(function (_$rootScope_, _compile_) {
    compile = _compile_('components/description.html');
    scope = _$rootScope_;
  }));

  it('should read the style of the selected list', function () {
    var options = compile('<dl>', scope);
    var field = options.find('#optionsDescriptionStyle');
    expect(field.prop('checked')).toBe(false);

    options = compile('<dl class="dl-horizontal">', scope);
    field = options.find('#optionsDescriptionStyle');
    expect(field.prop('checked')).toBe(true);
  });

  it('should change the style of the selected list', function () {
    var element = angular.element('<dl>');
    compile(element, scope);

    scope.options.horizontal = true;
    scope.update();
    expect(element.hasClass('dl-horizontal')).toBe(true);

    scope.options.horizontal = false;
    scope.update();
    expect(element.hasClass('dl-horizontal')).toBe(false);
  });
});
