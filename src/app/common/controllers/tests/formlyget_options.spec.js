"use strict";

describe("Unit Test: Formly Get options", function () {
    var scope, DS, controller, resource, httpBackend;

    beforeEach(function () {
        module("js-data-mocks");
        module("madeasy.common.controllers.formlyGetOptions");
        module("madeasy.common.services.query_adapter");
        module("madeasy.resources.valuesets.allergyIntoleranceCriticality");

        inject(["$rootScope", "DS", "$controller", "$httpBackend",
                "SERVER_URL", "madeasy.resources.allergyIntoleranceCriticality",
                function ($rootScope, _DS_, $controller, $httpBackend,
                    serverUrl,_criticalityResource) {
                    scope = $rootScope.$new();
                    DS = _DS_;
                    httpBackend = $httpBackend;
                    serverUrl = serverUrl;
                    resource = _criticalityResource;

                    var data = {
                        $scope: scope,
                        resource: _criticalityResource
                    };
                    controller = function () {
                        var ctrl = $controller(
                        "madeasy.formly.radioOptions", data);
                        return ctrl;
                    };
                }
        ]);
    });
    it("Should get list of data for allergy criticality resource",
        function () {
            scope.to = {
                "options": ["High Risk"]
            };
            var allergy_criticality = [
                {id: "High Risk"},
                {id: "Low risk"},
                {id: "Unknown Risk"}
            ];

            DS.expectFindAll("allergy_intolerance_criticality").respond([
                allergy_criticality
            ]);
            controller("madeasy.formly.radioOptions");
            scope.$digest();
            DS.flush();
            expect(scope.to.options[0]).toEqual(allergy_criticality);
        }
    );
});
