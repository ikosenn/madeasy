"use strict";

describe("Directive: Confirm Password", function () {
    var compile, html, scope, httpBackend, outerScope;

    beforeEach(function() {
        module("madeasy.common.directives.passwordChecker");

        inject(["$rootScope", "$compile", "$httpBackend",
            function ($rootScope, _$compile_, _$httpBackend_) {
                outerScope = $rootScope;
                scope = outerScope.$new();
                compile = _$compile_;
                httpBackend = _$httpBackend_;
                html = "<html><body><form name='testForm'>" +
                        "<input id='pass1'  name='pass11'" +
                        " ng-model='models.password'>" +
                        "<input id='pass' sil-pw-checker={{models.password}} " +
                        " name='pass' ng-model='models.password1'>" +
                        "<button type='submit'></button></form></body></html>";
            }]);
    });

    afterEach(function () {
        angular.element("body").empty();
    });

    it("should be successful verifying similar passwords `New password`" +
    "and `Old Password` fields", function () {

        var element = angular.element(html);
        var body = angular.element("body");
        var comp = compile(element);
        var el = comp(scope);
        body.append(el);
        var input = el.find("input");
        outerScope.$digest();

        angular.element(input[0]).val("test");
        angular.element(input[0]).trigger("input");
        angular.element(input[1]).val("test");
        angular.element(input[1]).trigger("input");
        scope.$digest();
        expect(angular.element(input[1]).hasClass("ng-valid")).toBeTruthy();
        expect(angular.element(input[1]).hasClass("ng-valid-password-match"))
            .toBeTruthy();

    });
    it("should be fail verifying similar passwords`New password`" +
    "and `Old Password` fields", function () {

        var element = angular.element(html);
        var body = angular.element("body");
        var comp = compile(element);
        var el = comp(scope);
        body.append(el);
        var input = el.find("input");
        outerScope.$digest();

        angular.element(input[0]).val("test-diff");
        angular.element(input[0]).trigger("input");
        angular.element(input[1]).val("test");
        angular.element(input[1]).trigger("input");
        scope.$digest();
        expect(angular.element(input[1]).hasClass("ng-invalid")).toBeTruthy();
        expect(angular.element(input[1]).hasClass("ng-invalid-password-match"))
            .toBeTruthy();

    });
});
