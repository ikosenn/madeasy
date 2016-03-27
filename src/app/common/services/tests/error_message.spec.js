"use strict";

describe("Tests for the 'errorMessage' service handler", function () {
    var alert;

    beforeEach(function () {
        module("madeasy.config");
        module("madeasy.common.errorMessages");
        module("madeasy.common.services.query_adapter");
        inject(["errorMessage",
            function (_alert) {
                alert = _alert;
            }]);
    });

    it ("Should log required fields that have errors stored in arrays", function () {
        var err = {
            data: {
                first_name: ["This field is required"],
                last_name: ["This field is required"]
            }
        };
        var result = alert.showError(err);
        var errors = {
            msg: [
                {
                    "First name": "This field is required",
                    "Last name": "This field is required"
                }
            ],
            title: "Validation Error",
            type: "danger"
        };
        expect(result).toEqual(errors);
        expect(result.msg).toEqual(errors.msg);
    });

    it ("Should log required fields that have errors stored as string", function () {
        var err = {
            data: {
                date_of_birth: "Date of birth cannot be a future date"
            }
        };
        var result = alert.showError(err);
        var errors = {
            msg: [
                {
                    "Date of birth": "Date of birth cannot be a future date"
                }
            ],
            title: "Validation Error",
            type: "danger"
        };
        expect(result).toEqual(errors);
        expect(result.msg).toEqual(errors.msg);
    });

    it ("Should capitalize the first character of a word that has " +
    "no underscore", function () {
        var err = {
            data: [
                {
                    person: "This field is required"
                }
            ]
        };
        var result = alert.showError(err);
        var errors = {
            msg: [
                {
                    "Person": "This field is required"
                }
            ],
            title: "Validation Error",
            type: "danger"
        };
        expect(result).toEqual(errors);
        expect(_.keys(result.msg[0])).toContain("Person");
    });

    it ("should convert a single string error into an object that contains " +
    "the \"data\" key and recursively call on `traverse()` func" , function () {
        var err = "Please Connect to the internet and retry";
        var result = alert.showError(err, "No Internet");
        var errors = {
            msg: [
                {
                    "No internet": err
                }
            ],
            title: "No Internet",
            type: "danger"
        };
        expect(result).toEqual(errors);
        expect(_.keys(result.msg[0])).toEqual(_.keys(errors.msg[0]));
    });

    it ("Should return show a successfull message on successfull validation ",
    function () {
        var result = alert.showSuccess();
        var success = {
            msg: "Record has been saved successfully",
            title: "Success",
            type: "success"
        };
        expect(result).toEqual(success);
        expect(result.msg).toEqual(success.msg);
    });

    it ("Should return object keys when backend errors are returned as an " +
    "array of objects", function () {
        var err = {
            data:{
                person: "This field is required"
            }
        };
        var result = alert.showError(err);
        var error = {
            msg: {
                "Person": {
                    "Person": "This field is required"
                }
            },
            title: "Validation Error",
            type: "danger"
        };
        expect(result.msg[0]).toEqual(error.msg.Person);
        expect(_.keys(result.msg[0])).toContain("Person");
    });

    it ("Should return a fallback message when the 'data' key contains null",
    function () {
        var err = {
            data: null,
            status: -1
        };
        var result = alert.showError(err);
        var error = {
            msg: {
                "Error": "Sorry, a connection error occurred"
            },
            title: "Validation Error",
            type: "danger"
        };
        expect(result.msg[0].Error).toEqual(error.msg.Error);
        expect(_.keys(result.msg[0])).toContain("Error");
    });

    it ("Should return a fallback message when the 'data' key contains nothing",
    function () {
        var err = {
            data: "",
            status: -1
        };
        var result = alert.showError(err);
        var error = {
            msg: {
                "Error": "Sorry, a connection error occurred"
            },
            title: "Validation Error",
            type: "danger"
        };
        expect(result.msg[0].Error).toEqual(error.msg.Error);
        expect(_.keys(result.msg[0])).toContain("Error");
    });

    it ("should alert with a connection error message if the api is" +
    " not connected: ``status: 0``", function () {
        var err = {
            status: 0
        };
        var result = alert.showError(err);
        var error = {
            msg: {
                "Error": "Sorry, a connection error occurred"
            },
            title: "Error",
            type: "danger"
        };
        expect(result.msg[0].Error).toEqual(error.msg.Error);
        expect(_.keys(result.msg[0])).toContain("Error");
    });
    it ("should alert with a connection error message if the api is" +
    " not connected: ``status: -1``", function () {
        var err = {
            status: -1
        };
        var result = alert.showError(err);
        var error = {
            msg: {
                "Error": "Sorry, a connection error occurred"
            },
            title: "Error",
            type: "danger"
        };
        expect(result.msg[0].Error).toEqual(error.msg.Error);
        expect(_.keys(result.msg[0])).toContain("Error");
    });

    it ("Should extract messages not contained in objects", function () {
        var err = {
            data:{
                temperature: "Temperature cannot be above 40 degrees"
            }
        };
        var result = alert.showError(err);
        var error = {
            msg: {
                "Temperature": "Temperature cannot be above 40 degrees"
            },
            title: "Validation Error",
            type: "danger"
        };
        expect(result.msg[0].Temperature).toEqual(error.msg.Temperature);
        expect(_.keys(result.msg[0])).toContain("Temperature");
    });

    it ("Should show 'warning' messages and the title as the 2nd arg passed",
    function () {
        var msg = "Some warning";
        var result = alert.showWarning(msg, "Vitals Warning");
        var warning = {
            msg: msg,
            title: "Vitals Warning",
            type: "warning"
        };
        expect(result.msg).toEqual(warning.msg);
        expect(result.type).toEqual(warning.type);
        expect(result.title).toEqual(warning.title);
    });

    it ("Should show 'info' messages and the title as the the 2nd arg passed",
    function () {
        var msg = "Some Info";
        var result = alert.showInfo(msg, "Patient Info");
        var warning = {
            msg: msg,
            title: "Patient Info",
            type: "info"
        };
        expect(result.msg).toEqual(warning.msg);
        expect(result.type).toEqual(warning.type);
        expect(result.title).toEqual(warning.title);
    });

    it ("Should show 'warning' messages with the title 'Warning' if 2nd arg" +
    " is not passed", function () {
        var msg = "Some warning";
        var result = alert.showWarning(msg);
        var warning = {
            msg: msg,
            title: "Warning",
            type: "warning"
        };
        expect(result.msg).toEqual(warning.msg);
        expect(result.type).toEqual(warning.type);
        expect(result.title).toEqual(warning.title);
    });

    it ("Should show 'info' messages with the title 'Info' when 2nd arg is" +
    " not passed", function () {
        var msg = "Some Info";
        var result = alert.showInfo(msg);
        var warning = {
            msg: msg,
            title: "Info",
            type: "info"
        };
        expect(result.msg).toEqual(warning.msg);
        expect(result.type).toEqual(warning.type);
        expect(result.title).toEqual(warning.title);
    });
});
