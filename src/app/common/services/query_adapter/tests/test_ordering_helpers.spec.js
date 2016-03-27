"use strict";

describe ("Test the ordering_helpers service", function () {
    var orderingHelper;

    beforeEach (function () {
        module("madeasy.common.ordering.helpers");
        module("madeasy.common.query.paramsCache");
        module("madeasy.common.adapter.utils");
        module("madeasy.config");

        inject (["madeasy.common.ordering.helper", function (_orderingHelper) {
            orderingHelper = _orderingHelper;
        }]);
    });

    it ("Should verify valid resource", function () {
        var resource = {
            "name": "encounter"
        };
        var func = function () {
            orderingHelper.getSorter(resource);
        };
        expect(func).not.toThrow();
    });

    it("Should throw for an invalid resource supplied", function () {
        var resource = {
            "random": "stuff"
        };
        var func = function () {
            orderingHelper.getSorter(resource);
        };
        expect(func).toThrow();
    });

    it("Should throw if resource is not an obj", function () {
        var resource = "random stuff";
        var func = function () {
            orderingHelper.getSorter(resource);
        };
        expect(func).toThrow();
    });

    it ("Should return an object of pre-evaluated keys", function () {
        var res = {
            "name": "encounter"
        };
        expect(orderingHelper.getSorter(res)
            .hasOwnProperty("getOrderingConfig")).toBeTruthy();
        expect(orderingHelper.getSorter(res)
            .hasOwnProperty("getResourceParams")).toBeTruthy();
        expect(orderingHelper.getSorter(res)
            .hasOwnProperty("removeOrderingConfig")).toBeTruthy();
        expect(orderingHelper.getSorter(res)
            .hasOwnProperty("updateOrdering")).toBeTruthy();
        expect(orderingHelper.getSorter(res)
            .hasOwnProperty("removeOrdering")).toBeTruthy();
    });
});
