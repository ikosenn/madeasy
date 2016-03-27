(function (angular) {
    "use strict";

    angular.module("madeasy.resources.common.jsDataUtils",[
        "madeasy.config",
        "madeasy.auth.services",
        "madeasy.common.adapter.utils"
    ])

    .factory("madeasy.resource.metadataCache", [
        "madeasy.common.adapter.utils", function (utils) {
            /**
             * This service maintains a cache of information from the 'header' of
             * resource lists retrieved from DRF.
             *
             * Because this holds data for many resources, use an object that is
             * keyed by resource names.
             *
             * It has a known weakness - assuming that each resource has a single
             * grid / list active at any time system-wide. With our current design
             * philosophy, that weakness will not cause problems. If we switch to
             * a multi-tab interface, it WILL cause mischief.
             */

            // This cache could easily be persistent
            var cache = {};

            return {
                add: function(resource, results) {
                    /*
                     * Given a resource and an instance of that resource,:
                     *  1. Retrieve meta-data from that resource
                     *  2. Store it in the cache with the resource name
                     *     (resource.name) as the key
                     */

                    if (!utils.objContainsKey(resource, "name")) {
                        throw "Metadata can only be cached for resources " +
                              "with a .name";
                    }
                    if (!utils.objContainsKey(results.data, "id") &&
                        !utils.objContainsKey(results.data, "results")) {
                        throw results + " doesn't look like a DRF JSON results " +
                                        "payload";
                    }

                    var metadata = utils.extractMetadata(results);
                    cache[resource.name] = metadata;
                    return metadata;
                },
                get: function(resource) {
                    /**
                     * Given a resource or a resource name,
                     * get back the cached meta-data. If there is no cached
                     * meta-data yet, or the resource is invalid return
                     * an empty object.
                     */
                    var key = resource.name;

                    if (utils.objContainsKey(cache, key)) {
                        var metadata = cache[key];
                        return metadata;
                    } else {
                        /* Given a resource name, return the metadata if it is
                        *  cached otherwise return an empty object
                        */
                        return cache[resource] || {};
                    }
                }
            };
        }
    ]);
})(angular);
