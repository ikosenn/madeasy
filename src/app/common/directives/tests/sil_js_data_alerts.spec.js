"use strict";

describe("Test silform directive", function () {
    var rootScope, scope, html, compile;
    html = "<sil-js-data-alerts></sil-js-data-alerts>";

    beforeEach(function() {
        module("madeasy.common.directives.alerts");

        inject(["$rootScope", "$compile", function (_rootScope_, _$compile_) {
                rootScope = _rootScope_;
                compile = _$compile_;
                scope = rootScope.$new();
            }]);
    });

    it("should check that alerts has been successfully rendered", function () {
        var element = angular.element(html);
        var el = compile(element)(scope);
        el.isolateScope();
        scope.$digest();
        expect(el.hasClass("alert").toBeTruthy);
    });
});
