"use strict";

describe ("Test the partial_response_helpers service", function () {
    var partialsHelper;

    beforeEach (function () {
        module("madeasy.common.partials.helpers");
        module("madeasy.common.query.paramsCache");
        module("madeasy.resources.common.jsDataUtils");
        module("madeasy.resources.common.deserialize_drf");
        module("madeasy.common.adapter.utils");

        inject (["madeasy.common.partial.response.service",
            function (_partialsHelper) {
                partialsHelper = _partialsHelper;
            }]);
    });

    it ("Should verify valid resource", function () {
        var resource = {
            "name": "encounter"
        };
        var func = function () {
            partialsHelper.getPartialResponse(resource);
        };
        expect(func).not.toThrow();
    });

    it("Should throw for an invalid resource supplied", function () {
        var resource = {
            "random": "stuff"
        };
        var func = function () {
            partialsHelper.getPartialResponse(resource);
        };
        expect(func).toThrow();
    });

    it("Should throw if resource is not an obj", function () {
        var resource = "random stuff";
        var func = function () {
            partialsHelper.getPartialResponse(resource);
        };
        expect(func).toThrow();
    });

    it ("Should return an object of pre-evaluated keys", function () {
        var resource = {
            "name": "encounter"
        };
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("getPartialResponseConfig")).toBeTruthy();
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("getResourceParams")).toBeTruthy();
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("removePartialsResponseConfig")).toBeTruthy();
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("updatePartialResponse")).toBeTruthy();
        expect(partialsHelper.getPartialResponse(resource)
            .hasOwnProperty("removePartialsResponse")).toBeTruthy();
    });
});
