"use strict";

(function () {
    describe("Test the Filters directive: ", function() {
        var $compile, $scope, $rootScope, template, elem, $element;
        var templateUrl = "common/tpls/grid/filters.tpl.html";

        beforeEach(function() {
            module("madeasy.common.directives");
            module("madeasy.common.services.query_adapter");
            module("madeasy.resources.common.jsDataUtils");
            module("madeasy.resources.common.deserialize_drf");
            module("common/tpls/grid/filters.tpl.html");
        });

        beforeEach (inject(["$compile", "$rootScope", "$templateCache",
            "queryAdapter",
            function (_$compile, _$rootScope, $templateCache, _adapter) {
                template = $templateCache.get(templateUrl);
                $templateCache.put(templateUrl, template);

                $compile = _$compile;
                $rootScope = _$rootScope;
                $scope = $rootScope.$new();

                $scope.getData = function (params) {
                    return params;
                };

                var resource = {
                    "name": "encounter"
                };
                $scope.filter = _adapter.handleFiltering(resource);
                $scope.search = _adapter.handleSearch(resource);
                $element = angular
                    .element("<sil-filters metadata='metadata' filter='filter' " +
                        "search='search' get-data='getData' " +
                        "resource='resource.class'></sil-filters>");
                elem = $compile($element)($scope);
                $scope.$digest();
            }]));

        it ("Should filter data", function () {
            var isolateScope = $element.isolateScope();
            var filterField = "last_name";
            var filterValue = "Irungu";

            spyOn($scope.filter, "updateFilter");
            isolateScope.filterData(filterField, filterValue);
            expect($scope.filter.updateFilter).toHaveBeenCalled();
        });

        it ("Should search data", function () {
            var isolateScope = $element.isolateScope();
            var searchParam = "Irungu";

            spyOn($scope.search, "updateSearch");
            isolateScope.searchData(searchParam);
            expect($scope.search.updateSearch).toHaveBeenCalled();
        });

        it ("Should convert string to proper case", function () {
            var isolateScope = $element.isolateScope();
            var filterFieldsList = [
                    {
                        "name": "created",
                        "type": "date-time"
                    },
                    {
                        "name": "last_name",
                        "type": "string"
                    }
                    ];

            isolateScope.filterFieldsFunc(filterFieldsList, "");
            expect(isolateScope.filterFields).toEqual();
        });

        it ("Should get the data-type for a selected filter_field",
            function () {
                var isolateScope = $element.isolateScope();
                var filterFieldsList = [
                    {
                        "name": "created",
                        "type": "date-time"
                    },
                    {
                        "name": "first_name",
                        "type": "string"
                    }
                ];
                isolateScope.getDataType(filterFieldsList, "created");
                expect(isolateScope.dataType).toEqual("date-time");
            });

        it ("Should get the data-type for a selected filter_field",
            function () {
                var isolateScope = $element.isolateScope();
                var filterFieldsList = [
                    {
                        "name": "created",
                        "type": "date-time"
                    },
                    {
                        "name": "first_name",
                        "type": "string"
                    }
                ];
                isolateScope.getDataType(filterFieldsList, "");
                expect(isolateScope.dataType).toEqual();
            });
    });
})();
