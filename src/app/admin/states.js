(function (angular) {
    "use strict";

    angular.module("madeasy.admin.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function config($stateProvider) {
        $stateProvider
            .state("admin", {
                data: {
                    actions: "view.admin",
                    columns: [
                        {
                            "display": "Query",
                            "field": "query"
                        },
                        {
                            "display": "Response time",
                            "field": "response_time"
                        },
                        {
                            "display": "Correct",
                            "field": "is_correct"
                        },
                        {
                            "display": "Command",
                            "field": "command_executed"
                        }
                    ],
                    service: {
                        name: "parser"
                    }
                },
                ncyBreadcrumb: {
                    label: "admin"
                },
                parent: "base_state",

                url :"/admin",
                views: {
                    "content@": {
                        templateUrl: "admin/tpls/admin.tpl.html",
                        controller: "madeasy.admin.controllers.parserAdmin"
                    },
                    "indexsidebar@": {
                        templateUrl: "admin/tpls/parser_sidebar.tpl.html"
                    }
                }
            }).state("admin.parser_correctness", {
                data: {
                    actions: "view.admin"
                },
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
            }).state("admin.parser_command_type", {
                data: {
                    actions: "view.admin"
                },
                ncyBreadcrumb: {
                    label: "parser command type"
                },
                url :"/parser_command_type",
                views: {
                    "content@": {
                        templateUrl: "admin/tpls/parser_command_type.tpl.html",
                        controller: "madeasy.admin.parserCommandType"
                    },
                    "indexsidebar@": {
                        templateUrl: "admin/tpls/parser_sidebar.tpl.html"
                    }
                }
            }).state("admin.parser_response_day", {
                data: {
                    actions: "view.admin"
                },
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
