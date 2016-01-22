"use strict";

angular.module("madeasy.common.controllers.errorPage", [])

.controller("madeasy.common.controllers.errorPage",
    ["$stateParams", "$scope", function ($stateParams, $scope) {
        $scope.params = $stateParams;
    }]);
