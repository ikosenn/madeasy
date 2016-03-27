(function (angular) { // jscs:ignore disallowAnonymousFunctions
    "use strict";

    angular.module("madeasy.layout.directives.breadCrumbs", [
        "ui.router"
    ])

    .directive("breadCrumbs", breadCrumbs);
    breadCrumbs.$inject = ["$rootScope", "$state"];
    function breadCrumbs ($rootScope, $state) {
        return {
            link: function linkFunction (scope) {
                var listener = function listenerFunction (event, toState) {
                    if (toState.data && toState.data.title) {
                        scope.title = toState.data.title;
                        scope.icon = toState.data.icon;
                    }
                    if (toState.redirectTo) {
                        event.preventDefault();
                        $state.go(toState.redirectTo);
                    }
                };
                $rootScope.$on("$stateChangeSuccess", listener);
            },
            restrict: "E",
            template: `<div ncy-breadcrumb></div>`
        };
    }
})(angular);
