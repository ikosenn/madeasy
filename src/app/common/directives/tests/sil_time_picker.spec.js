(function () {
    "use strict";

    describe("Test siltimepicker directive", function () {
        var $scope, $compile, comp, html, ctrl;
        html = `
            <sil-time-picker
                id="formly_1_timepicker_start_time_0"
                ng-model="timepicker"
                format="HH:mm:ss" >
            </sil-time-picker>
        `;

        beforeEach(function () {
            module("madeasy.common.directives.timePicker");
            module("madeasy.common.manipulators.dateTime");

            inject(["$rootScope", "$compile", "$controller",
                function (_rootScope_, _compile_, _controller_) {
                    $scope = _rootScope_.$new();
                    $compile = _compile_;
                    ctrl = _controller_(
                        "madeasy.common.timepickerController",
                        {$scope: $scope}
                    );
                }
            ]);

            comp = compiledDirective();

            function compiledDirective() {
                var element = angular.element(html);
                var comp = $compile(element)($scope);
                $scope.$digest();

                return comp;
            }
        });

        it("should have compiled directive", function () {
            expect(comp.html()).toBeDefined();
            expect(ctrl.isOpen).toBeFalsy();
        });

        it("should open timepicker", function () {
            var e = $scope.$broadcast("event");
            ctrl.openTimePicker(e);
            expect(ctrl.isOpen).toBeTruthy();
        });

        it("should call update time with invalid time operation", function () {
            var element = comp.find("input");
            var isolateScope = comp.isolateScope();
            var e = angular.element.Event("keyup");
            isolateScope.$parent.form = {
                "formly_1_timepicker_start_time_0": {
                    $viewValue: "f"
                }
            };
            // Trigger user input
            e.which = 102;
            element.trigger(e);
            spyOn(ctrl, "updateTime");
            ctrl.updateTime();
            expect(ctrl.updateTime).toHaveBeenCalled();
        });

        it("should call update time with valid time operation", function () {
            var element = comp.find("input");
            var isolateScope = comp.isolateScope();
            var e = angular.element.Event("keyup");
            isolateScope.$parent.form = {
                "formly_1_timepicker_start_time_0": {
                    $viewValue: "+2h"
                }
            };
            // Trigger user input
            e.which = 102;
            element.trigger(e);
            spyOn(ctrl, "updateTime");
            ctrl.updateTime();
            expect(ctrl.updateTime).toHaveBeenCalled();
        });
    });
})();
