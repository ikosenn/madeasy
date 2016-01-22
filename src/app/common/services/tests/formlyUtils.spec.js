"use strict";

describe("Unit Test: emr.common.formly service", function () {
    beforeEach(module("emr.common.formly", "emrApp",
                      "emr.common.services.query_adapter"));

    describe("Test: emr.common.formly.loadFormly", function () {
        var formly, httpBackend, formlyConfig;
        beforeEach(function () {
            inject(["emr.common.formly.loadFormly", "$httpBackend",
                "formlyConfig",
                function (loadFormly, _httpBackend_, _formlyConfig_) {
                    formly = loadFormly;
                    httpBackend = _httpBackend_;
                    formlyConfig = _formlyConfig_;
                }
            ]);
        });

        it("should start the formly service",function () {
            spyOn(formlyConfig, "setType");
            inject(["emr.common.formly.formlyConfig",
                function (formlyConfigService) {
                formlyConfigService.setType();
                expect(formlyConfig.setType).toHaveBeenCalled();
            }]);
        });

        it("Should lowercase 1st character if a a-z chars are passed",
            function () {
                inject(["emr.common.formly.formlyConfig",
                    function (formlyConfigService) {
                        var character = "DANIEL";
                        var camelize = formlyConfigService.camelize(character);
                        expect(camelize).toEqual("dANIEL");
                    }]);
            });
        it("Should return an empty string if no match is found",
            function () {
                inject(["emr.common.formly.formlyConfig",
                    function (formlyConfigService) {
                        var character = "--";
                        var workon = formlyConfigService.camelize(character);
                        expect(workon).toEqual("");
                    }]);
            });
        it("Should return an empty string if no match is found",
            function () {
                inject(["emr.common.formly.formlyConfig",
                    function (formlyConfigService) {
                        var character = "daniel";
                        var workon = formlyConfigService.camelize(character);
                        expect(workon).toEqual("daniel");
                    }]);
            });
    });
});
