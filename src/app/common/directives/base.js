"use strict";

angular.module("madeasy.common.directives.base", [
    "ui.router"
])

.directive("breadCrumbs", ["$rootScope", "$state",
    function ($rootScope, $state) {
        return {
            restrict: "AE",
            templateUrl: "common/tpls/breadcrumbs.tpl.html",
            link: function (scope, element) {
                var listener = function(event, toState) {
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
            }
        };
    }
])

.directive("responsiveCheck", ["$rootScope",
    function ($rootScope) {
        return {
            restrict: "A",
            link: function (scope, element) {
                $rootScope.toggle = false;

                var elm = angular.element(element);
                if (_.isEmpty(elm.html())) {
                    angular.element("#content_wrapper")
                        .addClass("null-out");
                    angular.element("#sidebar_left")
                        .addClass("dis-none");
                }
                else {
                    $rootScope.toggle = "true";
                    angular.element("#content_wrapper")
                        .removeClass("null-out");
                    angular.element("#sidebar_left")
                        .removeClass("dis-none");
                }
            }
        };
    }
])

.directive("menuToggle", [function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var elm = angular.element(element);
            elm.bind("click", function () {
                elm.toggleClass("menu-opened");
                angular.element("#main-top-nav")
                    .toggleClass("show-me");
            });
        }
    };
}])

.directive("submenuToggle", [function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var elm = angular.element(element);
            elm.bind("click", function () {
                angular.element("#content_wrapper")
                    .toggleClass("null-out");
                angular.element("#sidebar_left")
                    .toggleClass("dis-none");
            });
        }
    };
}]);
