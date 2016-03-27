"use strict";

describe("Test responsive directive", function() {
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

    it("should compile directive (parent empty)", function () {
        $rootScope.content_holder = "affix";
        var element = $compile("<header><responsive-check>" +
            "</responsive-check></header>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBeDefined();
        expect(element.attr("class")).toBe("ng-scope");
    });

    it("should compile directive (parent not empty)", function () {
        $rootScope.content_holder = "affix";
        var element = $compile("<header><responsive-check>" +
            "<div>sth</div></responsive-check></header>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBeDefined();
        expect(element.attr("class")).toBe("ng-scope");
    });

    it("should compile directive (content_holder static)", function () {
        $rootScope.content_holder = "static";
        var element = $compile("<header><responsive-check>" +
            "<div>sth</div></responsive-check></header>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBeDefined();
    });

});
