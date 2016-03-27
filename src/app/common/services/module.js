(function (angular) {
    "use strict";

    angular.module("madeasy.common.services", [
        "madeasy.common.convertors",
        "madeasy.common.errorMessages",
        "madeasy.common.services.query_adapter",
        "madeasy.common.convertors.bmi",
        "madeasy.common.resourceUtilities",
        "madeasy.common.imageValidator",
        "madeasy.common.services.js_data_alerts",
        "madeasy.common.formlyUtils",
        "madeasy.common.manipulators.dateTime"
    ]);
})(angular);
