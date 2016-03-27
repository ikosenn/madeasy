(function (angular) {
    "use strict";

    angular.module("madeasy.config", [
        "js-data",
        "ui.router",
        "formly",
        "madeasy.auth",
        "ui.select",
        "madeasy.resources.common.jsDataUtils",
        "madeasy.resources.common.deserialize_drf",
        "angular-loading-bar",
        "madeasy.common.formlyUtils"
    ])
    /** Contains the available homepages that a user can be redirected to.
     *  the list is also in order of preference whereby if a user is found
     *  to have actions for a particular page then the checking stops and
     *  the are redirected to that page
     */

    .constant("PAGINATION_COUNT", 30)
    .constant("SERVER_URL", window.MADEASY_SETTINGS.SERVER_URL)
    .constant("CREDZ", window.MADEASY_SETTINGS.CREDZ)
    .constant("USER_INFO_URL", window.MADEASY_SETTINGS.AUTH.USER_INFO_URL)

    .constant("ACTIONS.RESTRICT", window.MADEASY_SETTINGS.ACTIONS.RESTRICT)
    .constant("ACTIONS.CHECKERS", [
        "madeasy.actions.actionChecker",
        "madeasy.authorization.actionChecker"
    ])
    .constant("PAGE.CHECKERS", [
        "madeasy.authentication.pageUserRequired",
        "madeasy.actions.pageActions"
    ])

    .config(["$logProvider", function ($logProvider) {
        /**
         * Check the value of `DEBUG`, expects either true or false.
         *
         * Development: `settings.js`
         * Production: `madeasy_staging.settings.js`
         */
        $logProvider.debugEnabled(window.MADEASY_SETTINGS.DEBUG);

    }])

    .config(["formlyConfigProvider", function (formlyConfigProvider) {
        // Set flag to the opposite value of DEBUG,
        // i.e. if `true` it will be `false`
        var flag = !window.MADEASY_SETTINGS.DEBUG;

        // Disable formly warnings in prod and enable in dev
        formlyConfigProvider.disableWarnings = flag;

        // Disable apiCheck warnings in prod and enable in dev
        // apiCheck is a global variable use window to access it
        window.apiCheck.globalConfig.disabled = flag;
    }])

    .config(["$urlRouterProvider", function($urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
    }])

    .config(["$locationProvider", function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])

    .config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
        $httpProvider.defaults.xsrfCookieName = "csrftoken";
        $httpProvider.defaults.headers.common = {
            "Accept": "application/json, */*",
            "Content-Type": "application/json"
        };
        $httpProvider.interceptors.push(
            "madeasy.networking.interceptors.http");
        $httpProvider.interceptors.push(
            "madeasy.networking.interceptors.httpactivity");
        $httpProvider.interceptors.push(
            "madeasy.networking.interceptors.connection");

    }])

    .run(["madeasy.resource.deserializeDRF", "DSHttpAdapter", "SERVER_URL",
        function (desDrf, httpAdapter, SERVER_URL) {
            httpAdapter.defaults.deserialize = desDrf.deserializeFunc;
            httpAdapter.defaults.basePath = SERVER_URL;
            httpAdapter.defaults.forceTrailingSlash = true;
        }
    ])

    .run(["madeasy.actions.pageChecker", function (pageChecker) {
            pageChecker.startListening();
        }
    ])

    .run(["madeasy.common.formly.formlyConfig", function (formlyConfig) {
        formlyConfig.formlyConfigs();
        formlyConfig.setType();
        formlyConfig.setWrapper();
    }])

    .run(["formlyValidationMessages", function (formlyValidationMessages) {
        formlyValidationMessages.addTemplateOptionValueMessage(
            "required", "reqValidationMsg", "", "", "Value Required");
        formlyValidationMessages.addTemplateOptionValueMessage(
            "email", "emailValidationMsg", "", "", "Valid Email Required");
        formlyValidationMessages.addTemplateOptionValueMessage(
            "minlength", "minlengthValidationMsg", "", "", "Too Short");
        formlyValidationMessages.addTemplateOptionValueMessage(
            "maxlength", "maxlengthValidationMsg", "", "", "Too Long");
    }])

    .run(["api.oauth2",function (oauth2) {
        oauth2.setXHRToken(oauth2.getToken());
    }]);
})(angular, _);
