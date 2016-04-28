(function library (angular) {
    "use strict";

    angular.module("madeasy.auth", [
        "madeasy.auth.controllers",
        "madeasy.auth.states",
        "madeasy.auth.oauth2",
        "madeasy.auth.services",
        "madeasy.exceptions",
        "madeasy.auth.formly"
    ]);
})(angular);
