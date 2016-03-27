"use strict";

describe("Unit Test: Sil JS Data Alerts Service", function () {
    var jsDataAlerts;
    beforeEach(function () {
        module("madeasy.common.services.js_data_alerts");

        inject(["madeasy.common.service.js_data_alerts", function (_jsDataAlerts_) {
            jsDataAlerts = _jsDataAlerts_;
        }]);
    });

    it("should return a 'success' alert on showOK function", function () {
        var msg = "Data have been saved";
        var title = "Saved";
        var result = jsDataAlerts.showOk(msg, title);
        expect(result.type).toEqual("success");
        expect(result.msg).toEqual(msg);
        expect(result.title).toEqual(title);
    });

    it("should return a 'danger' alert on showErr function", function () {
        var msg = "An error occured";
        var title = "Error";
        var result = jsDataAlerts.showErr(msg, title);
        expect(result.type).toEqual("danger");
        expect(result.msg).toEqual(msg);
        expect(result.title).toEqual(title);
    });

    it("should return a 'warning' alert on showWarning function", function () {
        var msg = "Saving a record without a hand generated ID";
        var title = "Warning";
        var result = jsDataAlerts.showWarning(msg, title);
        expect(result.type).toEqual("warning");
        expect(result.msg).toEqual(msg);
        expect(result.title).toEqual(title);
    });

    it("should return an 'info' alert on showInfo function", function () {
        var msg = "Patient ID Present";
        var title = "info";
        var result = jsDataAlerts.showInfo(msg, title);
        expect(result.type).toEqual("info");
        expect(result.msg).toEqual(msg);
        expect(result.title).toEqual(title);
    });
});
