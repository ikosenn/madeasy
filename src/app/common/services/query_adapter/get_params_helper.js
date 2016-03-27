(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.get.params.helpers", [])

    .service("madeasy.common.get.params", [
        "madeasy.common.query.paramsCache", "PAGINATION_COUNT",
        "madeasy.common.adapter.utils",
        function (paramsCache, page_count, utils) {
            /**
             * Assemble the sorting, searching, filtering and pagination params
             * that are maintained statefully by this service.
             *
             * This is part of the final common pathway for outbound queries.
             * It is the only function that should have the intelligence to
             * 'compose' the final URL.
             *
             * The object returned by this function is sent to JSData as-is.
             * It should therefore be compatible with JSData syntax.
             *
             * It returns a Javascript object.
             */
            var getParams = function (resource) {
                utils.guaranteeValidResource(resource);
                var resourceParams = paramsCache.getResourceParams(resource);
                var apiParams = {};

                apiParams.page = resourceParams.page || 1;
                apiParams.page_size = resourceParams.page_size || page_count;
                apiParams.ordering = _.reduce(resourceParams.ordering,
                    function (memo, param) {
                        return memo + "," + param;
                    }
                );
                apiParams.fields = _.reduce(resourceParams.fields,
                    function (memo, param) {
                        return memo + "," + param;
                    }
                );

                // _.extend handles null / undefined second param gracefully
                _.extend(apiParams, resourceParams.filtering);

                // Leave out keys with null or undefined values
                return _.pick(apiParams, function(value) {
                    return !_.isNull(value) && !_.isUndefined(value);
                });
            };

            return {
                getParams: getParams
            };
        }
    ]);
})(angular, _);
