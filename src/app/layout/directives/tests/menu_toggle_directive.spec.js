"use strict";

describe("Test menu toggle directive", function() {
    var $compile, $scope, $rootScope;

    beforeEach(function () {
        module("madeasy.layout");
    });

    beforeEach(inject(["$compile", "$rootScope",
      function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
    }]));

    it("should compile directive and do its thing", function () {
        var element = $compile("<menu-toggle></menu-toggle>")($rootScope);
        $rootScope.$digest();
        element.triggerHandler("click");
        var _attr = element.attr("class");
        expect(_attr.indexOf("menu-opened")).not.toBe(-1);
    });
});
