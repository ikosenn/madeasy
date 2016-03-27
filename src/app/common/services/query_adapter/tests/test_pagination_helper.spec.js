"use strict";

describe ("Test the pagination helpers service", function () {
    var paginationHelper, metadataCache;
    var res = {
        "name": "encounter"
    };
    var metadata = {
        count: 2002,
        currentPage: 2,
        endIndex: 30,
        filterFields: [],
        next: 3,
        orderingFields: [],
        pageSize: 30,
        previous: null,
        startIndex: 1,
        totalPages: 67
    };

    beforeEach (function () {
        module("madeasy.common.pagination.helpers");
        module("madeasy.resources.common.jsDataUtils");
        module("madeasy.resources.common.deserialize_drf");
        module("madeasy.common.query.paramsCache");
        module("madeasy.common.adapter.utils");

        inject (["madeasy.common.pagination.helper",
            "madeasy.resource.metadataCache",
            function (_paginationHelper, _metadataCache) {
            paginationHelper = _paginationHelper;
            metadataCache = _metadataCache;
        }]);
    });

    it("Should verify valid resource", function () {
        var resource = {
            "name": "encounter"
        };
        var func = function () {
            paginationHelper.getPaginator(resource);
        };
        var func2 = function () {
            paginationHelper.getPageSize(resource);
        };
        expect(func).not.toThrow();
        expect(func2).not.toThrow();
    });

    it("Should throw for an invalid resource supplied", function () {
        var resource = {
            "random": "stuff"
        };
        var func = function () {
            paginationHelper.getPaginator(resource);
        };
        var func2 = function () {
            paginationHelper.getPageSize(resource);
        };
        expect(func).toThrow();
        expect(func2).toThrow();
    });

    it("Should throw if resource is not an obj", function () {
        var resource = "random stuff";
        var func = function () {
            paginationHelper.getPaginator(resource);
        };
        var func2 = function () {
            paginationHelper.getPageSize(resource);
        };
        expect(func).toThrow();
        expect(func2).toThrow();
    });

    it("Should return an object of pre-evaluated keys", function () {
        expect(paginationHelper.getPaginator(res).hasOwnProperty("getPage"))
            .toBeTruthy();
        expect(paginationHelper.getPaginator(res)
            .hasOwnProperty("getFirstPage")).toBeTruthy();
        expect(paginationHelper.getPaginator(res).hasOwnProperty("getLastPage"))
            .toBeTruthy();
        expect(paginationHelper.getPaginator(res)
            .hasOwnProperty("getPreviousPage")).toBeTruthy();
        expect(paginationHelper.getPaginator(res)
            .hasOwnProperty("getNextPage")).toBeTruthy();
        expect(paginationHelper.getPaginator(res)
            .hasOwnProperty("getTotalPages")).toBeTruthy();
        expect(paginationHelper.getPaginator(res)
            .hasOwnProperty("getCurrentPage")).toBeTruthy();
        expect(paginationHelper.getPaginator(res)
            .hasOwnProperty("getTotalItemCount")).toBeTruthy();
        expect(paginationHelper.getPaginator(res)
            .hasOwnProperty("getItemCountPerPage")).toBeTruthy();
        expect(paginationHelper.getPaginator(res)
            .hasOwnProperty("getPageStartIndex")).toBeTruthy();
        expect(paginationHelper.getPaginator(res)
            .hasOwnProperty("getPageEndIndex")).toBeTruthy();

        expect(paginationHelper.getPageSize(res)
            .hasOwnProperty("getPageSizeConfig")).toBeTruthy();
        expect(paginationHelper.getPageSize(res)
            .hasOwnProperty("getResourceParams")).toBeTruthy();
        expect(paginationHelper.getPageSize(res)
            .hasOwnProperty("updatePageSize")).toBeTruthy();
    });

    it("'getPage' should return first page if 'pageNumber' === 0",
        function () {
            var page = 0;
            expect(paginationHelper.getPaginator(res).getPage(page)).toEqual(1);
        });

    it("'getPage' should return first page if 'pageNumber' is NaN",
        function () {
            var page = NaN;
            expect(paginationHelper.getPaginator(res).getPage(page)).toEqual(1);
        });

    it("'getPage' should return first page if 'pageNumber' is undefined",
        function () {
            expect(paginationHelper.getPaginator(res).getPage("")).toEqual(1);
        });

    it("'getPage' should return first page if 'pageNumber' is null",
        function () {
            var page = null;
            expect(paginationHelper.getPaginator(res).getPage(page)).toEqual(1);
        });

    it("'getPage' should return first page if 'pageNumber' is string",
        function () {
            var page = "test";
            expect(paginationHelper.getPaginator(res).getPage(page)).toEqual(1);
        });

    it("'getPage', given a decimal, should truncate it and return the page " +
        "defined by the truncated value", function () {
            var page = 2.5;
            expect(paginationHelper.getPaginator(res).getPage(page)).toEqual(2);
        });

    it("'getPage', given a negative number, should convert it to positive" +
        " ,truncate it and then return the page defined by the truncated " +
        "value", function () {
            var page = -1.5;
            expect(paginationHelper.getPaginator(res).getPage(page)).toEqual(1);
        });

    it("'getPage' should return last page if pageNumber > totalPages",
        function () {
            var pg = 70;
            spyOn(metadataCache, "get").and.returnValue(metadata);
            expect(paginationHelper.getPaginator(res).getPage(pg)).toEqual(67);
        });

    it("'getPage' should return the first page if given an empty string",
        function () {
            var page = "";
            expect(paginationHelper.getPaginator(res).getPage(page)).toEqual(1);
        });

    it("'getFirstPage' should return the first page", function () {
        expect(paginationHelper.getPaginator(res).getFirstPage()).toEqual(1);
    });

    it("'getLastPage' should return the Last page", function () {
        spyOn(metadataCache, "get").and.returnValue(metadata);
        expect(paginationHelper.getPaginator(res).getLastPage()).toEqual(67);
    });

    it("'getPreviousPage' should return the previous page if there is one",
        function () {
            spyOn(metadataCache, "get").and.returnValue(metadata);
            expect(paginationHelper.getPaginator(res)
                    .getPreviousPage()).toEqual(1);
        });

    it("'getPreviousPage' should return page 1 if currentPage === 1",
        function () {
            spyOn(metadataCache, "get").and.returnValue(metadata.currentPage = 1);
            expect(paginationHelper.getPaginator(res)
                .getPreviousPage()).toEqual(1);
        });

    it("'getNextPage' should return the next page if there is one",
        function () {
            spyOn(metadataCache, "get").and.returnValue(metadata);
            expect(paginationHelper.getPaginator(res)
                .getNextPage()).toEqual(2);
        });

    it("'getNextPage' should return the first page if there is no " +
        "page beyond it", function () {
            spyOn(metadataCache, "get")
                .and.returnValue(metadata.currentPage = metadata.totalPages);
            expect(paginationHelper.getPaginator(res)
                .getNextPage()).toEqual(1);
        });

    it("'getTotalPages' should return the total number of pages",
        function () {
            spyOn(metadataCache, "get").and.returnValue(metadata);
            expect(paginationHelper.getPaginator(res).getTotalPages())
                .toEqual(67);
        });

    it("'getCurrentPage' should return the current page", function () {
        spyOn(metadataCache, "get").and.returnValue(metadata);
        expect(paginationHelper.getPaginator(res).getCurrentPage())
            .toEqual(67);
    });

    it("'getTotalItemCount' should return the total number of items for the " +
        "payload", function () {
            spyOn(metadataCache, "get").and.returnValue(metadata);
            expect(paginationHelper.getPaginator(res).getTotalItemCount())
                .toEqual(2002);
        });

    it("'getItemCountPerPage' should return the total number of items per " +
        "page the payload", function () {
            spyOn(metadataCache, "get").and.returnValue(metadata);
            expect(paginationHelper.getPaginator(res).getItemCountPerPage())
                .toEqual(30);
        });

    it("'getPageStartIndex' should return the first index for a specified " +
        "page", function () {
            spyOn(metadataCache, "get").and.returnValue(metadata);
            expect(paginationHelper.getPaginator(res).getPageStartIndex())
                .toEqual(1);
        });

    it("'getPageEndIndex' should return the last index for a specified " +
        "page", function () {
            spyOn(metadataCache, "get").and.returnValue(metadata);
            expect(paginationHelper.getPaginator(res).getPageEndIndex())
                .toEqual(30);
        });
});
