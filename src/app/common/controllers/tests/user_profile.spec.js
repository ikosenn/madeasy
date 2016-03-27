"use strict";

describe("Tests for the controller named madeasy.common.controllers.user_profile",
    function () {
        var controller, data, DS, scope, SERVER_URL, httpBackend;
        var stateParams, userResource, state, loadFormly, AuthService;
        var personResource;

        beforeEach(function () {
            module("js-data-mocks");
            module("madeasy.config");
            module("madeasy.common");
            module("madeasy.auth.services");
            module("madeasy.resources.auth.user");
            module("madeasy.common.formly.user");

            inject(["$rootScope", "$stateParams", "$controller", "$httpBackend",
            "SERVER_URL", "$state", "madeasy.common.formly.user",
            "DS", "madeasy.auth.services.login", "madeasy.resource.user",
            "madeasy.resource.person", "errorMessage",
                function ($rootScope, $stateParams, $controller, $httpBackend,
                    serverUrl, $state, _loadFormly_, _DS_, Auth,
                    _userResource_, _personResource_) {
                    scope = $rootScope.$new();
                    loadFormly = _loadFormly_;
                    AuthService = Auth;
                    SERVER_URL = serverUrl;
                    state = $state;
                    stateParams = $stateParams;
                    stateParams.userId = "dy47d-ddj43-jjr";
                    httpBackend = $httpBackend;
                    userResource = _userResource_;
                    personResource = _personResource_;

                    DS = _DS_;

                    data = {
                        $scope : scope,
                        $state : $state,
                        $stateParams: stateParams,
                        SERVER_URL : serverUrl,
                        "madeasy.auth.services.login" : AuthService,
                        "madeasy.common.formly.user": loadFormly,
                        "madeasy.resource.person": personResource,
                        "madeasy.resource.user": userResource
                    };

                    controller = function () {
                        var ctrl =
                        $controller("madeasy.common.controllers.user_profile",data);
                        return ctrl;
                    };
                }]);
        });

        it("should load formly fields", function () {
            var expectedData =
                {
                    "key": "email",
                    "templateOptions": {
                        "emailValidationMsg": "Please provide a valid" +
                        " email address",
                        "label": "E-mail Address",
                        "reqValidationMsg": "Please provide an email " +
                                            "address here",
                        "required": true,
                        "type": "text"
                    },
                    "type": "input"
                };
            controller();
            expect(scope.fields).toContain(expectedData);
        });
        it("should update `me` API endpoint",
            inject(["madeasy.auth.services.login",
                function(AuthService) {

                    var userData = {
                        organisation: "some-org-here",
                        password: "some-very-very-insecure-password"
                    };
                    spyOn(AuthService, "getUser").and.returnValue(userData);

                    scope.userProfile = {};

                    var meDetails = {
                        id: "some-fake-uuid",
                        organisation: "org-uuid",
                        password: "some-very-very-insecure-password",
                        person: "some-fake-person-id"
                    };

                    controller();

                    DS.expectUpdate("user", stateParams.userId).respond(
                        meDetails);

                    scope.updateUser();

                    scope.$apply();
                    DS.flush();

                    expect(scope.updated).toEqual(meDetails);
                    expect(scope.alert).toEqual({
                        msg: "You have successfully updated your details!" +
                            "Kindly logout to view the changes.",
                        title : "Success",
                        type: "success"
                    });
                }
            ])
        );
        it("should update `person` API endpoint",
            inject(["madeasy.auth.services.login",
            function(AuthService) {

                var userData = {
                    first_name: "Vivian",
                    id: "some-other-fake-id",
                    last_name: "Wanjiru",
                    organisation: "some-fake-org-id"
                };
                spyOn(AuthService, "getUser").and.returnValue(userData);
                scope.userProfile = {};

                controller();
                scope.userProfile.model = {
                    first_name: "Vivian",
                    id: "some-other-fake-id",
                    last_name: "Wanjiru",
                    organisation: "some-fake-org-id"
                };
                var param = scope.userProfile.model.id;

                DS.expectUpdate("person", param)
                .respond(scope.userProfile.model);

                spyOn(scope, "updateUser");

                scope.update();

                scope.$apply();
                DS.flush();

                expect(scope.updateUser).toHaveBeenCalled();
            }]));

        it("Should fail updating a person",
            function () {
            var userData = {
                first_name: "Vivian",
                id: "some-other-fake-id",
                last_ame: "Wanjiru",
                organisation: "some-fake-org-id"
            };
            spyOn(AuthService, "getUser").and.returnValue(userData);
            scope.userProfile = {};

            controller();

            scope.userProfile.model = {
                first_name: "Vivian",
                id: "some-other-fake-id"
            };
            var error = new Error("Failed");

            var param = scope.userProfile.model.id;
            DS.expectUpdate("person", param).respond(error);

            spyOn(scope, "updateUser");

            scope.update();

            scope.$digest();
            DS.flush();

            expect(scope.alert).toEqual({
                msg: [{}],
                title : "Error",
                type: "danger"
            });
        });

        it("Should fail updating the 'me' resource",
            function () {

                var userData = {
                    organisation: "some-org-here",
                    password: "some-very-very-insecure-password"
                };
                spyOn(AuthService, "getUser").and.returnValue(userData);
                scope.userProfile = {};

                controller();

                var error = new Error("Failed");

                DS.expectUpdate("user", stateParams.userId).respond(error);

                scope.updateUser();

                scope.$digest();
                DS.flush();

                expect(scope.alert).toEqual({
                    msg: [{}],
                    title : "Error",
                    type: "danger"
                });
            });
    });
