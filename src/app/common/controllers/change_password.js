(function (angular) {
    "use strict";

    angular.module("madeasy.common.controllers.changePass", [
        "madeasy.common.services",
        "madeasy.common.formly.change_password",
        "madeasy.common.errorMessages"
    ])

    .controller("madeasy.common.controllers.changePassword", [
        "$scope", "$state", "madeasy.common.formly.change_password",
        "madeasy.auth.services.login", "errorMessage",
        function ( $scope, $state, formlyService, AuthService, alertServ) {

            $scope.fields = formlyService.getFields();

            $scope.changePassword = function () {

                var error_fxn = function (data) {
                    $scope.alert = alertServ.showError(data, "Error");
                };

                var success_fxn = function () {
                    AuthService.logout();
                    $state.go("auth_logout", {change_pwd: true});
                };

                if ($scope.changePasswordForm.$valid) {
                    AuthService.changePassword($scope.changePasswordForm.model)
                        .then(success_fxn, error_fxn);
                }
                else {
                    var data = {
                        "data": {
                            "error": "Please correct the" +
                            " errors on the form to change your password"
                        }
                    };
                    error_fxn(data);
                }
            };
        }
    ]);
})(angular);
