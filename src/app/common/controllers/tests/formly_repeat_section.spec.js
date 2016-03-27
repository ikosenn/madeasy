"use strict";

describe("Unit Test: Fomrly Repeat Section", function () {
    var scope, controller;

    beforeEach(function () {
        module("madeasy.common.controllers.formlyRepeatingSection");

        inject(["$rootScope", "$controller",
        function ($rootScope, $controller) {
            scope = $rootScope.$new();

            var data = {
                $scope: scope
            };

            controller = function () {
                var ctrl = $controller(
                "madeasy.formly.repeatingSection", data);
                return ctrl;
            };
        }]);
    });

    it("Should copy the original fields to the DOM and add `ID`", function () {
        controller();
        var unique = 1;
        var desc = "Phone number should be in the form (+254) 7XX-XXX-XXX";
        var fields = [
            {
                fieldGroup: [
                    {
                        key: "repeatingContacts",
                        templateOptions: {
                            fields: [
                                {
                                    key: "phone_number",
                                    templateOptions: {
                                        addonLeft: {
                                            "class": "fa fa-phone"
                                        },
                                        description: desc,
                                        label: "Phone Number",
                                        required: true,
                                        type: "text"
                                    }
                                }

                            ]
                        }
                    }
                ]
            }
        ];
        var newFields = scope.copyFields(fields);
        var index = 0;
        unique += 3;
        scope.$apply();

        var phone_id = fields[index].fieldGroup[index].templateOptions
        .fields[index].key;
        var additions = "_" + String(index) + "_" + String(unique);
        phone_id = phone_id + additions;
        var repeat_id = fields[index].fieldGroup[index].key + additions;

        var result = [
            {
                fieldGroup: [
                    {
                        id: repeat_id,
                        key: "repeatingContacts",
                        templateOptions: {
                            fields: [
                                {
                                    id: phone_id,
                                    key: "phone_number",
                                    templateOptions: {
                                        addonLeft: {
                                            "class": "fa fa-phone"
                                        },
                                        description: desc,
                                        label: "Phone Number",
                                        required: true,
                                        type: "text"
                                    }
                                }

                            ]
                        }
                    }
                ]
            }
        ];

        expect(newFields).toEqual(result);
    });

    it("Should add new element(s) to the DOM", function () {
        controller();
        scope.model = {};

        scope.model.phone_number = [];
        scope.options = {
            key: "phone_number"
        };
        scope.addNew();

        scope.$apply();

        expect(scope.repeatingSection.length).toBe(1);
    });

    it("Should add new element(s) to the DOM if key is undefined", function () {
        controller();
        scope.model = {};

        scope.model.phone_number = [];
        scope.options = {};
        scope.options.key = {};
        scope.addNew();

        scope.$apply();

        expect(scope.repeatingSection.length).toBe(1);
    });

    it("Should add more element(s) to the DOM if key is undefined", function ()
    {
        controller();
        scope.options = {
            email_address: "email@address.com",
            phone_number: "0199242984"
        };
        scope.options.key = "phone_number";
        scope.model = [
            {
                phone_number: "429849284"
            }
        ];

        // Call the method twice to simulate addition of two fields
        scope.addNew();
        scope.$apply();

        scope.addNew();
        scope.$apply();

        expect(scope.repeatingSection.length).toBe(2);
    });
});
