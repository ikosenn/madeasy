(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.ordering.helpers", [])

    .service("madeasy.common.ordering.helper", [
        "madeasy.common.query.paramsCache", "madeasy.common.adapter.utils",
        function (paramsCache, utils) {
            var getSorter = function (resource) {
                utils.guaranteeValidResource(resource);
                return {
                    /**
                     * This singleton takes a ordering params object and the
                     * resource from the calling component's controller.
                     * The resource is partial'd in the query params cache.
                     *
                     * This is returned with the ordered data and added to the URL.
                     * Note that the returned payload will be ordered by the first
                     * parameter. As ordering priority is provided and processed in
                     * that manner
                     */

                    // GetOrderingConfig and getResourceParams are not
                    // pre-evaluated or _.partial'd intentionally. All their
                    // callers will supply a 'resource' param. They are here only
                    // because _.partial will close on this object as its 'this'
                    // context
                    getOrdering: _.partial(
                        paramsCache.getOrderingConfig, resource),
                    getOrderingConfig: paramsCache.getOrderingConfig,
                    getResourceParams: paramsCache.getResourceParams,
                    removeOrdering: _.partial(
                        paramsCache.removeOrderingConfig, resource),
                    removeOrderingConfig: paramsCache.removeOrderingConfig,
                    updateOrdering: _.partial(
                        paramsCache.updateOrderingConfig, resource)
                };
            };

            return {
                getSorter: getSorter
            };
        }
    ]);
})(angular, _);
