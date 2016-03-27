(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.query.paramsCache", [])

    .service("madeasy.common.query.paramsCache", [
        "madeasy.common.adapter.utils",
        function (utils) {
            /**
             * This service maintains a SINGLETON grid parameter cache ( app wide )
             * and offers accessors and mutators. The accessors and mutators
             * must be the only way to interact with the parameter cache.
             */
            var _params_cache = utils.getEmptyParamsObj();

            return {
                get: function() {
                    return _params_cache;
                },
                getFilteringConfig: function(resource) {
                    utils.guaranteeValidResource(resource);
                    return this.getResourceParams(resource).filtering;
                },
                getOrderingConfig: function(resource) {
                    utils.guaranteeValidResource(resource);
                    return this.getResourceParams(resource).ordering;
                },
                getPageSizeConfig: function(resource) {
                    utils.guaranteeValidResource(resource);
                    return this.getResourceParams(resource).page_size;
                },
                getPartialResponseConfig: function(resource) {
                    utils.guaranteeValidResource(resource);
                    return this.getResourceParams(resource).fields;
                },
                getResourceParams: function(resource) {
                    /**
                     * Check if _params_cache is keyed with the resource name
                     * If it is, initialize it with an empty params object
                     * Otherwise key it with the resource name then initialize it
                     *     with the empty params object
                     */
                    utils.guaranteeValidResource(resource);
                    if (!utils.objContainsKey(_params_cache, resource.name)) {
                        _params_cache[resource.name] = utils.getEmptyParamsObj();
                    }
                    return _params_cache[resource.name];
                },
                removeFilteringConfig: function(resource, filterKey) {
                    utils.guaranteeValidResource(resource);
                    // Relies upon the behavior of updateFilteringConfig to remove
                    // filterfields whose values are falsy
                    return this.updateFilteringConfig(resource, filterKey, null);
                },
                removeOrderingConfig: function(resource, orderingParam) {
                    utils.guaranteeValidResource(resource);
                    var initialOrderingParams = this.getOrderingConfig(resource);
                    _params_cache[resource.name].ordering = _.without(
                        initialOrderingParams,
                        orderingParam, "-" + orderingParam, orderingParam.substr(1)
                    );
                    return this.getOrderingConfig(resource);
                },
                removePartialsResponseConfig: function(resource, partialsParam) {
                    utils.guaranteeValidResource(resource);
                    var initialPartialsParams =
                        this.getPartialResponseConfig(resource);
                    _params_cache[resource.name].fields = _.without(
                        initialPartialsParams, partialsParam);
                    return this.getPartialResponseConfig(resource);
                },
                removeSearchConfig: function(resource) {
                    utils.guaranteeValidResource(resource);
                    return this.updateSearchConfig(resource, null);
                },
                update: function(resource, resourceParams) {
                    /**
                     * This is not safe to use directly. Unless you REALLY know what
                     * you are doing, use the more specialized versions e.g
                     * ``updateOrderingConfig``, ``updateFiltering`` etc
                     */
                    utils.guaranteeValidResource(resource);
                    _params_cache[resource.name] = resourceParams;
                    return _params_cache[resource.name];
                },
                updateFilteringConfig: function (resource, filterKey, filterVal) {
                    /**
                     * This expects three parameters:
                     *    1. The resource that is to be filtered
                     *    2. The name of a valid filter field
                     *    3. A filter string / value for that filter field
                     */
                    utils.guaranteeValidResource(resource);
                    var filterParams = this.getFilteringConfig(resource);

                    if (_.contains(_.keys(filterParams), filterKey)) {
                        if (_.isEmpty(filterVal) || _.isNull(filterVal) ||
                            _.isUndefined(filterVal)) {
                            _params_cache[resource.name].filtering =
                                _.omit(_params_cache[resource.name]
                                    .filtering, filterKey
                            );
                        }
                    }
                    filterParams[filterKey] = filterVal;
                    _.extend(
                        _params_cache[resource.name].filtering, filterParams);

                    return this.getFilteringConfig(resource);
                },
                updateOrderingConfig: function(resource, orderingParam) {
                    utils.guaranteeValidResource(resource);
                    var orderingParams = this.getOrderingConfig(resource);
                    // Return early if the ordering param is already there
                    // Check if the orderingParam is already contained in the list
                    if (!_.contains(orderingParams, orderingParam)) {
                        var stripped = orderingParam.substr(1);
                        var padded = "-" + orderingParam;

                        // S is the namespace for underscore.string
                        // If the orderingParam defines a descending order but the
                        // orderingParams list contains the orderingParam supplied
                        // in ascending order flip the existing orderingParam
                        // in-place instead to descending
                        if (s.startsWith(orderingParam, "-") &&
                                _.contains(orderingParams, stripped)) {
                            _params_cache[resource.name].ordering =
                                utils.flipOrderParam(
                                    resource, orderingParams,
                                    stripped, orderingParam);
                        } else if (!s.startsWith(orderingParam, "-") &&
                                _.contains(orderingParams, padded)) {
                            // If the orderingParam defines an ascending order but
                            // the orderingParams list contains the orderingParam
                            // supplied in descending order, flip the existing
                            // orderingParam in-place instead to ascending order
                            _params_cache[resource.name].ordering =
                                utils.flipOrderParam(
                                    resource, orderingParams,
                                    padded, orderingParam);
                        } else {
                            // If neither of the conditions are true then simply
                            // add the param to the list
                            _params_cache[resource.name].
                                ordering.push(orderingParam);
                        }
                    }
                    return this.getOrderingConfig(resource);
                },
                updatePageSizeConfig: function(resource, pageSizeParam) {
                    utils.guaranteeValidResource(resource);
                    _params_cache[resource.name].page_size = pageSizeParam;
                    return this.getPageSizeConfig(resource);
                },
                updatePartialResponseConfig: function(resource, partialsParam) {
                    /*
                        This method takes a comma separated string and adds
                        the fields to the fields parameters in the resource name
                    */
                    var fieldParams = [partialsParam];
                    var splitter = ",";

                    if (partialsParam.indexOf(splitter) !== -1) {
                        fieldParams = partialsParam.split(splitter);
                    }
                    utils.guaranteeValidResource(resource);
                    var partialsParams = this.getPartialResponseConfig(resource);

                    fieldParams.forEach(function (param) {
                        if (!_.contains(partialsParams, param)) {
                            _params_cache[resource.name].fields.push(param);
                        }
                    });

                    return this.getPartialResponseConfig(resource);
                },
                // Search is a special case of filtering - with a filter that
                // has a fixed name ( 'search' )
                updateSearchConfig: function(resource, searchParam) {
                    utils.guaranteeValidResource(resource);
                    return this.updateFilteringConfig(
                        resource, "search", searchParam);
                }
            };
        }
    ]);
})(angular, _);
