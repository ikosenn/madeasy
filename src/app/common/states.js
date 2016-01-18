"use strict";

angular.module("madeasy.common.states", ["ui.router"])

.config(function config($stateProvider) {
    $stateProvider
        .state("home", {
            url: "/",
            views: {
                "main@": {
                    templateUrl: "common/tpls/content.tpl.html",
                    controller:"madeasy.common.controller.home"
                }
            }
        });
});
