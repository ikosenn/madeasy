(function (angular) {
    "use strict";

    angular.module("madeasy.auth.states", [])

    .config(["$stateProvider", function ($stateProvider) {
        $stateProvider
            .state("auth_base", {
                views:{
                    "main":{
                        templateUrl: "auth/tpls/auth_base.tpl.html"
                    }
                }
            })
            .state("auth_login", {
                url: "/login",
                parent: "auth_base",
                views:{
                    "form":{
                        controller: "madeasy.auth.controllers.loginAuth",
                        templateUrl: "auth/tpls/login.tpl.html"
                    }
                }
            })
            .state("auth_logout", {
                url: "/logout",
                parent: "auth_base",
                views:{
                    "form":{
                        controller: "madeasy.auth.controllers.logoutAuth",
                        templateUrl: "auth/tpls/login.tpl.html"
                    }
                }
            });
    }]);

})(angular);
