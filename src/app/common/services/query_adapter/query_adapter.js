(function (angular) {
    "use strict";

    angular.module("madeasy.common.queryAdapter", [])

    .service("queryAdapter", ["madeasy.common.pagination.helper",
        "madeasy.common.ordering.helper", "madeasy.common.filtering.helper",
        "madeasy.common.search.helper", "madeasy.common.get.params",
        "madeasy.common.partial.response.service", "madeasy.common.adapter.utils",
        function (paginationHelper, orderingHelper, filteringHelper,
            searchHelper, getParamsHelper, partialResponse, utils) {
            // Note: because services are singletons, this stateful service will
            // need to key state by resource name otherwise params on one grid will
            // affect other grids

            /**
             * This is conveniently a 'wrapper' service that contains 'public'
             * methods that exposes the internal functionality to the calling
             * components / user.
             *
             * Each of these methods makes a call to their respective helpers
             * which in turn make calls to methods inside the 'query-params-cache'
             */

            // Calls the 'get_params_helper' service which exposes methods in the
            // 'query_params_cache' to it

            var getParams = function (resource) {
                utils.guaranteeValidResource(resource);
                return getParamsHelper.getParams(resource);
            };

            // Calls the 'filtering_helper' service which exposes methods in the
            // 'query_params_cache' to it
            var handleFiltering = function (resource) {
                utils.guaranteeValidResource(resource);
                return filteringHelper.getFilter(resource);
            };

            // Calls the 'ordering_helper' service which exposes methods in the
            // 'query_params_cache' to it
            var handleSorting = function (resource) {
                utils.guaranteeValidResource(resource);
                return orderingHelper.getSorter(resource);
            };

            // Called by the pagination directive and in turn calls the
            // 'pagination_helper' service which exposes methods in the
            // 'query_params_cache' to it
            var handlePaging = function (resource) {
                utils.guaranteeValidResource(resource);
                return paginationHelper.getPaginator(resource);
            };

            // This is essentially an API sugar that calls the 'search_helper'
            // service which is a modified version of the 'filtering_helper' as a
            // few of the methods called are also API sugars that call the methods
            // serving the 'filtering_helper'.
            var handleSearch = function (resource) {
                utils.guaranteeValidResource(resource);
                return searchHelper.getSearch(resource);
            };

            var handlePartialResponses = function (resource) {
                utils.guaranteeValidResource(resource);
                return partialResponse.getPartialResponse(resource);
            };

            var handlePagingPageSize = function (resource) {
                utils.guaranteeValidResource(resource);
                return paginationHelper.getPageSize(resource);
            };

            // Calls the getParams() method which returns a query object that wraps
            // all query items into one. This object is what's supplied to the API
            // to process the queries
            var getData = function (resource) {
                utils.guaranteeValidResource(resource);
                return resource.findAll(getParams(resource), {bypassCache: true});
            };

            /**
             * Make a POST request to create an item on the backend
             * @return {promise}
             */
            var createData = function (resource, data) {
                /**
                 * @args - resource {Resource} to specify the item being created
                 *       - data {object} the data from which to create the item
                 */
                utils.guaranteeValidResource(resource);
                utils.guaranteeValidObject(data);

                return resource.create(data);
            };

            /**
             * Make a:
             *     PUT request to update all the fields
             *     PATCH request to update specific field(s)
             * ...of an item on the backend
             * @return {promise}
             */
            var updateData = function (resource, id, data, method) {
                /**
                 * @args - resource {Resource} to specify the item being created
                 *       - id {string || number} primary key for the item to
                 *         update
                 *       - data {object} the data from which to create the item
                 *       - method {string} method to use while updating, either
                 *         'PUT' or 'PATCH'
                 */
                utils.guaranteeValidResource(resource);
                utils.guaranteeValidId(id);
                utils.guaranteeValidObject(data);
                utils.guaranteeValidString(method);

                return resource.update(id, data, {method: method});
            };

            /**
             * Make a DELETE request to destroy an item on the backend
             * @return {promise}
             */
            var deleteData = function (resource, id) {
                /**
                 * @args - resource {Resource} to specify the item being created
                 *       - id {string || number} primary key for the item to
                 *         update
                 */
                utils.guaranteeValidResource(resource);
                utils.guaranteeValidId(id);

                return resource.destroy(id);
            };

            return {
                createData: createData,
                deleteData: deleteData,
                getData: getData,
                handleFiltering: handleFiltering,
                handlePaging: handlePaging,
                handlePagingPageSize: handlePagingPageSize,
                handlePartialResponses: handlePartialResponses,
                handleSearch: handleSearch,
                handleSorting: handleSorting,
                updateData: updateData
            };
        }
    ]);
})(angular);
