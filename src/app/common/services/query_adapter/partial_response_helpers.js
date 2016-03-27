(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.partials.helpers", [])

    .service("madeasy.common.partial.response.service", [
        "madeasy.common.query.paramsCache", "madeasy.common.adapter.utils",
        function (paramsCache, utils) {
            var getPartialResponse = function (resource) {
                utils.guaranteeValidResource(resource);
                return {
                    getPartialResponseConfig: paramsCache.getPartialResponseConfig,
                    getResourceParams: paramsCache.getResourceParams,
                    removePartialsResponse: _.partial(
                        paramsCache.removePartialsResponseConfig, resource),
                    removePartialsResponseConfig:
                        paramsCache.removePartialsResponseConfig,
                    updatePartialResponse: _.partial(
                        paramsCache.updatePartialResponseConfig, resource)
                };
            };

            return {
                getPartialResponse: getPartialResponse
            };
        }
    ]);
})(angular, _);
