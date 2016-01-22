"use strict";
describe("Unit Tests: emr.common.controllers.errorPage", function () {
    var scope, createController, stateParams;

    beforeEach(function () {
        module("emr.common.controllers.errorPage");
        module("ui.router");

        inject(["$rootScope", "$controller", "$stateParams",
            function ($rootScope, $controller, $stateParams) {
                stateParams = $stateParams;
                scope = $rootScope.$new();
                createController = function () {
                    return $controller("emr.common.controllers.errorPage", {
                        "$scope": scope,
                        "$stateParams": stateParams
                    });
                };
            }]);
    });

    it("should put the params in a scope variable", function () {
        stateParams.initial_pwd = true;
        createController();
        expect(scope.params).toEqual({"initial_pwd": true});
    });
});
