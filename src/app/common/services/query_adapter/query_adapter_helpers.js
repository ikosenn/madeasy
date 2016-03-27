(function (angular) {
    "use strict";

    angular.module("madeasy.common.queryAdapterHelpers", [])

    .service("madeasy.common.queryAdapterHelpers",
        ["queryAdapter", "madeasy.resource.metadataCache",
        function (adapter, metadataCache) {
        var listRetrieveOKHandler = function (scope, data) {
            scope.list = data;
            scope.paginator = adapter.handlePaging(scope.resource);
            scope.sorter = adapter.handleSorting(scope.resource);
            scope.filter = adapter.handleFiltering(scope.resource);
            scope.search = adapter.handleSearch(scope.resource);
            scope.metadata = metadataCache.get(scope.resource);
            scope.partial = adapter.handlePartialResponses(scope.resource);
            scope.page_size = adapter.handlePagingPageSize(scope.resource);

            var gridParams = {
                filter: scope.filter,
                list: scope.list,
                metadata: scope.metadata,
                page_size: scope.page_size,
                paginator: scope.paginator,
                partial: scope.partial,
                search: scope.search,
                sorter: scope.sorter
            };
            return gridParams;
        };

        var listRetrieveErrorHandler = function (scope, err) {
            // TODO Make real implementation
            throw new Error(err, scope);
        };

        return {
            listRetrieveErrorHandler: listRetrieveErrorHandler,
            listRetrieveOKHandler: listRetrieveOKHandler
        };
    }]);
})(angular);
