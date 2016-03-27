(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.passwordChecker", [])

    .directive("silPwChecker", [function() {
        //This directive is used to validate that two passwords are similar

        return {
            link: function(scope, elem, attrs, ngModel) {

                ngModel.$validators.passwordMatch =
                    function (modelValue, viewValue) {
                        return viewValue === scope.silPwChecker;
                    };
            },
            require: "?ngModel",
            scope: {
                silPwChecker: "@"
            }
        };
    }]);
})(angular);
