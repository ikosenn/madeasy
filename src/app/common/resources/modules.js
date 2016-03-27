(function (angular) {
    "use strict";

    angular.module("madeasy.resources.common",[
        "madeasy.resources.common.jsDataUtils",
        "madeasy.resources.common.deserialize_drf",
        "madeasy.resources.common.resourceHttpMethods"
    ]);
})(angular);
