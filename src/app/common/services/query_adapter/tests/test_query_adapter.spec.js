"use strict";

describe ("Test madeasy.common.queryAdapter", function () {
    var queryAdapter, filteringHelper, orderingHelper,
        paginationHelper, searchHelper, partialResponse;

    var resource = {
        "name": "encounter"
    };

    var data = {
        "firstname": "Test",
        "gender": "Male"
    };

    beforeEach (function () {
        module ("madeasy.common.queryAdapter");
        module ("madeasy.common.get.params.helpers");
        module ("madeasy.common.filtering.helpers");
        module ("madeasy.common.ordering.helpers");
        module ("madeasy.common.pagination.helpers");
        module ("madeasy.common.search.helpers");
        module ("madeasy.common.partials.helpers");
        module ("madeasy.common.query.paramsCache");
        module("madeasy.resources.common.jsDataUtils");
        module("madeasy.resources.common.deserialize_drf");
        module ("madeasy.common.adapter.utils");

        inject (["queryAdapter", "madeasy.common.filtering.helper",
            "madeasy.common.ordering.helper", "madeasy.common.pagination.helper",
            "madeasy.common.search.helper",
            "madeasy.common.partial.response.service",
            function (_queryAdapter, _filteringHelper, _orderingHelper,
                _paginationHelper, _searchHelper, _partialResponse) {
                queryAdapter = _queryAdapter;
                filteringHelper = _filteringHelper;
                orderingHelper = _orderingHelper;
                paginationHelper = _paginationHelper;
                searchHelper = _searchHelper;
                partialResponse = _partialResponse;
            }]);
    });

    it("'handleFiltering()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleFiltering(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handleFiltering()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleFiltering([]);
            };
            expect(func).toThrow();
        });

    it("'handleSorting()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleSorting(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handleSorting()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleSorting([]);
            };
            expect(func).toThrow();
        });

    it("'handlePaging()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePaging(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handlePaging()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePaging([]);
            };
            expect(func).toThrow();
        });

    it("'handlePagingPageSize()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePagingPageSize(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handlePagingPageSize()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePagingPageSize([]);
            };
            expect(func).toThrow();
        });

    it("'handleSearch()' should not throw if valid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleSearch(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handleSearch()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handleSearch([]);
            };
            expect(func).toThrow();
        });

    it("'handlePartialResponses()' should not throw if valid resource " +
        "supplied", function () {
            var func = function () {
                queryAdapter.handlePartialResponses(resource);
            };
            expect(func).not.toThrow();
        });

    it("'handlePartialResponses()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.handlePartialResponses([]);
            };
            expect(func).toThrow();
        });

    it("'getData()' should throw if invalid resource supplied",
        function () {
            var func = function () {
                queryAdapter.getData([]);
            };
            expect(func).toThrow();
        });

    it("'getData()' should not throw if valid resource supplied", function () {
        var func = function () {
            queryAdapter.getData(resource);
        };
        expect(func).toThrow();
    });

    it("'createData() is not a function' should be thrown given valid arguments",
        function () {
            var func = function () {
                queryAdapter.createData(resource, data);
            };
            expect(func).toThrow(new Error("resource.create is not a function"));
        });

    it("'createData()' should throw given invalid arguments", function () {
        var func = function () {
            queryAdapter.createData(resource, ["firstname", "gender"]);
        };
        expect(func).toThrow();
    });

    it("'updateData() is not a function' should be thrown given valid arguments",
        function () {
            var func = function () {
                queryAdapter.updateData(resource, 54, data, "PUT");
            };
            expect(func).toThrow(new Error("resource.update is not a function"));
        });

    it("'updateData()' should throw given invalid arguments", function () {
        var func = function () {
            queryAdapter.updateData(resource, 54, ["firstname", "gender"], 8);
        };
        expect(func).toThrow();
    });

    it("'deleteData() is not a function' should be thrown given valid arguments",
        function () {
            var func = function () {
                queryAdapter.deleteData(resource, 54);
            };
            expect(func).toThrow(new Error("resource.destroy is not a function"));
        });

    it("'deleteData()' should throw given invalid arguments", function () {
        var func = function () {
            queryAdapter.deleteData(resource, [54]);
        };
        expect(func).toThrow();
    });
});
