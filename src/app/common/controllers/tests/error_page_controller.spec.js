"use strict";

describe("Unit Tests: madeasy.common.controllers.errorPage", function () {
    var scope, createController, stateParams, homePageService, state;

    beforeEach(function () {
        module("madeasy.common.controllers.errorPage");
        module("ui.router");

        inject(["$rootScope", "$controller", "$stateParams",
        "madeasy.auth.services.homePage", "$state",
            function ($rootScope, $controller, $stateParams, homePage, $state) {
                stateParams = $stateParams;
                homePageService = homePage;
                state = $state;
                scope = $rootScope.$new();
                createController = function () {
                    return $controller("madeasy.common.controllers.errorPage", {
                        "$scope": scope,
                        "$state": state,
                        "$stateParams": stateParams,
                        "madeasy.auth.services.homePage": homePageService
                    });
                };
            }]);
    });

    it("should put the params in a scope variable", function () {
        stateParams.initial_pwd = true;
        createController();
        expect(scope.params).toEqual({"initial_pwd": true});
    });
    it("should dynamically determine a users homepage and perform a " +
        "state change to that page", function () {
            spyOn(homePageService, "determineHomePage").and.returnValue(
                "scheduling");
            spyOn(state, "go");
            createController();
            scope.goHome();
            expect(state.go).toHaveBeenCalledWith("scheduling");
            expect(homePageService.determineHomePage).toHaveBeenCalled();
        });
});
