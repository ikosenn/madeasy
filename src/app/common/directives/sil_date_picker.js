(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.datePicker", [
        "madeasy.common.controllers.datepicker"
    ])

    .directive("silDatePicker", function () {

        return {
            bindToController: {
                format: "@",
                id: "@",
                ngModel: "="
            },
            controller: "madeasy.common.datepickerController",
            controllerAs: "vm",
            replace: true,
            restrict: "E",
            scope: {},
            template: `
                <p class="input-group">
                    <input type="text" id="{{::vm.id}}" name="{{::vm.id}}"
                        class="form-control" close-on-date-selection="true"
                        enable-time="false" ng-keyup="vm.updateDate()"
                        datetime-picker="{{vm.format}}" ng-model="vm.ngModel"
                        is-open="vm.isOpen" required="true"
                        placeholder="{{vm.format | uppercase}}"
                        aria-describedby="{{vm.id}}_description"/>
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-fa btn-default"
                        ng-click="vm.openDatePicker($event, prop)">
                            <i class="fa fa-calendar"></i>
                        </button>
                    </span>
                </p>
            `
        };
    });
})(angular);
