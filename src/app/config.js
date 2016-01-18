"use strict";

angular.module("madeasy.config", ["ui.router"])

.config(["$urlRouterProvider", function (r) {
    r.otherwise("/");
}])

.config(["$locationProvider", function (l) {
    l.html5Mode(true);
}]);
