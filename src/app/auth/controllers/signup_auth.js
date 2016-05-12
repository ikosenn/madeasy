(function (angular) {
    "use strict";

    angular.module("madeasy.auth.signup", [
        "madeasy.common.errorMessages",
        "sil.datalayer",
        "madeasy.auth.formly.signup"
    ])
    .controller("madeasy.auth.controllers.signUp", signUp);
    signUp.$inject = [
        "$scope", "$state", "madeasy.auth.formly.signup", "errorMessage",
        "silDataLayer"
    ];
    function signUp ($scope, $state, formlyService, auth_error, silDataLayer) {

        $scope.signUpForm = {};

        $scope.fields = formlyService.getFields();

        $scope.submitUser = function () {
            var error_fxn = function (data) {
                $scope.alert = auth_error.showError(data, "Error");
            };

            var success_fxn = function () {
                $state.go("auth_login", {"new_user": true});
            };

            if ($scope.signUpForm.$valid) {
                silDataLayer.create("users", $scope.signUpModel)
                    .then(success_fxn, error_fxn);
            }
            else {
                var data = {
                    "data": {
                        "error": "Please correct the" +
                        " errors on the form before signing up"
                    }
                };
                error_fxn(data);
            }
        };
    }
})(window.angular);
