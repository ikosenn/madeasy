(function (angular, _) { // jscs:ignore disallowAnonymousFunctions
    "use strict";

    angular.module("madeasy.layout.directives.responsiveCheck", [])

    .directive("responsiveCheck", responsiveCheck);
    responsiveCheck.$inject = ["$rootScope"];
    function responsiveCheck ($rootScope) {
        return {
            link: function linkFunction (scope, element) {
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
            },
            restrict: "E"
        };
    }
})(angular, _);
