(function (angular) { // jscs:ignore disallowAnonymousFunctions
    "use strict";

    var dependencies = [
        // 3rd party
        "ngAnimate",
        "templates-app",
        "ui.bootstrap",
        "js-data",
        "formly",
        "formlyBootstrap",
        "ngMessages",
        "ncy-angular-breadcrumb",

        //Modules
        "madeasy.common",
        "madeasy.auth",
        "madeasy.config",
        "madeasy.layout",
        "madeasy.constants"
    ];

    angular.module("madeasyApp", dependencies);

})(window.angular);
