(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.loginAuth", [
        "madeasy.config",
        "madeasy.auth.services",
        "madeasy.common.errorMessages",
        "madeasy.auth.formly"
    ])
    .controller("madeasy.auth.controllers.loginAuth", loginAuth);
    loginAuth.$inject = ["$scope", "$state", "$stateParams",
    "madeasy.auth.services.login", "madeasy.auth.formly.login",
    "$window", "errorMessage", "madeasy.auth.services.homePage"];
    function loginAuth ($scope, $state, $stateParams,
        loginService, formlyService, $window, auth_error,
        homePageServ) {

        $scope.loginForm = {};

        $scope.fields = formlyService.getFields();
        $scope.params = $stateParams;

        $scope.submitUser = function submitUserFunction () {
            var error_fxn = function errorFunction (data) {
                $scope.alert = auth_error.showError(data, "Error");
            };

            var success_fxn = function successFunction () {
                loginService.startTimeout();
                var load_state = loginService.loadState();
                loginService.clearState();
                if (load_state) {
                    $state.go(load_state.name, load_state.params);
                } else {
                    var homePage = homePageServ.determineHomePage();
                    $state.go(homePage);
                }
            };

            if ($scope.loginForm.$valid) {
                loginService.login($scope.loginForm.model)
                    .then(
                        function validLoginFormFunction () {
                            loginService.currentUser()
                                .then(success_fxn, error_fxn);
                        },
                        error_fxn
                    );
            }
            else {
                var data = {
                    "data": {
                        "error": "Please correct the" +
                        " errors on the form before logging In"
                    }
                };
                error_fxn(data);
            }
        };
    }
})(angular);
