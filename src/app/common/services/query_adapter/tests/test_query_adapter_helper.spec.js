"use strict";

describe ("Test the query adapter helpers service", function () {
    var adapterHelpers, scope, adapter, metadataCache, organisation;

    beforeEach (function () {
        module("madeasy.common.queryAdapterHelpers");
        module("madeasy.common.queryAdapter");
        module("madeasy.resources.common.jsDataUtils");
        module("madeasy.resources.common.deserialize_drf");
        module("madeasy.common.adapter.utils");
        module("madeasy.common.pagination.helpers");
        module("madeasy.common.ordering.helpers");
        module("madeasy.common.filtering.helpers");
        module("madeasy.common.search.helpers");
        module("madeasy.common.partials.helpers");
        module("madeasy.common.query.paramsCache");
        module("madeasy.common.get.params.helpers");
        module("madeasy.resources");

        inject (["madeasy.common.queryAdapterHelpers", "$rootScope", "queryAdapter",
            "madeasy.resource.metadataCache", "madeasy.resource.organisation",
            function (_adapterHelpers, $rootScope, _adapter, _metadataCache,
                org) {
                adapterHelpers = _adapterHelpers;
                scope = $rootScope.$new();
                adapter = _adapter;
                metadataCache = _metadataCache;
                organisation = org;
            }]);
    });

    it("'listRetrieveOKHandler' should return a grid params obj", function () {
        // The adapter expects the scope to have a resource set up
        // Every list controller needs to have a 'resource' on its scope
        scope.resource = organisation;
        var gridParams = {
            filter: adapter.handleFiltering(organisation),
            list: {},
            metadata: metadataCache.get(organisation),
            page_size: adapter.handlePagingPageSize(organisation),
            paginator: adapter.handlePaging(organisation),
            partial: adapter.handlePartialResponses(organisation),
            search: adapter.handleSearch(organisation),
            sorter: adapter.handleSorting(organisation)
        };

        var returnedParams = adapterHelpers.listRetrieveOKHandler(scope, {});
        var returnedKeys = _.keys(returnedParams);

        expect(returnedParams.list).toEqual(gridParams.list);
        expect(returnedKeys).toContain("paginator");
        expect(returnedKeys).toContain("sorter");
        expect(returnedKeys).toContain("filter");
        expect(returnedKeys).toContain("search");
        expect(returnedKeys).toContain("metadata");
        expect(returnedKeys).toContain("partial");
        expect(returnedKeys).toContain("page_size");
    });

    it("'listRetrieveErrorHandler' should throw error", function () {
        var func = function() {
            adapterHelpers.listRetrieveErrorHandler(scope, {});
        };
        expect(func).toThrow();
    });
});
