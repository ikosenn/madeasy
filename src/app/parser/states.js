(function (angular) {
    "use strict";

    angular.module("madeasy.parser.states", [
        "ui.router"
    ])

    .config(["$stateProvider", function config($stateProvider) {
        $stateProvider
            .state("home", {
                ncyBreadcrumb: {
                    label: "home"
                },
                parent: "base_state",
                url :"/",
                views: {
                    "content@":{
                        controller: "madeasy.parser.controllers.query",
                        templateUrl: "parser/tpls/home.tpl.html"
                    }
                }
            }).state("book", {
                ncyBreadcrumb: {
                    label: "book"
                },
                params: {
                    bookDetails: null
                },
                parent: "base_state",
                url :"/book",
                views: {
                    "content@":{
                        controller: "madeasy.parser.controllers.book",
                        templateUrl: "parser/tpls/book.tpl.html"
                    }
                }
            }).state("myFlights", {
                ncyBreadcrumb: {
                    label: "my flights"
                },
                params: {
                    flightDetails: null
                },
                parent: "base_state",
                url :"/my_flights",
                views: {
                    "content@":{
                        templateUrl: "parser/tpls/my_flights.tpl.html"
                    }
                }
            });
    }]);
})(angular);
