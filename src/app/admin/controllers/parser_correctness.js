(function(angular) {
    "use strict";
     angular.module("madeasy.admin.controllers.parserCorrectness", [
         "sil.datalayer",
         "madeasy.common.errorMessages"
     ])

     .controller("madeasy.admin.parserCorrectness", ParserCorrectness);
        ParserCorrectness.$inject = ["$scope", "silDataLayer", "errorMessage"];
        function ParserCorrectness($scope, silDataLayer, errs) {
            $scope.labels = ["Correct", "Wrong"];

            var success_fxn = function (data) {
                $scope.data = [data.data.positive, data.data.negative];
            };

            var error_fxn = function (error) {
                $scope.alert = errs.showError(error, "Error");
            };
            silDataLayer.list("parser_correctness")
                .then(success_fxn, error_fxn);

        }
})(window.angular);
