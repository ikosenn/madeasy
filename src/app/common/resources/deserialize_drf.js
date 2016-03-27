(function (angular) {
    "use strict";

    angular.module("madeasy.resources.common.deserialize_drf",[
        "madeasy.config",
        "madeasy.resources.common.jsDataUtils",
        "madeasy.resources.common.deserialize_drf"
    ])

    .factory("madeasy.resource.deserializeDRF", ["madeasy.resource.metadataCache",
        function (metadataCache) {
            return {
                deserializeFunc : function(resource, results) {
                    // Dont cache data on delete requests

                    if (results.status !== 204) {
                        metadataCache.add(resource, results);
                    }
                    if (angular.isDefined(results.data) &&
                        angular.isDefined(results.data.results)) {
                        return results.data.results;
                    }
                    return results.data;
                }
            };
        }]);
})(angular);
