"use strict";

describe("Directive:  Create Sparkline charts", function () {
    var compile, html, scope, httpBackend, outerScope;

    beforeEach(function() {
        module("madeasy.common.directives.sparklineChart");

        inject(["$rootScope", "$compile", "$httpBackend",
            function ($rootScope, _$compile_, _$httpBackend_) {
                outerScope = $rootScope;
                scope = outerScope.$new();
                compile = _$compile_;
                httpBackend = _$httpBackend_;
                html = "<sil-sparkline></sil-sparkline>";
            }]);
    });

    it("should compile the directive", function () {
            var element = angular.element(html);
            var comp = compile(element)(scope);
            scope.$digest();
            expect(comp.html()).toBeDefined();
        }
    );

    it("should compile the directive with data", function () {
            scope.data = "0,4,8,3,6,5,8";
            var htmlWithData = "<sil-sparkline data='{{data}}'></sil-sparkline>";
            var element = angular.element(htmlWithData);

            var compiled = compile(element)(scope);
            scope.$digest();
            expect(compiled.length).toBe(1);
        }
    );

});
