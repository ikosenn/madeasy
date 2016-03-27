"use strict";

describe("In testing the query_params_cache, ", function () {
    var paramsCache, utils, organisation;
    var resource = {
        "name": "encounter"
    };
    var resourceParams = {
        fields : ["patient_id", "first_name", "last_name", "age"],
        filtering : {"first_name": "Isaac", "last_name": "Irungu"},
        ordering : ["first_name", "-last_name"],
        page : 3,
        page_size : 50
    };

    beforeEach(function () {
        module("madeasy.common.query.paramsCache");
        module("madeasy.common.adapter.utils");
        module("madeasy.resources");

        inject(["madeasy.common.query.paramsCache", "madeasy.common.adapter.utils",
            "madeasy.resource.organisation",
            function (_paramsCache, _util, _orgResource) {
            paramsCache = _paramsCache;
            utils = _util;
            organisation = _orgResource;
        }]);
    });

    it("'_params_cache' should be initialized to an empty object",
        function () {
            paramsCache._params_cache = {
                fields : [],
                filtering : {},
                ordering : [],
                page : 1,
                page_size : 30
            };
            expect(paramsCache._params_cache)
                .toEqual(utils.getEmptyParamsObj());
        });

    it("'get()' should return the initialized '_params_cache'", function () {
        paramsCache._params_cache = {
                fields : [],
                filtering : {},
                ordering : [],
                page : 1,
                page_size : 30
            };
        expect(paramsCache.get()).toEqual(paramsCache._params_cache);
    });

    it("'update()' should not throw for valid parameters supplied",
        function () {
            var func = function () {
                paramsCache.update(resource, resourceParams);
            };
            expect(func).not.toThrow();
        });

    it("'update()' should throw for invalid parameters supplied",
        function () {
            var func = function () {
                paramsCache.update([], resourceParams);
            };
            expect(func).toThrow();
        });

    it("'update()' should throw for invalid parameters supplied",
        function () {
            var func = function () {
                paramsCache.update({}, resourceParams);
            };
            expect(func).toThrow();
        });

    it("'getResourceParams()' should not throw for valid parameters supplied",
        function () {
            var func = function () {
                paramsCache.getResourceParams(resource);
            };
            expect(func).not.toThrow();
        });

    it("'getResourceParams()' should not throw for valid parameters supplied",
        function () {
            var func = function () {
                paramsCache.getResourceParams([]);
            };
            expect(func).toThrow();
        });

    it("'getResourceParams()' should not throw for valid parameters supplied",
        function () {
            var func = function () {
                paramsCache.getResourceParams({});
            };
            expect(func).toThrow();
        });

    it("'getResourceParams()' should return an initialized params cache for" +
        " a resource", function () {
            var dummyResource = {
                name: "Does not really exist, just for testing"
            };
            expect(paramsCache.getResourceParams(dummyResource))
                .toEqual(utils.getEmptyParamsObj());
        });

    it("'getOrderingConfig()' should not throw for valid parameters supplied",
        function () {
            var func = function () {
                paramsCache.getOrderingConfig(resource);
            };
            expect(func).not.toThrow();
        });

    it("'getOrderingConfig()' should not throw for valid parameters supplied",
        function () {
            var func = function () {
                paramsCache.getOrderingConfig([]);
            };
            expect(func).toThrow();
        });

    it("'getOrderingConfig()' should not throw for valid parameters supplied",
        function () {
            var func = function () {
                paramsCache.getOrderingConfig({});
            };
            expect(func).toThrow();
        });

    it("'getOrderingConfig()' should return the ordering list", function() {
        var params = _.extend(paramsCache.getResourceParams(resource),
                resourceParams);
        expect(paramsCache.getOrderingConfig(resource))
            .toEqual(params.ordering);
    });

    it("'updateOrderingConfig()' should return new list", function() {
        var par = paramsCache.updateOrderingConfig(resource, "last_name");
        expect(par).toContain("last_name");
        expect(par.length).toEqual(1);
    });

    it("'updateOrderingConfig()' should return list unchanged", function() {
        // Repeated additions of the same ordering param to be ignored
        paramsCache.updateOrderingConfig(resource, "first_name");
        paramsCache.updateOrderingConfig(resource, "first_name");
        paramsCache.updateOrderingConfig(resource, "last_name");
        var par = paramsCache.updateOrderingConfig(resource, "last_name");

        // Deep equality of arrays is not standard in JS
        expect(par).toContain("first_name");
        expect(par).toContain("last_name");
        expect(par.length).toEqual(2);
    });

    it("'updateOrderingConfig()' should 'flip' DESC-ASC", function() {
        // Repeated additions of the same ordering param to be ignored
        paramsCache.updateOrderingConfig(resource, "first_name");
        paramsCache.updateOrderingConfig(resource, "-last_name");
        var par = paramsCache.updateOrderingConfig(resource, "last_name");

        // Deep equality of arrays is not standard in JS
        expect(par).toContain("first_name");
        expect(par).toContain("last_name");
        expect(par.length).toEqual(2);
    });

    it("'updateOrderingConfig()' should 'flip' ASC-DESC", function() {
        // Repeated additions of the same ordering param to be ignored
        paramsCache.updateOrderingConfig(resource, "first_name");
        paramsCache.updateOrderingConfig(resource, "last_name");
        var par = paramsCache.updateOrderingConfig(resource, "-last_name");

        // Deep equality of arrays is not standard in JS
        expect(par).toContain("first_name");
        expect(par).toContain("-last_name");
        expect(par.length).toEqual(2);
    });

    it("'updateOrderingConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var orderingParam = "-last_name";
            var func = function () {
                paramsCache.updateOrderingConfig(resource, orderingParam);
            };
            expect(func).not.toThrow();
        });

    it("'updateOrderingConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var orderingParam = "-last_name";
            var func = function () {
                paramsCache.updateOrderingConfig([], orderingParam);
            };
            expect(func).toThrow();
        });

    it("'updateOrderingConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var orderingParam = "-last_name";
            var func = function () {
                paramsCache.updateOrderingConfig({}, orderingParam);
            };
            expect(func).toThrow();
        });

    it("'removeOrderingConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var orderingParam = "test";
            var func = function () {
                paramsCache.removeOrderingConfig(resource, orderingParam);
            };
            expect(func).not.toThrow();
        });

    it("'removeOrderingConfig()' should throw for invalid parameters supplied",
        function () {
            var func = function () {
                paramsCache.removeOrderingConfig([], "test");
            };
            expect(func).toThrow();
        });

    it("'removeOrderingConfig()' should throw for invalid parameters supplied",
        function () {
            var func = function () {
                paramsCache.removeOrderingConfig({}, "test");
            };
            expect(func).toThrow();
        });

    it("'getFilteringConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var func = function () {
                paramsCache.getFilteringConfig(resource);
            };
            expect(func).not.toThrow();
        });

    it("'getFilteringConfig()' should throw for invalid parameters supplied",
        function () {
            var func = function () {
                paramsCache.getFilteringConfig([]);
            };
            expect(func).toThrow();
        });

    it("'getFilteringConfig()' should throw for invalid parameters supplied",
        function () {
            var func = function () {
                paramsCache.getFilteringConfig({});
            };
            expect(func).toThrow();
        });

    it("'updateFilteringConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var key = "first_name";
            var value = "Irungu";
            var func = function () {
                paramsCache.updateFilteringConfig(resource, key, value);
            };
            expect(func).not.toThrow();
        });

    it("'updateFilteringConfig()' should throw for invalid parameters supplied",
        function () {
            var key = "first_name";
            var value = "Irungu";
            var func = function () {
                paramsCache.updateFilteringConfig([], key, value);
            };
            expect(func).toThrow();
        });

    it("'updateFilteringConfig()' should throw for invalid parameters supplied",
        function () {
            var key = "first_name";
            var value = "Irungu";
            var func = function () {
                paramsCache.updateFilteringConfig({}, key, value);
            };
            expect(func).toThrow();
        });

    it("'removeFilteringConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var key = "first_name";
            var func = function () {
                paramsCache.removeFilteringConfig(resource, key);
            };
            expect(func).not.toThrow();
        });

    it("'removeFilteringConfig()' should throw for invalid parameters supplied",
        function () {
            var key = "first_name";
            var func = function () {
                paramsCache.removeFilteringConfig([], key);
            };
            expect(func).toThrow();
        });

    it("'removeFilteringConfig()' should throw for invalid parameters supplied",
        function () {
            var key = "first_name";
            var func = function () {
                paramsCache.removeFilteringConfig({}, key);
            };
            expect(func).toThrow();
        });

    it("'updateSearchConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var searchParam = "Irungu";
            var func = function () {
                paramsCache.updateSearchConfig(resource, searchParam);
            };
            expect(func).not.toThrow();
        });

    it("'updateSearchConfig()' should throw for invalid parameters supplied",
        function () {
            var searchParam = "Irungu";
            var func = function () {
                paramsCache.updateSearchConfig([], searchParam);
            };
            expect(func).toThrow();
        });

    it("'updateSearchConfig()' should throw for invalid parameters supplied",
        function () {
            var searchParam = "Irungu";
            var func = function () {
                paramsCache.updateSearchConfig({}, searchParam);
            };
            expect(func).toThrow();
        });

    it("'removeSearchConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var func = function () {
                paramsCache.removeSearchConfig(resource);
            };
            expect(func).not.toThrow();
        });

    it("'removeSearchConfig()' should throw for invalid parameters supplied",
        function () {
            var func = function () {
                paramsCache.removeSearchConfig([]);
            };
            expect(func).toThrow();
        });

    it("'removeSearchConfig()' should throw for invalid parameters supplied",
        function () {
            var func = function () {
                paramsCache.removeSearchConfig({});
            };
            expect(func).toThrow();
        });

    it("'getPartialResponseConfig()' should not throw for valid parameters " +
        "supplied", function () {
            var func = function () {
                paramsCache.getPartialResponseConfig(resource);
            };
            expect(func).not.toThrow();
        });

    it("'getPartialResponseConfig()' should throw for invalid parameters " +
        "supplied", function () {
            var func = function () {
                paramsCache.getPartialResponseConfig([]);
            };
            expect(func).toThrow();
        });

    it("'getPartialResponseConfig()' should throw for invalid parameters " +
        "supplied", function () {
            var func = function () {
                paramsCache.getPartialResponseConfig({});
            };
            expect(func).toThrow();
        });

    it("'updatePartialResponseConfig()' should not throw for valid parameter" +
        "supplied", function () {
            var partial = "first_name";
            var func = function () {
                paramsCache.updatePartialResponseConfig(resource, partial);
            };
            expect(func).not.toThrow();
        });

    it("'updatePartialResponseConfig()' should accept a comma separated " +
        "string as a parameter for ``partialsParam``", function () {
            var partial = "first_name,last_name";
            var func = function () {
                paramsCache.updatePartialResponseConfig(resource, partial);
            };
            expect(func).not.toThrow();
            var res = paramsCache.updatePartialResponseConfig(resource, partial);
            expect(res).toContain("first_name");
            expect(res).toContain("last_name");

        });

    it("'updatePartialResponseConfig()' should throw for invalid parameters " +
        "supplied", function () {
            var partial = "first_name";
            var func = function () {
                paramsCache.updatePartialResponseConfig([], partial);
            };
            expect(func).toThrow();
        });

    it("'updatePartialResponseConfig()' should throw for invalid parameters " +
        "supplied", function () {
            var partial = "first_name";
            var func = function () {
                paramsCache.updatePartialResponseConfig({}, partial);
            };
            expect(func).toThrow();
        });

    it("'updatePartialResponseConfig' should return a new partials list",
        function () {
            _.extend(paramsCache.getResourceParams(resource), resourceParams);
            paramsCache._params_cache = {};
            paramsCache._params_cache[resource.name] = resourceParams;
            paramsCache.updatePartialResponseConfig(resource, "test");
            expect(paramsCache.updatePartialResponseConfig(resource, "test"))
                .toEqual(["patient_id",
                    "first_name", "last_name", "age", "test"]);
        });

    it("'updateFilteringConfig' should return a new filtering object",
        function () {
            expect(paramsCache.updateFilteringConfig(resource, "age", "25"))
                .toEqual({"age": "25"});
        });

    it("'updateFilteringConfig' should ignore existing filter params",
        function () {
            paramsCache.updateFilteringConfig(resource, "age", "25");
            paramsCache.updateFilteringConfig(resource, "age", "25");
            expect(paramsCache.updateFilteringConfig(resource, "age", "25"))
                .toEqual({"age": "25"});
        });

    it("'updateFilteringConfig' should ignore if the filter key is truthy " +
        "and the filter value unkown", function () {
            var filterParams = {"age": "25"};
            paramsCache.getResourceParams(organisation);
            spyOn(paramsCache, "getFilteringConfig").and.returnValue(filterParams);
            paramsCache.updateFilteringConfig(organisation);
            paramsCache.updateFilteringConfig(organisation, "age");
            expect(paramsCache.updateFilteringConfig(organisation, "age"))
                .toEqual(filterParams);
        });

    it("'removePartialsResponseConfig()' should not throw for valid " +
        "parameter supplied", function () {
            var partial = "first_name";
            var func = function () {
                paramsCache.removePartialsResponseConfig(resource, partial);
            };
            expect(func).not.toThrow();
        });

    it("'removePartialsResponseConfig()' should throw for invalid " +
        "parameters supplied", function () {
            var partial = "first_name";
            var func = function () {
                paramsCache.removePartialsResponseConfig([], partial);
            };
            expect(func).toThrow();
        });

    it("'removePartialsResponseConfig()' should throw for invalid " +
        "parameters supplied", function () {
            var partial = "first_name";
            var func = function () {
                paramsCache.removePartialsResponseConfig({}, partial);
            };
            expect(func).toThrow();
        });

    it("'updatePageSizeConfig()' should not throw for valid parameter " +
        "supplied", function () {
            _.extend(paramsCache.getResourceParams(resource), resourceParams);
            paramsCache._params_cache = {};
            paramsCache._params_cache[resource.name] = resourceParams;
            expect(paramsCache.updatePageSizeConfig(resource, 4)).toEqual(4);
        });

    it("'updatePageSizeConfig()' should throw for invalid parameters " +
        "supplied", function () {
            var pageSizeParam = 4;
            var func = function () {
                paramsCache.updatePageSizeConfig([], pageSizeParam);
            };
            expect(func).toThrow();
        });

    it("'updatePageSizeConfig()' should throw for invalid parameters " +
        "supplied", function () {
            var pageSizeParam = 4;
            var func = function () {
                paramsCache.updatePageSizeConfig({}, pageSizeParam);
            };
            expect(func).toThrow();
        });

    it("'getPageSizeConfig()' should not throw for valid parameter " +
        "supplied", function () {
            var func = function () {
                paramsCache.getPageSizeConfig(resource);
            };
            expect(func).not.toThrow();
        });

    it("'getPageSizeConfig()' should throw for invalid parameters " +
        "supplied", function () {
            var func = function () {
                paramsCache.getPageSizeConfig([]);
            };
            expect(func).toThrow();
        });

    it("'getPageSizeConfig()' should throw for invalid parameters " +
        "supplied", function () {
            var func = function () {
                paramsCache.getPageSizeConfig({});
            };
            expect(func).toThrow();
        });
});
