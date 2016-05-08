(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.sidebar", [])

    .directive("madeasySidebar", function () {
        return {
            replace: true,
            restrict: "E",
            template: `
                <div class="sidebar-left-content">
                    <ul class="nav sidebar-menu" ng-transclude>
                    </ul>
                </div>
            `,
            transclude: true
        };
    });
})(angular);
