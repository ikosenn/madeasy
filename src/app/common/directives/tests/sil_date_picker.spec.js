(function () {
    "use strict";

    describe("Test sildatepicker directive", function () {
        var $scope, $compile, html, comp, ctrl;
        html = `
            <sil-date-picker
                id="formly_1_datepicker_start_date_0"
                ng-model="datepicker"
                format="dd-MM-yyyy" >
            </sil-date-picker>
        `;

        beforeEach(function () {
            module("madeasy.common.directives.datePicker");
            module("madeasy.common.manipulators.dateTime");

            inject(["$rootScope", "$compile", "$controller",
                function (_rootScope_, _compile_, _controller_) {
                    $scope = _rootScope_.$new();
                    $compile = _compile_;
                    ctrl = _controller_(
                        "madeasy.common.datepickerController",
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

        it("should open datepicker", function () {
            var e = $scope.$broadcast("event");
            ctrl.openDatePicker(e);
            expect(ctrl.isOpen).toBeTruthy();
        });

        it("should call update date with invalid date operation", function () {
            var element = comp.find("input");
            var isolateScope = comp.isolateScope();
            var e = angular.element.Event("keyup");
            isolateScope.$parent.form = {
                "formly_1_datepicker_start_date_0": {
                    $viewValue: "f"
                }
            };
            // Trigger user input
            e.which = 102;
            element.trigger(e);
            spyOn(ctrl, "updateDate");
            ctrl.updateDate();
            expect(ctrl.updateDate).toHaveBeenCalled();
        });

        it("should call update date with valid date operation", function () {
            var element = comp.find("input");
            var isolateScope = comp.isolateScope();
            var e = angular.element.Event("keyup");
            isolateScope.$parent.form = {
                "formly_1_datepicker_start_date_0": {
                    $viewValue: "+5M"
                }
            };
            // Trigger user input
            e.which = 102;
            element.trigger(e);
            spyOn(ctrl, "updateDate");
            ctrl.updateDate();
            expect(ctrl.updateDate).toHaveBeenCalled();
        });
    });
})();
