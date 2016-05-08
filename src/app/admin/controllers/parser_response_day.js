(function(angular) {
    "use strict";
     angular.module("madeasy.admin.controllers.parserResponseDay", [
         "sil.datalayer",
         "madeasy.common.errorMessages"
     ])

     .controller("madeasy.admin.parserResponseDay", ParserCorrectness);
        ParserCorrectness.$inject = ["$scope", "silDataLayer", "errorMessage"];
        function ParserCorrectness($scope, silDataLayer, errs) {

            var success_fxn = function (data) {
                var results = data.data;
                $scope.data = [];
                $scope.labels = [];
                var resTime = [];
                $scope.series = ["Response time(day)"];
                for (var i=0; i < results.length; i++) {
                    resTime.push(results[i].average_res_time);
                    $scope.labels.push(results[i].created);
                }
                $scope.data.push(resTime);
            };

            var error_fxn = function (error) {
                $scope.alert = errs.showError(error, "Error");
            };
            silDataLayer.list("parser_response_day")
                .then(success_fxn, error_fxn);

        }
})(window.angular);
