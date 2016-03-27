(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.timePicker", [
        "madeasy.common.controllers.timepicker"
    ])

    .directive("silTimePicker", function () {

        return {
            bindToController: {
                format: "@",
                id: "@",
                ngModel: "="
            },
            controller: "madeasy.common.timepickerController",
            controllerAs: "vm",
            replace: true,
            restrict: "E",
            scope: {},
            template: `
                <p class="input-group">
                    <input type="text" id="{{::vm.id}}" name="{{::vm.id}}"
                        class="form-control" enable-date="false"
                        datetime-picker="{{vm.format}}" ng-model="vm.ngModel"
                        close-on-selection="true" is-open="vm.isOpen"
                        required="true" placeholder="{{vm.format | uppercase}}"
                        ng-keyup="vm.updateTime()"
                        timepicker-options="vm.timeOptions" />
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-fa btn-default"
                            ng-click="vm.openTimePicker($event, prop)">
                                <i class="fa fa-clock-o"></i>
                        </button>
                    </span>
                </p>
            `
        };
    });
})(angular);
