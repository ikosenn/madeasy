(function (angular) { // jscs:ignore disallowAnonymousFunctions
    "use strict";

    angular.module("madeasy.layout.directives.menuToggle", [])

    .directive("menuToggle", menuToggle);
    function menuToggle () {
        return {
            link: function linkFunction (scope, element) {
                var elm = angular.element(element);
                elm.bind("click", function clickFunction () {
                    elm.toggleClass("menu-opened");
                    angular.element("#main-top-nav")
                        .toggleClass("show-me");
                });
            },
            restrict: "E"
        };
    }
})(angular);
