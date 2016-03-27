(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.filtering.helpers", [])

    .service("madeasy.common.filtering.helper", [
        "madeasy.common.query.paramsCache", "madeasy.common.adapter.utils",
        function (paramsCache, utils) {
            /**
             * This singleton takes a filter params object from the calling
             * component's controller and returns ampersand-separated pairs of
             * items i.e.: the filterField and the filterValue
             *
             * A typical filter object would look something like:
             *
             *     filterParamsObj = {
             *         "first_name": "Sheldon",
             *         "age": 25,
             *         "patient_number": "VSIL00000001"
             *     };
             *
             * The function then parses it for its keys and values and returns
             * something like:
             *
             * [first_name=Sheldon&age=25&patient_number="VSIL00000001"]
             * which are appended to the URL string
             */

            var getFilter = function (resource) {
                utils.guaranteeValidResource(resource);
                return {
                    getFilteringConfig: paramsCache.getFilteringConfig,
                    getResourceParams: paramsCache.getResourceParams,
                    removeFilter: _.partial(
                        paramsCache.removeFilteringConfig, resource),
                    removeFilteringConfig: paramsCache.removeFilteringConfig,
                    updateFilter: _.partial(
                        paramsCache.updateFilteringConfig, resource)
                };
            };

            return {
                getFilter: getFilter
            };
        }
    ]);
})(angular, _);
