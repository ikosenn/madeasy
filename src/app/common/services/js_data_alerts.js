(function (angular) {
    "use strict";

    angular.module("madeasy.common.services.js_data_alerts", [])

    .service("madeasy.common.service.js_data_alerts", [function () {
        /**
        *   This service defines various alerts types for the madeasy.
        *   It borrows heavily from the `sil-alerts` in-house directive.
        *   The major difference is in the directive's template which
        *   iterates over array of objects.
        *   see (common/directives/sil_js_data_alerts.js)
        */

        var buttonType = ["success", "danger", "info", "warning"];
        this.showMsg = function (message, title, type) {
            return {"msg": message, "title": title, "type": type};
        };
        this.showOk = function(message, title) {
            return this.showMsg(message, title, buttonType[0]);
        };

        this.showErr = function(message, title) {
            return this.showMsg(message, title, buttonType[1]);
        };

        this.showInfo = function(message, title) {
            return this.showMsg(message, title, buttonType[2]);
        };

        this.showWarning = function(message, title) {
            return this.showMsg(message, title, buttonType[3]);
        };

    }]);
}) (angular);
