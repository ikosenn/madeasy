"use strict";

describe("Tests for the 'errorMessage' service handler", function () {
    var alert, tAlert;

    beforeEach(function () {
        module("emr.common.errorMessages");
        module("emr.common.services.query_adapter");
        module("sil.alerts.service");

        inject(["sil.transaction.alert", "errorMessage",
            function (_tAlert, _alert) {
                alert = _alert;
                tAlert = _tAlert;
            }]);
    });

    it ("Should log undefined fields", function () {
        var err = {
            "first_name": {
                "errors": [
                    {
                        "rule": "type",
                        "actual": "undefined",
                        "expected": "string"
                    },
                    {
                        "rule": "nullable",
                        "actual": "x === undefined",
                        "expected": "x !== null && x !== undefined"
                    }
                ]
            }
        };
        var data = alert.showError(err);
        expect(data).toEqual({
            type : "danger",
            msg : "The following fields are required: first_name",
            title : "Validation Error"
        });
    });
});
