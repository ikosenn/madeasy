(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.controllers.combobox", [
        "madeasy.common.services",
        "madeasy.resources.auth.user"
    ])

    .controller("madeasy.common.comboboxController", [
        "$scope", "DS", "$sce", "errorMessage",
        function ($scope, DS, $sce, alerts) {
            $scope.trustAsHtml = function (value) {
                return $sce.trustAsHtml(value);
            };
            if (_.isUndefined($scope.to.optionsResource)) {
                return;
            }
            var resourceName = $scope.to.optionsResource;
            $scope.to.options = [];

            $scope.refreshResults = function (value) {
                /*
                *   This method uses the fulltext search to allow searching
                *   for records that are not displayed in the combobox but
                *   are present in the API
                */
                var params = {
                    search: value
                };
                activate();

                function activate() {
                    //For searches
                    DS.findAll(resourceName, params).then(function (data) {
                        $scope.to.options = data;
                    }, function (err) {
                        $scope.alert = alerts.showError(
                            err, "Failed to Load Resource");
                    });
                }
            };

            activate();

            function activate() {
                //Shows 30 records
                return DS.findAll(resourceName).then(function (data) {
                    $scope.to.options = data;
                    return $scope.to.options;
                }, function (err) {
                    $scope.alert = alerts.showError(
                        err, "Failed to Load Resource");
                });
            }
        }
    ]);
})(angular, _);
