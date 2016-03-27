(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.adapter.fetch_data", [])

    .service("madeasy.common.adapter.fetchDataService", [
        "queryAdapter", "madeasy.common.queryAdapterHelpers",
        "madeasy.common.query.paramsCache",
        function (adapter, helpers, paramsCache) {
            this.getData = function (scope, resource, params) {
                params = params || "";
                if (!_.isEmpty(params) && !_.isNull(params)) {
                    paramsCache.updatePartialResponseConfig(resource, params);
                }
                adapter.getData(resource).then(
                    _.partial(helpers.listRetrieveOKHandler, scope),
                    _.partial(helpers.listRetrieveErrorHandler, scope)
                );
            };
        }
    ]);
})(angular, _);
