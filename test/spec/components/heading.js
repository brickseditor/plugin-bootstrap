'use strict';

describe('Component: heading', function () {
  var compile, scope;

  beforeEach(module('components/heading.html'));
  beforeEach(module('compileMock'));

  beforeEach(inject(function (_$rootScope_, _compile_) {
    compile = _compile_('components/heading.html');
    scope = _$rootScope_;
  }));

  it('should read the type of the selected node', function () {
    var options = compile('<h3>', scope);
    var select = options.find('#optionsHeadingType option:selected');
    expect(select.text()).toBe('heading 3');

    options = compile('<h5>', scope);
    select = options.find('#optionsHeadingType option:selected');
    expect(select.text()).toBe('heading 5');
  });

  it('should change the type of the selected node', function () {
    var parent = angular.element('<div>');
    var element = angular.element('<h2>').appendTo(parent);
    compile(element, scope);

    scope.options.type = 'H4';
    scope.update();
    expect(parent.children().prop('nodeName')).toBe('H4');

    scope.options.type = 'H6';
    scope.update();
    expect(parent.children().prop('nodeName')).toBe('H6');
  });
});
