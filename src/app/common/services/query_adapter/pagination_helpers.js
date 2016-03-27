(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.pagination.helpers", [])

    .service("madeasy.common.pagination.helper", [
        "madeasy.resource.metadataCache", "madeasy.common.query.paramsCache",
        "madeasy.common.adapter.utils",
        function (metadataCache, paramsCache, utils) {
            /**
             * This singleton paginates all data requested by the other components
             * i.e.: filtering, sorting and search components. Pagination is
             * active by default and only mutated when the pagination
             * directive makes a pagination call to the API or the other
             * components make those calls
             *
             * The basis is the 'getPage()' method, i.e.: all calls are made through
             * this. The method evaluates input given to it to make sure that
             * the value is a number. For cases where it is not, appropriate
             * action is taken
             */
            var getPaginator = function (resource) {
                utils.guaranteeValidResource(resource);
                var metadata = metadataCache.get(resource);
                return {
                    getCurrentPage: function () {
                        return metadata.currentPage;
                    },
                    getFirstPage: function () {
                        return this.getPage(1);
                    },
                    getItemCountPerPage: function () {
                        return metadata.pageSize;
                    },
                    getLastPage: function () {
                        return this.getPage(this.getTotalPages());
                    },
                    getNextPage: function () {
                        var currentPage = this.getCurrentPage();

                        if (_.isNumber(currentPage) && currentPage >= 1) {
                            return this.getPage(currentPage + 1);
                        } else {
                            return this.getFirstPage();
                        }
                    },
                    getPage: function (pageNumber) {
                        var resourceParams = paramsCache.get(resource);
                        if (!Number.isInteger(pageNumber) ||
                            Math.sign(pageNumber) === -1) {
                            pageNumber = Math.abs(parseInt(pageNumber, 10));
                        }
                        if (isNaN(pageNumber)) {
                            pageNumber = 1;
                        }
                        if (pageNumber <= 0) {
                            pageNumber = 1;
                        }
                        if (pageNumber > metadata.totalPages) {
                            pageNumber = metadata.totalPages;
                        }
                        resourceParams.page = pageNumber;
                        paramsCache.update(resource, resourceParams);

                        return pageNumber;
                    },
                    getPageEndIndex: function () {
                        return metadata.endIndex;
                    },
                    getPageStartIndex: function () {
                        return metadata.startIndex;
                    },
                    getPreviousPage: function () {
                        var currentPage = this.getCurrentPage();

                        if (_.isNumber(currentPage) && currentPage > 1) {
                            return this.getPage(currentPage - 1);
                        } else {
                            return this.getFirstPage();
                        }
                    },
                    getTotalItemCount: function () {
                        return metadata.count;
                    },
                    getTotalPages: function () {
                        return metadata.totalPages;
                    }
                };
            };

            var getPageSize = function (resource) {
                utils.guaranteeValidResource(resource);
                return {
                    getPageSizeConfig: paramsCache.getPageSizeConfig,
                    getResourceParams: paramsCache.getResourceParams,

                    updatePageSize: _.partial(
                        paramsCache.updatePageSizeConfig, resource)
                };
            };

            return {
                getPageSize: getPageSize,
                getPaginator: getPaginator
            };
        }
    ]);
})(angular, _);
