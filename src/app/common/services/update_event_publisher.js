(function (angular) {
    "use strict";

    angular.module("madeasy.common.resourceUtilities", [])

    .service("madeasy.common.resourceUtilities",
        ["$rootScope", function ($rootScope) {
        /* When a new record is created and the user navigated back to the list view
         * they expect to see the new record on top. In order to achieve that, the
         * list view contents should be refreshed with the newest records from the
         * server side.
         *
         * JSData DS.bindall() does not work correctly for this because it watches
         * a last update timestamp that is maintained internally by JSData. We want
         * to sort using the server-side 'created' timestamp instead - hence we need
         * to issue a new call to the the server.
         *
         * These helpers allow us to notify a list view controller when we want it
         * to reload data. Finally - at the point of loading data, be sure to tell
         * JSData to bypass the cache
         * e.g ``organisationResource.findAll(params || {}, { bypassCache: true })``
         */
        return {
            listenToResourceUpdate: function(resource, updateFunction) {
                /* The first parameter is a resource e.g 'organizationResource'
                 * ( from injecting '"madeasy.resource.organisation"' ).
                 *
                 * The second parameter is a function that - when called - will
                 * update the grid. It must be parameter-less.
                 * e.g '$scope.getOrg'
                 */
                var callback = function() {
                    updateFunction();
                };
                $rootScope.$on(resource.name + ".change", callback);
                return callback;
            },
            publishResourceUpdate: function(resource) {
                /* The only parameter here is a resource e.g 'organizationResource'
                 * ( from injecting '"madeasy.resource.organisation"' ).
                 */
                $rootScope.$emit(resource.name + ".change");
            }
        };
    }]);
})(angular);
