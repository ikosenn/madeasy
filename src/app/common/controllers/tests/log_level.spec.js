"use strict";

describe("Tests log level", function () {
    beforeEach(function () {
        module("madeasy.common.controllers.errorPage");
        module("ui.router");
    });

    var controller, scope, stateParams, log;

    describe("in development", function () {

        beforeEach(inject(["$rootScope", "$controller", "$stateParams", "$log",
            function ($rootScope, $controller, $stateParams, $log) {
            log = $log;
            stateParams = $stateParams;
            scope = $rootScope.$new();
            controller = function () {
                return $controller("madeasy.common.controllers.errorPage", {
                    "$scope": scope,
                    "$stateParams": stateParams
                });
            };
        }]));

        it("should show debug messages", function () {
            controller();
            expect(log.debug.logs).toContain(["Error page"]);
        });

    });

    describe("in production", function () {

        beforeEach(module(function ($logProvider) {
            // Disable debug messages
            $logProvider.debugEnabled(false);
        }));

        beforeEach(inject(["$rootScope", "$controller", "$stateParams", "$log",
            function ($rootScope, $controller, $stateParams, $log) {
            log = $log;
            stateParams = $stateParams;
            scope = $rootScope.$new();
            controller = function () {
                return $controller("madeasy.common.controllers.errorPage", {
                    "$scope": scope,
                    "$stateParams": stateParams
                });
            };
        }]));

        it("should not show debug messages", function () {
            controller();
            expect(log.assertEmpty).not.toThrow();
        });

    });
});
