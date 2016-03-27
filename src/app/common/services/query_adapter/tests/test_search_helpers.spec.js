"use strict";

describe ("Test the search_helpers service", function () {
    var searchHelper;

    beforeEach (function () {
        module("madeasy.common.search.helpers");
        module("madeasy.common.query.paramsCache");
        module("madeasy.common.adapter.utils");
        module("madeasy.config");

        inject (["madeasy.common.search.helper", function (_searchHelper) {
            searchHelper = _searchHelper;
        }]);
    });

    it ("Should verify valid resource", function () {
        var resource = {
            "name": "encounter"
        };
        var func = function () {
            searchHelper.getSearch(resource);
        };
        expect(func).not.toThrow();
    });

    it("Should throw for an invalid resource supplied", function () {
        var resource = {
            "random": "stuff"
        };
        var func = function () {
            searchHelper.getSearch(resource);
        };
        expect(func).toThrow();
    });

    it("Should throw if resource is not an obj", function () {
        var resource = "random stuff";
        var func = function () {
            searchHelper.getSearch(resource);
        };
        expect(func).toThrow();
    });

    it ("Should return an object of pre-evaluated keys", function () {
        var resource = {
            "name": "encounter"
        };
        expect(searchHelper.getSearch(resource)
            .hasOwnProperty("getFilteringConfig")).toBeTruthy();
        expect(searchHelper.getSearch(resource)
            .hasOwnProperty("updateFilteringConfig")).toBeTruthy();
        expect(searchHelper.getSearch(resource)
            .hasOwnProperty("getResourceParams")).toBeTruthy();
        expect(searchHelper.getSearch(resource)
            .hasOwnProperty("removeSearchConfig")).toBeTruthy();
        expect(searchHelper.getSearch(resource)
            .hasOwnProperty("updateSearch")).toBeTruthy();
        expect(searchHelper.getSearch(resource)
            .hasOwnProperty("removeSearch")).toBeTruthy();

        expect(_.isFunction(searchHelper.getSearch(resource)
            .getFilteringConfig)).toBeTruthy();
        expect(_.isFunction(searchHelper.getSearch(resource)
            .updateFilteringConfig)).toBeTruthy();
        expect(_.isFunction(searchHelper.getSearch(resource)
            .getResourceParams)).toBeTruthy();
        expect(_.isFunction(searchHelper.getSearch(resource)
            .removeSearchConfig)).toBeTruthy();
        expect(_.isFunction(searchHelper.getSearch(resource)
            .updateSearch)).toBeTruthy();
        expect(_.isFunction(searchHelper.getSearch(resource)
            .removeSearch)).toBeTruthy();
    });
});
