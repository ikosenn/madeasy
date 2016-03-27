(function (angular) {
    "use strict";

    angular.module("madeasy.common.controllers.errorPage", [
        "madeasy.auth.services"
    ])

    .controller("madeasy.common.controllers.errorPage",
        ["$stateParams", "$scope", "madeasy.auth.services.homePage", "$state",
        "$log",
        function ($stateParams, $scope, homePageServ, $state, $log) {
            $scope.params = $stateParams;
            $log.debug("Error page");
            $scope.goHome = function () {
                var homePage = homePageServ.determineHomePage();
                $state.go(homePage);
            };
        }]);
})(angular);
