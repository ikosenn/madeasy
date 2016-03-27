(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.logoutAuth", [
        "madeasy.config",
        "madeasy.auth.services"
    ])
    .controller("madeasy.auth.controllers.logoutAuth", logoutAuth);
    logoutAuth.$inject = ["$scope", "$state", "$stateParams",
    "madeasy.auth.services.login"];
    function logoutAuth ($scope, $state, $stateParams, loginService) {
        $scope.logout = true;

        var callback = function callbackFunction () {
            loginService.stopTimeout();
            $state.go("auth_login", {
                "change_pwd": $stateParams.change_pwd,
                "timeout": $stateParams.timeout
            });
        };
        return loginService.logout().then(callback, callback);
    }
})(angular);
