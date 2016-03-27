(function (angular) {
    "use strict";

    angular.module("madeasy.common.controllers.datetimepicker", [
    ])

    //Shows both the date and time pickers
    .controller("madeasy.common.datetimepicker", ["$scope", function ($scope) {
        $scope.isOpen = false;
        $scope.dateTimeOptions = {
            "showMeridian": false,
            "showSeconds": true
        };
        $scope.openDateTimePicker = function(e) {
            e.preventDefault();
            $scope.isOpen = true;
        };
    }]);
})(angular);
