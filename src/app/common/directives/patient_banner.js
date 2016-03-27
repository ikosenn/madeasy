(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.patientBanner", [])

    .directive("silPatientBanner", [function () {
        /**
         * This is a directive to handle the basic and important patient
         * information that goes in the patient banner.
         */

        return {
            controller: "madeasy.common.patientBannerLoader",
            replace:true,
            restrict: "E",
            scope: {},
            templateUrl: "common/tpls/views/patient_banner.tpl.html"
        };
    }]);
})(angular);
