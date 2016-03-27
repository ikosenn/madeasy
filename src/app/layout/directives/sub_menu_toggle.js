(function (angular) { // jscs:ignore disallowAnonymousFunctions
    "use strict";

    angular.module("madeasy.layout.directives.subMenuToggle", [])

    .directive("submenuToggle", submenuToggle);
    function submenuToggle () {
        return {
            link: function linkFunction (scope, element) {
                var elm = angular.element(element);
                elm.bind("click", function () {
                    angular.element("#content_wrapper")
                        .toggleClass("null-out");
                    angular.element("#sidebar_left")
                        .toggleClass("dis-none");
                });
            },
            restrict: "E"
        };
    }
})(angular);
