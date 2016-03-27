"use strict";

(function () {
    describe("Test the Grid Table Directive: ", function() {
        var $compile, $scope, template1, elem1, elem2, compiledElem1,
            compiledElem2, $element;

        var templateUrl1 = "common/tpls/grid/list.tpl.html";

        beforeEach(function() {
            module("madeasy.common.directives");
            module("madeasy.common.services.query_adapter");
            module("madeasy.resources.common.jsDataUtils");
            module("madeasy.resources.common.deserialize_drf");
            module("common/tpls/grid/list.tpl.html");
        });

        beforeEach (inject(["$compile", "$rootScope", "$templateCache",
            "queryAdapter",
            function (_$compile, _$rootScope, $templateCache) {
                template1 = $templateCache.get(templateUrl1);
                $templateCache.put(templateUrl1, template1);

                $compile = _$compile;
                $scope = _$rootScope.$new();
                $scope.rowLevelActionsList = [
                    {
                        "actions":
                            "ui-sref='visits.detail.triage({visitID: item.id, " +
                            "patientID: item.patient_details.id})'",
                        "class": "success",
                        "label": "View"
                    }
                ];

                $element = getCompiledElement();
            }]));

        function getCompiledElement() {
            elem1 = angular.element("<sil-grid-table columns='columns' " +
                        "list='list'><sil-row-level-action " +
                        "row-level-actions-list='rowLevelActionsList'>" +
                        "</sil-row-level-action></sil-grid-table>");

            elem2 = angular.element("<sil-row-level-action " +
                        "row-level-actions-list='rowLevelActionsList'>" +
                        "</sil-row-level-action>");

            compiledElem1 = $compile(elem1)($scope);
            compiledElem2 = $compile(elem2)($scope);

            $scope.$digest();
            return {
                compiledElem1: compiledElem1,
                compiledElem2: compiledElem2
            };
        }

        it("Should list data from the API", function() {
            expect(compiledElem1.html()).toBeTruthy();
        });
    });
})();
