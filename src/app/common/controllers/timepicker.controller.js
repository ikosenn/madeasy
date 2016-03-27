(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.controllers.timepicker", [])

    .controller("madeasy.common.timepickerController", ["$scope",
        "madeasy.common.dateTimeManipulator",
        function ($scope, dateTime) {
            var vm = this;

            vm.timeOptions = {
                "showMeridian": false,
                "showSeconds": true
            };

            vm.isOpen = false;
            vm.openTimePicker = function (e) {
                e.preventDefault();
                vm.isOpen = true;
            };

            vm.updateTime = function () {
                var timeOp = $scope.$parent.form[vm.id].$viewValue;
                var time = dateTime.manipulateDateTime(timeOp);
                vm.ngModel =
                    !_.isUndefined(time) ? time : vm.ngModel;
            };
        }
    ]);
})(angular, _);
