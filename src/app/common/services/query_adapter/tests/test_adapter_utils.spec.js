"use strict";

(function () {
    describe ("Test the adapter utils service", function () {
        var util;
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

        beforeEach (function () {
            module("madeasy.common.adapter.utils");
            module("madeasy.config");

            inject (["madeasy.common.adapter.utils", function (_util) {
                util = _util;
            }]);
        });

        it ("'objectContainsKey' should return true if object contains a key",
            function () {
                var obj = {
                    "name": "Test"
                };
                util.objContainsKey(obj, "name");
                expect(util.objContainsKey(obj, "name")).toEqual(true);
            });

        it ("'objectContainsKey' should return false if object does not " +
            "contain a key", function () {
                util.objContainsKey({}, "name");
                expect(util.objContainsKey({}, "name")).toBeFalsy();
            });

        it ("'getEmptyParamsObj' method should return an object of pre-evaluated" +
            "keys", function () {
                expect(util.getEmptyParamsObj().hasOwnProperty("fields")).
                    toBeTruthy();
                expect(util.getEmptyParamsObj().hasOwnProperty("ordering")).
                    toBeTruthy();
                expect(util.getEmptyParamsObj().hasOwnProperty("page")).
                    toBeTruthy();
                expect(util.getEmptyParamsObj().hasOwnProperty("page_size")).
                    toBeTruthy();
                expect(util.getEmptyParamsObj().hasOwnProperty("filtering")).
                    toBeTruthy();
            });

        it ("'guaranteeListContains' method should throw if evaluated list" +
            " does not contain a value", function () {
                var lst = [1, 2, 3];
                var value = 4;
                var func = function() {
                    util.guaranteeListContains(lst, value);
                };
                expect(func).toThrow();
            });

        it ("'guaranteeListContains' method should not throw if the evaluated " +
            "list contains a value", function () {
                var lst = ["a", "b"];
                var value = "b";
                var func = function() {
                    util.guaranteeListContains(lst, value);
                };
                expect(func).not.toThrow();
            });

        it("'guaranteeValidResource' should not throw for a valid resource " +
            "supplied", function () {
                var resource = {
                    "name": "encounter"
                };
                var func = function () {
                    util.guaranteeValidResource(resource);
                };
                expect(func).not.toThrow();
            });

        it("'guaranteeValidResource' should not throw for a valid resource " +
            "supplied", function () {
                var resource = ["random", "stuff"];
                var func = function () {
                    util.guaranteeValidResource(resource);
                };
                expect(func).toThrow();
            });

        it("'guaranteeValidResource' should not throw for a valid resource " +
            "supplied", function () {
                var func = function () {
                    util.guaranteeValidResource("resource");
                };
                expect(func).toThrow();
            });

        it("'guaranteeValidArray' should not throw for a valid array",
            function () {
                var arr = ["name", "encounter"];
                var func = function () {
                    util.guaranteeValidArray(arr);
                };
                expect(func).not.toThrow();
            });

        it("'guaranteeValidArray' should throw for a invalid array", function () {
            var resource = {
                "name": "encounter"
            };
            var func = function () {
                util.guaranteeValidArray(resource);
            };
            expect(func).toThrow();
        });

        it("'guaranteeValidString' should not throw for a valid string",
            function () {
                var param = "name";
                var func = function () {
                    util.guaranteeValidString(param);
                };
                expect(func).not.toThrow();
            });

        it("'guaranteeValidString' should not throw for an invalid string",
            function () {
                var resource = {};
                var func = function () {
                    util.guaranteeValidString(resource);
                };
                expect(func).toThrow();
            });

        it("'flipOrderParam()' should not throw for valid parameters supplied",
            function() {
                var resource = {
                    "name": "encounter"
                };
                var params = ["test"];

                var func = function() {
                    util.flipOrderParam(resource, params, "test", "sample");
                };
                expect(func).not.toThrow();
            });

        it("'flipOrderParam()' should throw for invalid resource supplied",
            function() {
                var params = ["test"];

                var func = function() {
                    util.flipOrderParam([], params, "test", "sample");
                };
                expect(func).toThrow();
            });

        it("'flipOrderParam()' should throw for invalid array/list supplied",
            function() {
                var resource = {
                    "name": "encounter"
                };

                var func = function() {
                    util.flipOrderParam(resource, "params", "test", "sample");
                };
                expect(func).toThrow();
            });

        it("'flipOrderParam()' should throw for invalid strings supplied",
            function() {
                var resource = {
                    "name": "encounter"
                };

                var func = function() {
                    util.flipOrderParam(resource, [], 1, 2);
                };
                expect(func).toThrow();
            });

        it("'extractMetadata', should return metadata for payload with one",
            function() {
                var metadata = {
                    count: results.data.count,
                    currentPage: results.data.current_page,
                    endIndex: results.data.end_index,
                    filterFields: results.data.filter_fields,
                    next: results.data.next,
                    orderingFields: results.data.ordering_fields,
                    pageSize: results.data.page_size,
                    previous: results.data.previous,
                    startIndex: results.data.start_index,
                    totalPages: results.data.total_pages
                };
                expect(util.extractMetadata(results)).toEqual(metadata);
            });

        it("'extractMetadata', should return empty object for payload " +
            "with no metadata", function() {
                expect(util.extractMetadata({})).toEqual({});
            });

        it("'validateList' should throw if non-array", function() {
            var func = function() {
                util.validateList({});
            };
            expect(func).toThrow();
        });

        it("'guaranteeValidObject' should not throw for a valid object",
            function () {
                var object = {
                    "firstname": "Test",
                    "gender": "Male"
                };
                var func = function () {
                    util.guaranteeValidObject(object);
                };
                expect(func).not.toThrow();
            });

        it("'guaranteeValidObject' should throw for a non object", function () {
            var object = 54;
            var func = function () {
                util.guaranteeValidObject(object);
            };
            expect(func).toThrow();
        });

        it("'guaranteeValidObject' should throw for an invalid object (array)",
            function () {
                var object = [5, 2];
                var func = function () {
                    util.guaranteeValidObject(object);
                };
                expect(func).toThrow();
            });

        it("'guaranteeValidId' should not throw for a number Id",
            function () {
                var id = 5;
                var func = function () {
                    util.guaranteeValidId(id);
                };
                expect(func).not.toThrow();
            });

        it("'guaranteeValidId' should not throw for a string Id",
            function () {
                var id = "c5ef-hrg7-45f3-rt58";
                var func = function () {
                    util.guaranteeValidId(id);
                };
                expect(func).not.toThrow();
            });

        it("'guaranteeValidId' should throw for an invalid Id",
            function () {
                var id = [54];
                var func = function () {
                    util.guaranteeValidId(id);
                };
                expect(func).toThrow();
            });

        it("'guaranteeValidArray' should not throw for a valid array",
            function () {
                var arr = ["name", "encounter"];
                var func = function () {
                    util.guaranteeValidArray(arr);
                };
                expect(func).not.toThrow();
            });

        it("'guaranteeValidArray' should throw for a invalid array", function () {
            var resource = {
                "name": "encounter"
            };
            var func = function () {
                util.guaranteeValidArray(resource);
            };
            expect(func).toThrow();
        });

        it("'guaranteeValidString' should not throw for a valid string",
            function () {
                var param = "name";
                var func = function () {
                    util.guaranteeValidString(param);
                };
                expect(func).not.toThrow();
            });

        it("'guaranteeValidString' should not throw for an invalid string",
            function () {
                var resource = {};
                var func = function () {
                    util.guaranteeValidString(resource);
                };
                expect(func).toThrow();
            });

        it("'validateList' should throw if null parameter", function() {
            var item = null;
            var func = function() {
                util.validateList(item);
            };
            expect(func).toThrow();
        });

        it("'validateList' should throw if undefined param", function() {
            var func = function() {
                util.validateList("");
            };
            expect(func).toThrow();
        });

        it("'validateList' should throw if array", function() {
            var item = [
                {
                    "label": "View",
                    "state": "patient"
                }
            ];
            var func = function() {
                util.validateList(item);
            };
            expect(func).not.toThrow();
        });

        it("'validateList' should throw if array longer than 2", function() {
            var item = [
                {
                    "label": "View",
                    "state": "patient"
                },
                {
                    "label": "Return",
                    "state": "visits"
                },
                {
                    "label": "Register",
                    "state": "scheduling"
                }
            ];
            var func = function() {
                util.validateList(item);
            };
            expect(func).toThrow();
        });

        it("'flipParam' should flip string by adding '-' at the beginning",
            function() {
                var param = "patient_name";
                expect(util.flipParam(param)).toEqual("-patient_name");
            });

        it("'flipParam' should flip string by removing '-' at the beginning",
            function() {
                var param = "-patient_name";
                expect(util.flipParam(param)).toEqual("patient_name");
            });

        it("'convertStringToProperCase' should return list of Proper Case string " +
            "items", function () {
                var list = [
                    {
                        "name": "test_data",
                        "type": "string"
                    },{
                        "name": "another_even_longer_string",
                        "type": "string"
                    }
                ];
                var expected = {
                    "dataTypeList": ["string", "string"],
                    "returnedFilterCriteria":
                        ["Test Data", "Another Even Longer String"]
                };
                expect(util.convertStringToProperCase(list)).toEqual(expected);
            });

        it("'convertStringToProperCase' should return an empty list if the " +
            "filterParamsList is undefined", function () {
                expect(util.convertStringToProperCase(undefined)).toEqual([]);
            });

        it("'convertStringToProperCase' should return list as-is if the " +
            "filterParamsList contains simple strings", function () {
                var list = ["test_data", "another_even_longer_string"];
                var expected = {
                    "dataTypeList": [],
                    "returnedFilterCriteria":
                        ["Test Data", "Another Even Longer String"]
                };
                expect(util.convertStringToProperCase(list)).toEqual(expected);
            });
    });
})();
