"use strict";

(function () {
    describe("Test the Grid Table Ordering Directive: ", function() {
        var $compile, $scope, template1, template2, elem1,
            elem2, elem3, compiledElem1, compiledElem2, compiledElem3,
            $element, util;
        var orderingParam = "patient_name";
        var resource = {
            "name": "encounter"
        };
        var domEvent = {
            "target": "<i class='fa fa-sort' ng-if='col.sortable !== '''" +
                      "   ng-click='orderData(col.sortable, $event)' " +
                      "   id='ordering-icon'></i>{{col.display}}"
        };
        var templateUrl1 = "common/tpls/grid/list.tpl.html";
        var htmlTemplate = "<sil-grid-table-ordering columns=\"columns\">" +
                           "    <i class=\"fa fa-sort\" " +
                           "     ng-if=\"col.sortable !== ''\"" +
                           "     ng-click=\"orderData(col.sortable, $event)\"" +
                           "     id=\"ordering-icon\"></i>{{col.display}}" +
                           "</sil-grid-table-ordering>";
        beforeEach(function() {
            module("madeasy.common.directives");
            module("madeasy.common.services.query_adapter");
            module("madeasy.resources.common.jsDataUtils");
            module("madeasy.resources.common.deserialize_drf");
            module("common/tpls/grid/list.tpl.html");
        });

        beforeEach (inject(["$compile", "$rootScope", "$templateCache",
            "queryAdapter", "madeasy.common.adapter.utils",
            function(_$compile, _$rootScope, $templateCache, _adapter, _util) {
                template1 = $templateCache.get(templateUrl1);
                template2 = $templateCache.get(htmlTemplate);

                $templateCache.put(templateUrl1, template1);

                $compile = _$compile;
                $scope = _$rootScope.$new();
                util = _util;
                $scope.sorter = _adapter.handleSorting(resource);
                $scope.getData = function (params) {
                    return params;
                };
                $scope.rowLevelActionsList = [
                    {
                        "actions": "ui-sref='patients'",
                        "class": "success",
                        "label": "View"
                    }
                ];

                $scope.columns = [
                    {
                        "display": "Patient Name",
                        "name": "patient_name",
                        "sortable": "patient__person__first_name"
                    },
                    {
                        "display": "Date",
                        "name": "start",
                        "sortable": ""
                    }
                ];

                $element = getCompiledElement();
            }]));

        function getCompiledElement() {
            elem1 = angular.element(
                "<grid-table columns=\"columns\" list=\"list\">" +
                "   <grid-table-ordering columns=\"columns\">" +
                "       <i class=\"fa fa-sort\" ng-if=\"col.sortable !== ''\"" +
                "           ng-click=\"orderData(col.sortable, $event)\"" +
                "           id=\"ordering-icon\"></i>{{col.display}}" +
                "   </grid-table-ordering>" +
                "</grid-table>");
            elem2 = angular.element(htmlTemplate);
            elem3 = angular.element("<sil-row-level-action " +
                        "row-level-actions-list='rowLevelActionsList'>" +
                        "</sil-row-level-action>");

            compiledElem1 = $compile(elem1)($scope);
            compiledElem2 = $compile(elem2)($scope);
            compiledElem3 = $compile(elem3)($scope);

            $scope.$digest();

            return {
                compiledElem1: compiledElem1,
                compiledElem2: compiledElem2,
                compiledElem3: compiledElem3
            };
        }

        it("Should toggle in descending order direction", function() {
            spyOn($scope.sorter, "updateOrdering");
            $scope.orderData(orderingParam, domEvent);
            expect($scope.sorter.updateOrdering).toHaveBeenCalled();
        });

        it("Should toggle in ascending order direction", function() {
            spyOn($scope.sorter, "updateOrdering");
            var domEvent = {
                "target": "<i class='fa fa-arrow-up' ng-if='col.sortable " +
                          "!== ''' ng-click='orderData(col.sortable, " +
                          "$event)'  id='ordering-icon'></i>{{col.display}}"
            };
            $scope.orderData(orderingParam, domEvent);
            expect($scope.sorter.updateOrdering).toHaveBeenCalled();
        });

        it("Should toggle in descending order direction", function() {
            spyOn($scope.sorter, "updateOrdering");
            var domEvent = {
                "target": "<i class='fa fa-arrow-down' ng-if='col.sortable " +
                          "!== ''' ng-click='orderData(col.sortable, " +
                          "$event)'  id='ordering-icon'></i>{{col.display}}"
            };
            $scope.orderData(orderingParam, domEvent);
            expect($scope.sorter.updateOrdering).toHaveBeenCalled();
        });

        it("Should flip ordering", function() {
            spyOn($scope.sorter, "getOrdering").and.returnValue([orderingParam]);
            spyOn($scope.sorter, "updateOrdering");
            $scope.orderData(orderingParam, domEvent);
            expect($scope.sorter.updateOrdering).toHaveBeenCalled();
        });
    });
})();
