(function (angular) {
    "use strict";

    angular.module("madeasy.common.convertors.bmi", [])

    .service("madeasy.common.bmi", function () {
        var getBMI = function (height, weight) {
            var newHeight = (height * 1.0) / 100;
            var squaredHeaight = (newHeight * 1.0) * newHeight;
            var bmi = weight / squaredHeaight;
            return bmi.toFixed(2);
        };
        return {
            "bmi": getBMI
        };
    });
})(angular);
