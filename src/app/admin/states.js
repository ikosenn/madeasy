(function (angular) {
    "use strict";

    angular.module("madeasy.admin.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function config($stateProvider) {
        $stateProvider
            .state("admin", {
                ncyBreadcrumb: {
                    label: "admin"
                },
                parent: "base_state",
                redirectTo: "admin.parser_correctness",
                url :"/admin",
                views: {
                    "content@": {
                        templateUrl: "admin/tpls/admin.tpl.html"
                    }
                }
            }).state("admin.parser_correctness", {
                ncyBreadcrumb: {
                    label: "parser correctness"
                },
                url :"/parser_correctness",
                views: {
                    "content@": {
                        templateUrl: "admin/tpls/parser_correctness.tpl.html",
                        controller: "madeasy.admin.parserCorrectness"
                    },
                    "indexsidebar@": {
                        templateUrl: "admin/tpls/parser_sidebar.tpl.html"
                    }
                }
            }).state("admin.parser_response_day", {
                ncyBreadcrumb: {
                    label: "parser response  day"
                },
                url :"/parser_response_day",
                views: {
                    "content@": {
                        templateUrl: "admin/tpls/parser_response_day.tpl.html",
                        controller: "madeasy.admin.parserResponseDay"
                    },
                    "indexsidebar@": {
                        templateUrl: "admin/tpls/parser_sidebar.tpl.html"
                    }
                }
            });
    }]);
})(window.angular);
