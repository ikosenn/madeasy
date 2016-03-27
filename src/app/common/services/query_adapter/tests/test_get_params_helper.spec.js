"use strict";

describe ("Test the 'get_params' helper service", function () {
    var getParamsHelper, paramsCache;
    var page_count = 30;
    var res = {
        "name": "encounter"
    };

    beforeEach (function () {
        module("madeasy.common.query.paramsCache");
        module("madeasy.common.get.params.helpers");
        module("madeasy.common.adapter.utils");
        module("madeasy.config");

        inject (["madeasy.common.get.params", "madeasy.common.query.paramsCache",
            function (_getParamsHelper, _paramsCache) {
                getParamsHelper = _getParamsHelper;
                paramsCache = _paramsCache;
            }]);
    });

    it ("Should pass if a valid resource is passed to getParams",
        function () {
            var func = function () {
                getParamsHelper.getParams(res);
            };
            expect(func).not.toThrow();
        });

    it ("Should throw error if a non-resource is passed to getParams",
        function () {
            var func = function () {
                getParamsHelper.getParams([]);
            };
            expect(func).toThrow();
        });

    it ("Should default page to that supplied in the paramsCache",
        function () {
            var cache = {
                fields: [],
                filtering: {},
                ordering: [],
                page: 1,
                page_size: page_count
            };
            spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
            expect(getParamsHelper.getParams(res).page)
                .toEqual(paramsCache.getResourceParams(res).page);
        });

    it ("Should default page 1 if page defined in paramsCache is null",
        function () {
            var cache = {
                fields: [],
                filtering: {},
                ordering: [],
                page: null,
                page_size: page_count
            };
            spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
            expect(getParamsHelper.getParams(res).page).toEqual(1);
        });

    it ("Should default page 1 if page defined in paramsCache is undefined",
        function () {
            var cache = {
                fields: [],
                filtering: {},
                ordering: [],
                page: undefined,
                page_size: page_count
            };
            spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
            expect(getParamsHelper.getParams(res).page).toEqual(1);
        });

    it ("Should default page size to that supplied in the paramsCache",
        function () {
            var cache = {
                fields: [],
                filtering: {},
                ordering: [],
                page: 1,
                page_size: 20
            };
            spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
            expect(getParamsHelper.getParams(res).page_size)
                .toEqual(paramsCache.getResourceParams(res).page_size);
        });

    it ("Should default page_size supplied in the config if page_size" +
         " defined in paramsCache is null", function () {
            var cache = {
                fields: [],
                filtering: {},
                ordering: [],
                page: 1,
                page_size: null
            };
            spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
            expect(getParamsHelper.getParams(res).page_size)
                .toEqual(page_count);
        });

    it ("Should default page_size supplied in the config if page_size" +
         " defined in paramsCache is null", function () {
            var cache = {
                fields: [],
                filtering: {},
                ordering: [],
                page: 1,
                page_size: undefined

            };
            spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
            expect(getParamsHelper.getParams(res).page_size)
                .toEqual(page_count);
        });

    it ("Should return ordering items", function () {
        var cache = {
            fields: [],
            filtering: {},
            ordering: ["item1", "item2", "item3"],
            page: 1,
            page_size: 20
        };
        spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
        expect(getParamsHelper.getParams(res).ordering)
            .toEqual("item1,item2,item3");
    });

    it ("Should return empty list of ordering items if none supplied",
        function () {
            var cache = {
                fields: [],
                filtering: {},
                ordering: [],
                page: 1,
                page_size: page_count
            };
            spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
            expect(getParamsHelper.getParams(res).ordering).toEqual(undefined);
        });

    it ("Should return reduced list of ordering items", function () {
        var cache = {
            fields: [],
            filtering: {},
            ordering: [[]],
            page: 1,
            page_size: page_count
        };
        spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
        expect(getParamsHelper.getParams(res).ordering)
            .toEqual([]);
    });

    it ("Should return fields items", function () {
        var cache = {
            fields: ["item1", "item2", "item3"],
            filtering: {},
            ordering: [],
            page: 1,
            page_size: 20
        };
        spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
        expect(getParamsHelper.getParams(res).fields)
            .toEqual("item1,item2,item3");
    });

    it ("Should return empty list of fields items if none supplied",
        function () {
            var cache = {
                fields: [],
                filtering: {},
                ordering: [],
                page: 1,
                page_size: page_count
            };
            spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
            expect(getParamsHelper.getParams(res).fields).toEqual(undefined);
        });

    it ("Should return reduced list of fields items", function () {
        var cache = {
            fields: [[]],
            filtering: {},
            ordering: [],
            page: 1,
            page_size: page_count
        };
        spyOn(paramsCache, "getResourceParams").and.returnValue(cache);
        expect(getParamsHelper.getParams(res).fields)
            .toEqual([]);
    });
});
