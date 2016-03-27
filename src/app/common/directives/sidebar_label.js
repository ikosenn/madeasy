(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.sidebarLabel", [])

    .directive("sidebarLabel", function () {
        return {
            replace: true,
            restrict: "E",
            scope: {
                label: "@"
            },
            template: `
                <li class="sidebar-label pt20">{{label}}</li>
            `
        };
    });
})(angular);
