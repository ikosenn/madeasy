(function (angular) {
    "use strict";

    angular.module("madeasy.common.routes", [
        "ui.router"
    ])

    .config(function config($stateProvider) {
        $stateProvider
            .state("base_state", {
                ncyBreadcrumb: {
                    label: "madeasy"
                },
                views: {
                    "indexheader@":{
                        templateUrl: "layout/tpls/header.tpl.html"
                    }
                }
            })
            .state("profile", {
                ncyBreadcrumb: {
                    label: "User Profile"
                },
                parent: "base_state",
                url :"/profile/:userId",
                views: {
                    "content@":{
                        controller: "madeasy.common.controllers.user_profile",
                        templateUrl: "common/tpls/user_detail.tpl.html"
                    },
                    "indexsidebar@" : {
                        templateUrl: "common/tpls/sidebars/" +
                                     "user_sidebar.tpl.html"
                    },
                    "pageactions@":{
                        templateUrl:"common/tpls/pageactions/" +
                                    "common_user_actions.tpl.html"
                    }
                }
            })
            .state("change_password", {
                data: {
                    actions: "edit.profile"
                },
                ncyBreadcrumb: {
                    label: "Change Password"
                },
                parent: "base_state",
                url :"/profile/password/change",
                views: {
                    "content@":{
                        controller: "madeasy.common.controllers.changePassword",
                        templateUrl: "common/tpls/change_password.tpl.html"
                    },
                    "indexsidebar@" : {
                        templateUrl: "common/tpls/sidebars/" +
                                     "user_sidebar.tpl.html"
                    },
                    "pageactions@":{
                        templateUrl:"common/tpls/pageactions/" +
                                    "common_user_actions.tpl.html"
                    }
                }
            })
            .state("auth_403", {
                // Allows user to view state with  no organisation
                // and when `is_initial` is true
                data: {
                    showErrorPage: false
                },
                ncyBreadcrumb: {
                    label: "Error Page"
                },
                parent: "base_state",
                url: "/403/?initial_pwd&no_organisation",
                views:{
                    "content@":{
                        controller: "madeasy.common.controllers.errorPage",
                        templateUrl: "layout/tpls/403.tpl.html"
                    }
                }
            });
    });
})(angular);
