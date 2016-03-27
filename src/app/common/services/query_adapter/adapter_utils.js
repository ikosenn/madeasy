(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.adapter.utils", [])

    /**
     * This is a utils file that contains components of the code that is
     * repetitively called inside other files.
     *
     * All of it has been consolidated inside this singleton so that its
     * methods can be accessed from this single point
     */
    .service("madeasy.common.adapter.utils", ["PAGINATION_COUNT",
    function (page_count) {

        /**
         * Return true or false if the evaluated object does or does
         * not contain the queried key
         */
        var objContainsKey = function(object, key) {
            return _.contains(_.keys(object), key);
        };

        /**
         * Make new 'containers' to put into paramsCache
         */
        var getEmptyParamsObj = function () {
            return {
                fields: [],
                // Search is under filtering
                filtering: {},
                ordering: [],
                page: 1,
                page_size: page_count
            };
        };

        /**
         * Throw an error and publish to the error bus if the
         * supplied list does not contain the value indicated
         */
        var guaranteeListContains = function(lst, value) {
            if (!_.contains(lst, value)) {
                throw new Error(value + " is not in '" + lst + "'");
            }
        };

        /**
         * Throw an error and publish to the error bus if the
         * supplied resource param is not evaluated to a valid resource
         */
        var guaranteeValidResource = function (resource) {
            if (!_.isObject(resource)) {
                throw new Error(resource + " has to be an object.");
            }
            if (!resource.hasOwnProperty("name")) {
                throw new Error(resource + " is not a valid resource.");
            }
        };

        /**
         * Throw an error and publish to the error bus if the
         * supplied object param is not evaluated to a valid object
         */
        var guaranteeValidObject = function (object) {
            if (!_.isObject(object)) {
                throw new Error(object + " has to be an object.");
            }

            // Throw error if object is an array
            if (_.isArray(object)) {
                throw new Error(object + " is an array.");
            }
        };

        /**
         * Throw an error and publish to the error bus if the
         * supplied id param is not evaluated to either a number
         * or a string
         */
        var guaranteeValidId = function (id) {
            if (!_.isNumber(id) && !_.isString(id)) {
                throw new Error(id + " should either be a number or a string.");
            }
        };

        /**
         * Evaluate a parameter passed in and make sure that it is a valid array,
         * otherwise broadcast an error message on the message bus
         *
         * @param  {[Array]} arr
         * @return {[Boolean]} true/false
         */
        var guaranteeValidArray = function (arr) {
            if (!_.isArray(arr)) {
                throw new Error(arr + " should be an Array");
            }
        };

        /**
         * Evaluate a parameter passed and ascertain that it is a valid string,
         * otherwise broadcast an error message on the message bus
         *
         * @param  {[String]} param
         * @return {[Boolean]} true/false
         */
        var guaranteeValidString = function (param) {
            if (!_.isString(param)) {
                throw new Error(param + " should be a String");
            }
        };

        var flipOrderParam = function (res, params, replacee, replacement) {
            this.guaranteeValidResource(res);
            this.guaranteeValidArray(params);
            this.guaranteeValidString(replacee);
            this.guaranteeValidString(replacement);
            var currentIndex = params.indexOf(replacee);
            params.splice(currentIndex, 1, replacement);
            return params;
        };

        /**
         * Extract metadata from the backend-supplied results.
         * Return the metadata that has been extracted.
         *
         * Save metadata only if results are a DRF list view response
         *
         * @param  {[Object]} results
         * @return {[Object]}
         */
        var extractMetadata = function(results) {
            if (this.objContainsKey(results.data, "results")) {
                var metadata = {
                    count: results.data.count,
                    currentPage: results.data.current_page,
                    endIndex: results.data.end_index,
                    filterFields: results.data.filter_fields,
                    next: results.data.next,
                    orderingFields: results.data.ordering_fields,
                    pageSize: results.data.page_size,
                    previous: results.data.previous,
                    startIndex: results.data.start_index,
                    totalPages: results.data.total_pages
                };
                return metadata;
            } else {
                return {};
            }
        };

        /**
         * Evaluate an object of rowlevel actions passed in and make sure that:
         *     1. It is an array of object items
         *     2. It contains up to a maximum of two row-level actions objects
         * Otherwise broadcast errors on the message bus
         *
         * @param  {[Array]} arrayObj list of objects containing information
         *                            about the row-level-actions
         * @return {[Array]}          Return the array as-is if it has respected
         *                            the contract, else throw error
         */
        var validateList = function(arrayObj) {
            if (!_.isArray(arrayObj) ||
                _.isNull(arrayObj) ||
                _.isUndefined(arrayObj)) {
                throw new Error(arrayObj + " has to be an array.");
            }
            if (arrayObj.length > 2) {
                throw new Error(
                    arrayObj + " should have atmost two row-level actions" +
                    ". Instead it contains " + arrayObj.length + " items.");
            }

            return arrayObj;
        };

        var flipParam = function(orderingParam) {
            var returned;

            if (_.first(orderingParam) === "-") {
                returned = orderingParam.slice(1, orderingParam.length);
                return returned;
            } else {
                returned = "-" + orderingParam;
                return returned;
            }
        };

        /**
         * Take an array/a list of objects of snake_cased strings and return an
         * array of the same strings but in Proper Case.
         *
         * For example:
         *     1. test_data -- Test Data
         *     2. an_even_longer_string -- An Even Longer String
         *
         * @param  {[Array]} arr containing filter_params as simple ``String``s or
         *                       as objects
         * @return {[Object]}    containing list of ``filterCriteria`` as simple
         *                       ``String``s and their ``dataType``s also as
         *                       simple ``String``s
         */
        var convertStringToProperCase = function (arr) {

            // Iterate over every item in the array and evaluate them, using the
            // callback function, into Proper Case
            if (_.isUndefined(arr)) {
                arr = [];
                return arr;
            } else {
                this.guaranteeValidArray(arr);
                var filterCriteriaList = [];
                var dataTypeList = [];

                // Loop through the array to access each item in it
                _.each(arr, function (returnedItem) {
                    // Check if the accessed items are arrays
                    // This check should cater for situations where the items
                    // are objects
                    // For cases where the items are simple strings a different check
                    // will have to be made
                    if (typeof returnedItem === "object") {
                        // Note: require keys in the object are `name` and `type`
                        var filterCriteriaItem = returnedItem.name;
                        var dataTypeItem = returnedItem.type;

                        filterCriteriaList.push(filterCriteriaItem);
                        dataTypeList.push(dataTypeItem);
                    } else {
                        // Otherwise if the items are just simple strings
                        // push them into the empty array as-is
                        filterCriteriaList.push(returnedItem);
                    }
                });
                var returnedFilterCriteria = _.map(filterCriteriaList,
                    function (str) {
                        var returned = str.replace(/([^\W_]+[^\s_]*) */g,
                            function (txt) {
                                return txt.charAt(0)
                                            .toUpperCase() + txt.substr(1)
                                            .toLowerCase();
                            });
                        return returned.replace(/\_/g, " ");
                    });
                return {
                    dataTypeList: dataTypeList,
                    returnedFilterCriteria: returnedFilterCriteria
                };
            }
        };

        /**
         * Take a Proper Case-d string and transform it to snake_case
         * For example:
         *     1. Test Data -- test_data
         *     2. An Even Longer String -- an_even_longer_string
         *
         * @param  {[String]} str
         * @return {[String]} converted to lowercase
         */
        var revertStringToSnakeCase = function (str) {
            // Convert the string to lower_case then replace every instance of
            // " " with an underscore "_"
            return str.toLowerCase().replace(/\ /g, "_");
        };

        return {
            convertStringToProperCase: convertStringToProperCase,
            extractMetadata: extractMetadata,
            flipOrderParam: flipOrderParam,
            flipParam: flipParam,
            getEmptyParamsObj: getEmptyParamsObj,
            guaranteeListContains: guaranteeListContains,
            guaranteeValidArray: guaranteeValidArray,
            guaranteeValidId: guaranteeValidId,
            guaranteeValidObject: guaranteeValidObject,
            guaranteeValidResource: guaranteeValidResource,
            guaranteeValidString: guaranteeValidString,
            objContainsKey: objContainsKey,
            revertStringToSnakeCase: revertStringToSnakeCase,
            validateList: validateList
        };
    }]);
})(angular, _);
