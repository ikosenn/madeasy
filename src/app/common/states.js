"use strict";

angular.module("madeasy.common.routes", [
    "ui.router"
])

.config(function config($stateProvider) {
    $stateProvider
        .state("base_state", {
            views: {
                "indexheader@":{
                    templateUrl: "common/tpls/header.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "EMR"
            }
        })
        .state("profile", {
            url :"/profile/:userId",
            parent: "base_state",
            views: {
                "content@":{
                    templateUrl: "common/tpls/user-detail.tpl.html",
                    controller: "emr.common.controllers.user_profile"
                },
                "pageactions@":{
                    templateUrl:"common/tpls/pageactions/" +
                                "common-user-actions.tpl.html"
                },
                "indexsidebar@" : {
                    templateUrl: "common/tpls/sidebars/" +
                                 "user-sidebar.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "User Profile"
            }
        })
        .state("change_password", {
            url :"/",
            parent: "base_state",
            views: {
                "content@":{
                    templateUrl: "common/tpls/main.tpl.html"
                }
            },
            ncyBreadcrumb: {
                label: "Change Password"
            }
        }).state("auth_403", {
            url: "/403/?initial_pwd&no_organisation",
            parent: "base_state",
            views:{
                "content@":{
                    templateUrl: "common/tpls/403.tpl.html",
                    controller: "emr.common.controllers.errorPage"
                }
            }
        });
});
