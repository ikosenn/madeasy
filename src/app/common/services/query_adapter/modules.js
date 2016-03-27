(function (angular) {
    "use strict";

    angular.module("madeasy.common.services.query_adapter", [
        "madeasy.common.adapter.utils",
        "madeasy.common.get.params.helpers",
        "madeasy.common.pagination.helpers",
        "madeasy.common.ordering.helpers",
        "madeasy.common.filtering.helpers",
        "madeasy.common.search.helpers",
        "madeasy.common.partials.helpers",
        "madeasy.common.queryAdapterHelpers",
        "madeasy.common.queryAdapter",
        "madeasy.common.query.paramsCache",
        "madeasy.common.adapter.fetch_data"
    ]);
})(angular);
