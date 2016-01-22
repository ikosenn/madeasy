"use strict";

angular.module("madeasy.config", ["ui.router"])

.config(["$urlRouterProvider", function (r) {
    r.otherwise("/");
}])

.constant("USER_INFO_URL", window.MADEASY_SETTINGS.AUTH.USER_INFO_URL)
.constant("PRIVACY_POLICY_URL", window.MADEASY_SETTINGS.PRIVACY_POLICY_URL)
.constant("SERVER_URL", window.MADEASY_SETTINGS.SERVER_URL)
.constant("CREDZ", window.MADEASY_SETTINGS.CREDZ)
.constant("HOME_PAGE_NAME", window.MADEASY_SETTINGS.HOME_PAGE_NAME)

.config(["$locationProvider", function (l) {
    l.html5Mode(true);
}]);
