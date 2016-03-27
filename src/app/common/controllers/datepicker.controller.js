(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.controllers.datepicker", [])

    .controller("madeasy.common.datepickerController", ["$scope",
        "madeasy.common.dateTimeManipulator",
        function ($scope, dateTime) {
            var vm = this;

            vm.isOpen = false;
            vm.openDatePicker = function (e) {
                e.preventDefault();
                vm.isOpen = true;
            };

            vm.updateDate = function () {
                var dateOp = $scope.$parent.form[vm.id].$viewValue;
                var date = dateTime.manipulateDateTime(dateOp);
                vm.ngModel =
                    !_.isUndefined(date) ? date : vm.ngModel;
            };
        }
    ]);
})(angular, _);
