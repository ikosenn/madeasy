(function(angular) {
    "use strict";

     angular.module("madeasy.admin.controllers.parserAdmin", [
         "sil.datalayer",
         "madeasy.common.errorMessages"
     ])

     .controller("madeasy.admin.controllers.parserAdmin", ParserAdmin );
        ParserAdmin.$inject = ["$scope", "silDataLayer", "errorMessage"];
        function ParserAdmin ($scope, silDataLayer, errs) {

            var success_fxn = function (data) {
                $scope.parser = data.data;
            };

            var error_fxn = function (error) {
                $scope.alert = errs.showError(error, "Error");
            };

            silDataLayer.list("parser_numbers")
                .then(success_fxn, error_fxn);


        }
})(window.angular);
