"use strict";

describe("Tests datepicker controller",
    function () {
        var scope, DS, controller;
        beforeEach(function () {
            module("js-data-mocks");
            module("madeasy.common.controllers.datetimepicker");
            inject(["$rootScope", "$controller","DS", function ($rootScope,
                $controller, _DS_) {
                scope = $rootScope.$new();
                DS = _DS_;

                var data = {
                    $scope: scope
                };
                controller = function (name) {
                    $controller(name, data);
                };
            }]);
        });

        it("Should test successful opening of datetimepicker", function () {
            controller("madeasy.common.datetimepicker");
            expect(scope.isOpen).toBeFalsy();
            var e = scope.$broadcast("someEvent");
            scope.openDateTimePicker(e);
            scope.$digest();
            expect(scope.isOpen).toBeTruthy();
        });
    });
