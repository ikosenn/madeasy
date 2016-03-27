"use strict";

describe("Test breadcrumbs directive", function() {
    var $compile, $scope, $rootScope, $state;

    beforeEach(function () {
        module("madeasy.layout");
        module("layout/tpls/breadcrumbs.tpl.html");
        module("auth/tpls/login.tpl.html");
    });

    beforeEach(inject(["$compile", "$rootScope", "$state",
      function(_$compile_, _$rootScope_, _$state_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $state = _$state_;
    }]));

    it("should compile directive", function () {
        var element = $compile("<bread-crumbs></bread-crumbs>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toBeDefined();
    });
    it("should test statechange listener with data defined",function () {
        var eventData = {
            toState: {
                data:{
                    icon: "fa fa-table",
                    title: "Tables"
                },
                redirectTo: "base_state",
                state: "testState"
            }
        };
        $compile("<bread-crumbs></bread-crumbs>")($rootScope);
        $rootScope.$digest();
        $rootScope.$broadcast("$stateChangeSuccess",eventData.toState);
        expect($scope.title).toBe("Tables");
        expect($scope.icon).toBe("fa fa-table");

    });
    it("should test statechange listener with data not defined",function () {
        var eventData = {
            toState: {
            }
        };
        $compile("<bread-crumbs></bread-crumbs>")($rootScope);
        $rootScope.$digest();
        $rootScope.$broadcast("$stateChangeSuccess",eventData.toState);
    });

});
