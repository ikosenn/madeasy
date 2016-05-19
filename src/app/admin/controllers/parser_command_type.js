(function(angular) {
    "use strict";
     angular.module("madeasy.admin.controllers.parserCommandType", [
         "sil.datalayer",
         "madeasy.common.errorMessages"
     ])

     .controller("madeasy.admin.parserCommandType", ParserCommandType);
        ParserCommandType.$inject = ["$scope", "silDataLayer", "errorMessage"];
        function ParserCommandType($scope, silDataLayer, errs) {
            $scope.labels = ["Book Command", "Show Command", "Unknown"];

            var success_fxn = function (data) {
                $scope.data = [data.data.book, data.data.show, data.data.unknown];
            };

            var error_fxn = function (error) {
                $scope.alert = errs.showError(error, "Error");
            };
            silDataLayer.list("parser_command_type")
                .then(success_fxn, error_fxn);

        }
})(window.angular);
