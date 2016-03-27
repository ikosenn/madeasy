"use strict";

describe("Tests for the controller named common controllers",
    function () {
        var scope, DS, controller;
        beforeEach(function () {
            module("js-data-mocks");
            module("madeasy.common.controllers.combobox");
            inject(["$rootScope", "$controller","DS", function ($rootScope,
                $controller, _DS_) {
                scope = $rootScope.$new();
                DS = _DS_;

                var data = {
                    $scope: scope
                };
                controller = function (name) {
                    $controller(name, data);
                };
            }]);
        });

        it("should have 'madeasy.common.comboboxController' defined w/o url",
            function () {
                scope.to = {
                    "label": "Payment Method"
                };
                controller("madeasy.common.comboboxController");
                expect(scope.to.optionsResource).toBeUndefined();
            }
        );

        it("should have 'madeasy.common.comboboxController' modify to.options",
            function () {
                scope.to = {
                    "label": "Payment Method",
                    "options": [],
                    "optionsResource": "resource"
                };

                var triage = [
                    {name: "triage queue"},
                    {name: "billing"}
                ];
                DS.expectFindAll("resource").respond(triage);
                controller("madeasy.common.comboboxController");
                scope.$digest();
                DS.flush();
                scope.trustAsHtml("<p>user</p>");
                expect(scope.to.options[0].name).toEqual("triage queue");
            }
        );

        it("Should allow for an extended fulltext search via the combobox",
        function () {
            scope.to = {
                "label": "People",
                "labels": ["first_name", "other_names", "last_name"],
                "options": [],
                "optionsResource": "person"
            };
            var personData = [
                {
                    "first_name": "denis",
                    "id": "some-fake-uuid",
                    "last_name": "karanja",
                    "other_names": "mburu"
                }
            ];
            DS.expectFindAll("person").respond(personData);

            controller("madeasy.common.comboboxController");

            var value = "denid karanja";
            var params = {
                search: value
            };
            DS.expectFindAll("person", params).respond(personData);

            scope.refreshResults(value);

            scope.$digest();
            DS.flush();

            expect(scope.to.options[0].first_name).toEqual("denis");
            expect(scope.to.options[0].last_name).toEqual("karanja");
            expect(scope.to.options[0].other_names).toEqual("mburu");
        });

        it("Should fail getting resource data via the combobox", function () {
            var error = new Error("Failed to GET resource");
            scope.to = {
                options: [],
                optionsResource: "some-fake-resource"
            };
            DS.expectFindAll("some-fake-resource").respond({});

            controller("madeasy.common.comboboxController");

            var value = "denid karanja";
            var params = {
                search: value
            };
            DS.expectFindAll("some-fake-resource", params).respond(error);

            scope.refreshResults(value);

            scope.$digest();
            DS.flush();

            var domError = {
                msg: [{}],
                title: "Failed to Load Resource",
                type: "danger"
            };
            expect(scope.alert).toEqual(domError);
        });

        it("should fail to load resource data if the resource does not" +
            " or when there's no Internet connectivity", function () {
                var error = new Error("Resource Not Found");
                DS.expectFindAll("some-fake-resource").respond(error);
                scope.to = {
                    options: [],
                    optionsResource: "some-fake-resource"
                };
                controller("madeasy.common.comboboxController");
                scope.$digest();
                DS.flush();
                var domError = {
                    msg: [{}],
                    title: "Failed to Load Resource",
                    type: "danger"
                };
                expect(scope.alert).toEqual(domError);
            });
    });
