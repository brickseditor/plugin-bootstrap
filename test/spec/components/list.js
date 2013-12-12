'use strict';

describe('Component: list', function () {
  var compile, scope;

  beforeEach(module('components/list.html'));
  beforeEach(module('compileMock'));

  beforeEach(inject(function (_$rootScope_, _compile_) {
    compile = _compile_('components/list.html');
    scope = _$rootScope_;
  }));

  it('should read the type of the selected list', function () {
    var options = compile('<ul>', scope);
    expect(options.find('#optionsListType').val()).toBe('UL');

    options = compile('<ol>', scope);
    expect(options.find('#optionsListType').val()).toBe('OL');
  });

  it('should change the type of the selected node', function () {
    var parent = angular.element('<div>');
    var element = angular.element('<ol>').appendTo(parent);
    compile(element, scope);

    scope.options.type = 'UL';
    scope.update();
    expect(parent.children().prop('nodeName')).toBe('UL');

    scope.options.type = 'OL';
    scope.update();
    expect(parent.children().prop('nodeName')).toBe('OL');
  });

  it('should read the style of the selected list', function () {
    var options = compile('<ol>', scope);
    var select = options.find('#optionsListStyle option:selected');
    expect(select.text()).toBe('normal');

    options = compile('<ol class="list-unstyled">', scope);
    select = options.find('#optionsListStyle option:selected');
    expect(select.text()).toBe('unstyled');

    options = compile('<ol class="list-inline">', scope);
    select = options.find('#optionsListStyle option:selected');
    expect(select.text()).toBe('inline');
  });

  it('should change the style of the selected list', function () {
    var element = angular.element('<ul>');
    compile(element, scope);

    scope.options.style = 'unstyled';
    scope.update();
    expect(element.hasClass('list-unstyled')).toBe(true);
    expect(element.hasClass('list-inline')).toBe(false);

    scope.options.style = 'inline';
    scope.update();
    expect(element.hasClass('list-unstyled')).toBe(false);
    expect(element.hasClass('list-inline')).toBe(true);

    scope.options.style = '';
    scope.update();
    expect(element.hasClass('list-unstyled')).toBe(false);
    expect(element.hasClass('list-inline')).toBe(false);
  });
});
