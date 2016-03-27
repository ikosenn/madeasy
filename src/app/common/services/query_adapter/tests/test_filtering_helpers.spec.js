"use strict";

describe ("Test the filtering_helpers service", function () {
    var filteringHelper;

    beforeEach (function () {
        module ("madeasy.common.filtering.helpers");
        module("madeasy.common.query.paramsCache");
        module("madeasy.resources.common.jsDataUtils");
        module("madeasy.resources.common.deserialize_drf");
        module("madeasy.common.adapter.utils");

        inject (["madeasy.common.filtering.helper", function (_filteringHelper) {
            filteringHelper = _filteringHelper;
        }]);
    });

    it ("Should verify valid resource", function () {
        var resource = {
            "name": "encounter"
        };
        var func = function () {
            filteringHelper.getFilter(resource);
        };
        expect(func).not.toThrow();
    });

    it("Should throw for an invalid resource supplied", function () {
        var resource = {
            "random": "stuff"
        };
        var func = function () {
            filteringHelper.getFilter(resource);
        };
        expect(func).toThrow();
    });

    it("Should throw if resource is not an obj", function () {
        var resource = "random stuff";
        var func = function () {
            filteringHelper.getFilter(resource);
        };
        expect(func).toThrow();
    });

    it ("Should return an object of pre-evaluated keys", function () {
        var res = {
            "name": "encounter"
        };
        expect(filteringHelper.getFilter(res)
            .hasOwnProperty("getFilteringConfig")).toBeTruthy();
        expect(filteringHelper.getFilter(res)
            .hasOwnProperty("getResourceParams")).toBeTruthy();
        expect(filteringHelper.getFilter(res)
            .hasOwnProperty("removeFilteringConfig")).toBeTruthy();
        expect(filteringHelper.getFilter(res)
            .hasOwnProperty("updateFilter")).toBeTruthy();
        expect(filteringHelper.getFilter(res)
            .hasOwnProperty("removeFilter")).toBeTruthy();

        expect(_.isFunction(filteringHelper.getFilter(res)
            .getFilteringConfig)).toBeTruthy();
        expect(_.isFunction(filteringHelper.getFilter(res)
            .getResourceParams)).toBeTruthy();
        expect(_.isFunction(filteringHelper.getFilter(res)
            .removeFilteringConfig)).toBeTruthy();
        expect(_.isFunction(filteringHelper.getFilter(res)
            .updateFilter)).toBeTruthy();
        expect(_.isFunction(filteringHelper.getFilter(res)
            .removeFilter)).toBeTruthy();
    });
});
