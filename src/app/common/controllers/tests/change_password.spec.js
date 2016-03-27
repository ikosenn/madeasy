"use strict";
describe("Tests: madeasy.common.controllers.changePass", function () {
    var scope, AuthService, state, httpBackend, loadFormly;
    var createController, cUrl;

    beforeEach(function () {
        module("madeasy.config");
        module("madeasy.common.controllers.changePass");
        module("madeasy.auth.services");
        module("madeasy.common.formly.change_password");

        inject(["$rootScope", "$state", "madeasy.auth.services.login",
        "madeasy.common.formly.change_password", "$controller",
        "PASSWORD_CHANGE", "$httpBackend",
            function ($rootScope, $state, auth, _loadFormly_, $controller,
                changeUrl, _httpBackend_) {
                scope = $rootScope.$new();
                loadFormly = _loadFormly_;
                AuthService = auth;
                state = $state;
                cUrl = changeUrl;
                httpBackend = _httpBackend_;
                var data = {
                    $scope : scope,
                    $state : $state,
                    "madeasy.auth.services.login" : AuthService,
                    "madeasy.common.services.common.change_password":
                    loadFormly
                };

                createController = function () {
                    var ctrl =
                    $controller("madeasy.common.controllers.changePassword",data);
                    return ctrl;
                };
            }]);
    });
    it("should successfully send password details", function () {
        spyOn(state,"go");
        spyOn(AuthService, "logout");
        httpBackend.expectPOST(cUrl).respond(200, {});
        createController();
        scope.changePasswordForm = {};
        scope.changePasswordForm.$valid = true;
        scope.changePasswordForm.model = {
            "new_password1": "new",
            "new_password2": "new",
            "old_password": "old"
        };
        scope.changePassword();
        httpBackend.flush();
        expect(state.go).toHaveBeenCalled();
        expect(AuthService.logout).toHaveBeenCalled();

    });
    it("should send password details but return a failure", function () {
        spyOn(state,"go");
        spyOn(AuthService, "logout");
        httpBackend.expectPOST(cUrl).respond(400, new Error());
        createController();
        scope.changePasswordForm = {};
        scope.changePasswordForm.$valid = true;
        scope.changePasswordForm.model = {
            "new_password1": "new",
            "new_password2": "new",
            "old_password": "old"
        };
        scope.changePassword();
        httpBackend.flush();
        expect(scope.alert.msg[0].Error).not.toEqual("");

    });
    it("should fail to validate form", function () {
        scope.changePasswordForm = {};
        createController();

        scope.changePasswordForm.$valid = false;
        scope.changePassword();
        var err = "Please correct the" +
        " errors on the form to change your password";
        expect(scope.alert.msg[0].Error).toEqual(err);
    });
});
