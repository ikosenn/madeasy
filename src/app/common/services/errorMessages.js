"use strict";

angular.module("madeasy.common.errorMessages", ["sil.alerts.service"])

.service("errorMessage", ["sil.transaction.alert", function (alert) {
    var e = this;

    e.showError = function (err) {
        var traverse = function (err) {
            var type = typeof err;
            if (err != null && type === "object") {
                var log = [];
                for (var key in err) {
                    log.push(key);
                    traverse (err[key]);
                }
                return "The following fields are required: " + log;
            } else {
                return err;
            }
        };
        var msg = traverse (err);
        return alert.showErr(msg, "Validation Error");
    };

    e.showSuccess = function (success) {
        success = "Record has been saved successfully";
        return alert.showOk(success, "Success");
    };
}]);
