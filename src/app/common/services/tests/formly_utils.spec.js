"use strict";

describe("Unit Test: madeasy.common.formlyUtils service", function () {
    beforeEach(module("madeasy.common.formlyUtils", "madeasyApp",
                      "madeasy.common.services.query_adapter"));

    describe("Test: madeasy.common.formlyUtils", function () {
        var httpBackend, formlyConfig;
        beforeEach(function () {
            inject(["$httpBackend", "formlyConfig",
                function (_httpBackend_, _formlyConfig_) {
                    httpBackend = _httpBackend_;
                    formlyConfig = _formlyConfig_;
                }
            ]);
        });

        it("should start the formly service",function () {
            spyOn(formlyConfig, "setType");
            inject(["madeasy.common.formly.formlyConfig",
                function (formlyConfigService) {
                formlyConfigService.setType();
                expect(formlyConfig.setType).toHaveBeenCalled();
            }]);
        });

        it("Should lowercase 1st character if a a-z chars are passed",
            function () {
                inject(["madeasy.common.formly.formlyConfig",
                    function (formlyConfigService) {
                        var character = "DANIEL";
                        var camelize = formlyConfigService.camelize(character);
                        expect(camelize).toEqual("dANIEL");
                    }]);
            });
        it("Should return an empty string if no match is found",
            function () {
                inject(["madeasy.common.formly.formlyConfig",
                    function (formlyConfigService) {
                        var character = "--";
                        var workon = formlyConfigService.camelize(character);
                        expect(workon).toEqual("");
                    }]);
            });
        it("Should return an empty string if no match is found",
            function () {
                inject(["madeasy.common.formly.formlyConfig",
                    function (formlyConfigService) {
                        var character = "daniel";
                        var workon = formlyConfigService.camelize(character);
                        expect(workon).toEqual("daniel");
                    }]);
            });
    });
});
