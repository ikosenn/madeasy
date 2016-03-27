"use strict";

describe("Unit Test madeasy.resources.common.jsDataUtils:deserialize", function () {
    var resource = {
        "name": "encounter"
    };

    beforeEach(function () {
        module("madeasy.common.services.query_adapter");
        module("madeasy.resources.common");
    });

    it("should parse drf data and return the results array", function () {
        inject(["madeasy.resource.deserializeDRF", function (deserialize) {
            var results = {
                data: {
                    count: 7,
                    next: null,
                    previous: null,
                    results: [
                        {code: "female", display: "Female", id: 1},
                        {code: "male", display: "male", id: 2}
                    ]
                }
            };
            var res = deserialize.deserializeFunc(resource, results);
            var expected = [
                {code: "female", display: "Female", id: 1},
                {code: "male", display: "male", id: 2}
            ];
            expect(res).toEqual(expected);
        }]);
    });

    it("should throw if data object is not found", function () {
        inject(["madeasy.resource.deserializeDRF", function (deserialize) {
            var results = {
                data: {}
            };
            var res = function() {
                deserialize.deserializeFunc(resource, results);
            };
            expect(res).toThrow();
        }]);
    });

    it("should not call ``metadataCache on a delete", function () {
        inject(["madeasy.resource.deserializeDRF", "madeasy.resource.metadataCache",
            function (deserialize, cache) {
                var results = {
                    data: {},
                    status: 204
                };
                var func = cache.get(resource);

                deserialize.deserializeFunc(resource, results);
                expect(func).toEqual({});
            }]);
    });
    it("should call ``metadataCache on other status codes", function () {
        inject(["madeasy.resource.deserializeDRF", "madeasy.resource.metadataCache",
            function (deserialize, cache) {
                spyOn(cache, "add");
                var results = {
                    data: {},
                    status: 400
                };
                deserialize.deserializeFunc(resource, results);
                expect(cache.add).toHaveBeenCalled();
            }]);
    });

    it("should return the whole object if count and previous are missing",
        function () {
            inject(["madeasy.resource.deserializeDRF",
                function (deserialize) {
                    var data = {
                        "data": {
                            code: "female",
                            display: "Female",
                            id: 1
                        }
                    };

                    var res = deserialize.deserializeFunc(resource, data);

                    expect(res).toEqual(data.data);
                }]);
        });
});

describe("Test the metadataCache service", function () {
    var metadataCache, util;
    var resource = {
        "name": "encounter"
    };
    var resourceName = "person";

    var results = {
        "data": {
            "count": 1,
            "current_page": 1,
            "end_index": 1,
            "filter_fields": ["code", "display", "definition"],
            "next": null,
            "ordering_fields": ["code", "display"],
            "page_size": 30,
            "previous": null,
            "results": [
                {
                    "active": true,
                    "code": "CASH",
                    "definition": null,
                    "deleted": false,
                    "display": "Cash",
                    "id": "41f72c54-c390-4c78-99d3-6c74aa52c2b7"
                }
            ],
            "start_index": 1,
            "total_pages": 1
        }
    };

    beforeEach(function () {
        module("madeasy.resources.common.jsDataUtils");
        module("madeasy.resources.common.deserialize_drf");
        module("madeasy.common.services.query_adapter");

        inject(["madeasy.resource.metadataCache", "madeasy.common.adapter.utils",
            function (_metadataCache, _util) {
            metadataCache = _metadataCache;
            util = _util;
        }]);
    });

    it("'add()' should not throw if supplied resource has 'name' property",
        function() {
            var func = function() {
                metadataCache.add(resource, results);
            };
            expect(func).not.toThrow();
        });

    it("'add()' should throw if supplied resource has no 'name' property",
        function() {
            var func = function() {
                metadataCache.add({}, results);
            };
            expect(func).toThrow();
        });

    it("'add()' should not throw if supplied results have 'results' property",
        function() {
            var func = function() {
                metadataCache.add(resource, results);
            };
            expect(func).not.toThrow();
        });

    it("'add()' should not throw if supplied results have no 'id' property",
        function() {
            var results = {
                "data": {
                    "active": true,
                    "code": "EFT",
                    "definition": null,
                    "deleted": false,
                    "display": "Electronic Funds Transfer",
                    "id": "9b1f3871-ba12-4de3-af02-535b4ea67745"
                }
            };
            var func = function() {
                metadataCache.add(resource, results);
            };
            expect(func).not.toThrow();
        });

    it("'add()' should throw if supplied results have no 'results' or 'id'" +
        " property", function() {
            var func = function() {
                metadataCache.add(resource, {});
            };
            expect(func).toThrow();
        });

    it("'get()' should return metadata if cache contains resource itself",
        function() {
            var meta = {
                count: 5,
                currentPage: 1,
                endIndex: 30,
                filterFields: [],
                next: null,
                orderingFields: [],
                pageSize: 30,
                previous: null,
                startIndex: 1,
                totalPages: 1
            };
            var cache = {};
            cache[resource.name] = meta;

            spyOn(util, "objContainsKey").and.returnValue(meta);
            var metadata = metadataCache.get(resource);

            metadata = util.objContainsKey(cache, resource.name);
            expect(metadata).toEqual(util.objContainsKey(cache, resource.name));
        });

    it("should 'get()' metadata if cache contains the resource name",
    function () {
        var meta = {
            count: 5,
            currentPage: 1,
            endIndex: 30,
            filterFields: [],
            next: null,
            orderingFields: [],
            pageSize: 30,
            previous: null,
            startIndex: 1,
            totalPages: 1
        };
        var cache = {};
        cache[resourceName] = meta;

        spyOn(metadataCache, "get").and.returnValue(meta);
        var metadata = metadataCache.get(resourceName);
        var args = metadataCache.get.calls.argsFor(0)[0];
        expect(metadata).toEqual(meta);
        expect(args).toEqual(resourceName);
    });
});
