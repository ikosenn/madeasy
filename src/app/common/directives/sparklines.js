(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.sparklineChart", [])

    .directive("silSparkline", function () {
        return {
            link: function (scope, element, attrs) {
                    attrs.$observe("data", function (newValue) {
                        element.html(newValue);
                        element.sparkline("html", {
                            barColor: "blue",
                            barWidth: 15,
                            height: "20px",
                            type: "line",
                            width: "40%"
                        });
                    });
                },
            restrict: "E",
            scope: {
                data: "@"
            }
        };
    });
})(angular);
