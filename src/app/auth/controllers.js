"use strict";

angular.module("madeasy.auth.controllers",[
    "madeasy.config",
    "madeasy.auth.services",
    "madeasy.common.formly",
    "madeasy.common.services.formly.auth"
])

.controller("madeasy.auth.controllers.loginAuth",
    ["$scope", "$state", "$stateParams", "madeasy.auth.services.login",
    "HOME_PAGE_NAME", "madeasy.common.services.auth.login",
    "madeasy.auth.services.loginFormValidations", "madeasy.auth.error",
    function ($scope, $state, $stateParams,
        loginService, HOME_PAGE_NAME, formlyService, validation,
        auth_error) {

        validation.setValidations();
        $scope.loginForm = {};

        $scope.fields = formlyService.getFields();

        $scope.login_err = "";
        $scope.login_err_html = "";
        $scope.params = $stateParams;

        $scope.submitUser = function() {
            var error_fxn = function (data) {
                auth_error.error_fxn($scope, data);
            };

            var success_fxn = function () {
                loginService.startTimeout();
                var load_state = loginService.loadState();
                loginService.clearState();
                if (load_state) {
                    $state.go(load_state.name, load_state.params);
                } else {
                    $state.go(HOME_PAGE_NAME);
                }
            };

            if ($scope.loginForm.$valid) {
                loginService.login($scope.loginForm.model)
                    .then(
                        function () {
                            loginService.currentUser()
                                .then(success_fxn, error_fxn);
                        },
                        error_fxn
                    );
            }
            else {
                var data = {
                    "data": {
                        "error_description": "Please correct the" +
                        " errors on the form before logging In"
                    }
                };
                error_fxn(data);
            }
        };
    }
])

.controller("madeasy.auth.controllers.logoutAuth",
    ["$scope", "$state", "madeasy.auth.services.login",
    function ($scope, $state, loginService) {
        $scope.logout = true;

        var callback = function () {
            $state.go("auth_login");
        };
        return loginService.logout().then(callback, callback);
    }
])

.controller("madeasy.auth.controllers.userDetails",
    ["$scope", "$state", "madeasy.auth.services.login", "$rootScope",
    function ($scope, $state, loginService, $rootScope) {
        var currUser = loginService.getUser();

        $scope.displayName = currUser.first_name + " " + currUser.last_name;

        $scope.logout = function () {
            $state.go("auth_logout");
        };

        $rootScope.$on("http.auth.forbidden", function () {
            $state.go("auth_403");
        });

    }
])

.controller("madeasy.auth.controllers.authBase", ["$scope", "$state",
        function ($scope, $state) {
            $scope.year = new Date().getFullYear();
            $scope.params = $state.params;
        }
]);
