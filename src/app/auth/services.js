"use strict";
angular.module("madeasy.auth.services",[
    "ui.router",
    "madeasy.config",
    "madeasy.auth.oauth2",
    "formly",
    "sil.alerts.service"
])

.service("madeasy.auth.services.login", ["$window", "$q", "api.oauth2","$http",
    "SERVER_URL","USER_INFO_URL",
    function ($window, $q, oauth2, $http, server_url, curUser) {

        var url = {
            curr_user : curUser
        };
        var store_key = "auth.user";
        var store_state = "state.dump";

        var storage = $window.localStorage;

        this.login = function (user) {
            return oauth2.fetchToken(user.username, user.password);
        };

        this.currentUser = function () {
            return $http.get(server_url + url.curr_user)
                .success(function (data) {
                    storage.setItem(store_key, JSON.stringify(data));
                });
        };

        this.getUser = function() {
            return JSON.parse(storage.getItem(store_key));
        };

        this.isLoggedIn = function () {
            var user = this.getUser();
            var has_token = oauth2.getToken();
            return (!_.isNull(user)) && (!_.isNull(has_token));
        };

        this.logout = function () {
            storage.removeItem(store_key);
            return oauth2.revokeToken(oauth2.getToken());
        };

        this.loadState = function () {
            var user = this.getUser();
            var dump = JSON.parse(storage.getItem(store_state));
            if (user && dump) {
                if (dump.user === user.id) {
                    return {
                        "name": dump.name,
                        "params": dump.params
                    };
                }
            }
            return null;
        };

        this.clearState = function () {
            return storage.removeItem(store_state);
        };

        this.dumpState = function (state, params) {
            var user = this.getUser();
            if (user) {
                var state_dump = {
                    "name": state.name,
                    "params": params,
                    "user": user.id
                };
                storage.setItem(store_state, JSON.stringify(state_dump));
            }
        };
    }
])

.service("madeasy.auth.services.loginFormValidations",
    ["formlyValidationMessages", function (formlyValidationMessages) {
        var setValidations = function () {

            function validateEmail($viewValue, $modelValue, scope) {
                var message;
                if (scope.options.key === "username" && scope.fc.$error.email) {
                    message = "Please fill in a valid E-mail Address";
                }

                return message;
            }

            function getRequiredMessage($viewValue, $modelValue, scope) {
                var message;
                if (scope.options.key === "username") {
                    message = "Please fill in an E-mail Address";
                }
                else if (scope.options.key === "password") {
                    message = "Please fill in a password";
                }

                else {
                    message = "This field is required";
                }
                return message;
            }

            formlyValidationMessages.messages.required = getRequiredMessage;
            formlyValidationMessages.messages.email = validateEmail;
        };
        return {"setValidations": setValidations};
    }
])

.service("madeasy.auth.error", ["$sce", "sil.transaction.alert",
    function ($sce, alertService) {
        // TODO: Use Musembis error handler and move
        // the status check -1 to the error handler
        var error_fxn = function (scope, data) {
            if (data.status === -1 || data.status === 0) {
                scope.login_err = "Sorry, a connection error occurred";
            }
            else {
                scope.login_err = data.data.error_description ||
                                   data.data.detail;
            }
            scope.login_err_html = $sce.trustAsHtml(scope.login_err);
            scope.alert = alertService
                .showErr(scope.login_err_html, "Error");
        };

        var success_fxn = function (scope, data) {
            scope.alert = alertService
                .showOk(data, "Success");
        };
        return {
            "error_fxn": error_fxn,
            "success_fxn": success_fxn
        };
    }
]);
