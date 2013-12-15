'use strict';

angular.module('compileMock', [])
  .service('compile', function ($compile, $templateCache) {

    return function (component) {
      var xml = angular.element($templateCache.get(component));
      var options = xml.find('options').html().trim();
      var script = xml.find('script').html().trim();
      var Script;

      (new Function('register', script))(function (name, script) { // jshint ignore:line
        Script = script;
      });

      return function (element, scope) {
        element = angular.element(element);
        angular.extend(scope, new Script(element));
        var compiled = $compile(options)(scope);
        scope.$digest();
        return compiled;
      };
    };
  });
