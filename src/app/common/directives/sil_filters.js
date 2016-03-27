(function (angular) {
    "use strict";

    var FILTER_TPL = "sil.grid.filters.tpl.html";

    angular.module("madeasy.common.directives.filters", [
        FILTER_TPL
    ])

    .directive("silFilters", function () {
        var controller = ["$scope", "madeasy.common.adapter.utils",
            function ($scope, utils) {
                $scope.filterData = function(filterField, filterValue) {
                    filterField = utils.revertStringToSnakeCase(filterField);
                    $scope.filter.updateFilter(filterField, filterValue);
                    $scope.getData();
                };
                $scope.searchData = function(searchParam) {
                    $scope.search.updateSearch(searchParam);
                    $scope.getData();
                };
                $scope.filterFieldsFunc = function (filterFieldsList) {
                    var filterFields =
                        utils.convertStringToProperCase(filterFieldsList);
                    return filterFields.returnedFilterCriteria;
                };
                $scope.getDataType = function (filterFieldsList, filterField) {
                    _.each(filterFieldsList, function (obj) {
                        filterField = utils
                            .revertStringToSnakeCase(filterField || "");
                        if (obj.name === filterField) {
                            $scope.dataType = obj.type;
                        }
                    });
                };
            }];
        return {
            controller: controller,
            controllerAs: "vm",
            restrict: "E",
            scope: {
                "filter": "=",
                "getData": "=",
                "metadata": "=",
                "resource": "=",
                "search": "="
            },
            templateUrl: FILTER_TPL
        };
    });
})(angular);
