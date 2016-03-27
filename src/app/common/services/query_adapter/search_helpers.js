(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.search.helpers", [])

    .service("madeasy.common.search.helper", [
        "madeasy.common.query.paramsCache", "madeasy.common.adapter.utils",
        function (paramsCache, utils) {
            /**
             * This is essentially a singleton that wraps 'filter' methods and
             * supports a different kind of the filtering query
             */
            var getSearch = function (resource) {
                utils.guaranteeValidResource(resource);
                return {
                    // These four are needed because the _.partial closes over this
                    // scope and updateSearchConfig has references to them
                    getFilteringConfig: paramsCache.getFilteringConfig,
                    getResourceParams: paramsCache.getResourceParams,
                    removeSearch:
                        _.partial(paramsCache.removeSearchConfig, resource),
                    removeSearchConfig: paramsCache.removeSearchConfig,
                    updateFilteringConfig: paramsCache.updateFilteringConfig,
                    // These two methods are the 'public' API that the controller
                    // should use
                    updateSearch:
                        _.partial(paramsCache.updateSearchConfig, resource)
                };
            };

            return {
                getSearch: getSearch
            };
        }
    ]);
})(angular, _);
