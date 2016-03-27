(function (angular) {
    "use strict";

    var PAGINATION_TPL = "sil.grid.pagination.tpl.html";

    angular.module("madeasy.common.directives.paginate", [
        PAGINATION_TPL
    ])

    .controller("silPaginateController", function () {
        var instance = this;
        instance.pageParam = 1;
        instance.nextPage = function() {
            instance.paginator.getNextPage();
            return instance.getData();
        };
        instance.previousPage = function() {
            instance.paginator.getPreviousPage();
            return instance.getData();
        };
        instance.firstPage = function() {
            instance.paginator.getFirstPage();
            return instance.getData();
        };
        instance.lastPage = function() {
            instance.paginator.getLastPage();
            return instance.getData();
        };
        instance.goToPage = function(pageNumber) {
            instance.paginator.getPage(pageNumber);
            return instance.getData();
        };

        /**
         * Given an input for a ``page-to-go-to`` request, evaluate that the
         * parameter is a number. Otherwise, if it is:
         *
         *      1. Undefined
         *      2. Null
         *      3. Empty
         *      4. NaN
         *      5. Greater than the total number of pages
         *      6. Less than or equal to zero
         * publish the correct message
         */
        instance.notify = function (pageNumber) {
            if (instance.paginator && _.isNumber(pageNumber)) {
                if (pageNumber > instance.paginator.getTotalPages() ||
                    pageNumber <= 0) {
                    return "The page is not within range";
                }
            }
            return "";
        };
    })

    .directive("silPaginate", function() {
        return {
            bindToController: {
                "getData": "=",
                "paginator": "="
            },
            controller: "silPaginateController",
            controllerAs: "sPC",
            restrict: "E",
            scope: {},
            templateUrl: PAGINATION_TPL
        };
    });
})(angular);
