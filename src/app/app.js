(function (angular) { // jscs:ignore disallowAnonymousFunctions
    "use strict";

    var dependencies = [
        // 3rd party
        "ngAnimate",
        "templates-app",
        "ui.bootstrap",
        "formly",
        "formlyBootstrap",
        "ngMessages",
        "ncy-angular-breadcrumb",

        //Modules
        "madeasy.common",
        "madeasy.auth",
        "madeasy.config",
        "madeasy.layout",
        "madeasy.constants",
        "madeasy.parser"
    ];

    angular.module("madeasyApp", dependencies);

})(window.angular);
