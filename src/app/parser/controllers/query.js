(function (angular) {
    "use strict";

    angular.module("madeasy.parser.controllers.query",[
        "sil.datalayer",
        "madeasy.parser.formly.query",
        "madeasy.common.errorMessages"
    ])

    .controller("madeasy.parser.controllers.query", Query);
    Query.$inject = [
        "$scope", "silDataLayer", "$state",
        "madeasy.parser.formly.query", "errorMessage"
    ];
    function Query ($scope, silDataLayer, $state, formlyService, errs) {
        $scope.fields = formlyService.getFields();
        $scope.submitQuery = function () {
            var error_fxn = function (error) {
                console.log(error);
                $scope.alert = errs.showError(error, "Error");
            };

            var success_fxn = function (data) {
                console.log(data);
                //$state.go("auth_login", {reset_password: true});
            };

            if ($scope.queryForm.$valid) {
                console.log($scope.parser);
                silDataLayer.create("parse_query", $scope.parser)
                    .then(success_fxn, error_fxn);
            }
            else {
                var data = {
                    "data": {
                        "error": "Please correct the" +
                        " errors on the form."
                    }
                };
                error_fxn(data);
            }
        };
    }
})(window.angular);
