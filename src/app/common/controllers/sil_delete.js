(function (angular) {
    "use strict";

    angular.module("madeasy.common.controllers.sil_delete", [])

    .controller("madeasy.common.controller.sil_delete", [
        "$scope", "errorMessage", "SweetAlert", "$injector",
        function ($scope, alert, SweetAlert, $injector) {

            $scope.deleteItem = function (index, id) {
                var resource = $injector.get($scope.resource);
                var model = $scope.model;
                var updateItem = {
                    active: false,
                    deleted: true
                };
                var method = {
                    method: "PATCH"
                };
                resource.update(id, updateItem, method).then(function () {
                    model.splice(index, 1);
                }, function (err) {
                    $scope.alert = alert.showError(err, "Delete Failed");
                });
            };

            $scope.message_config = {
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Delete",
                showCancelButton: true,
                title: "Are you sure you want to delete?",
                type: "error"
            };

            $scope.dismissResponse = function(isConfirm) {
                var id = $scope.toDelete.id;
                var index = $scope.toDelete.index;
                if (isConfirm) {
                    $scope.deleteItem(index, id);
                    SweetAlert.swal("Deletetion complete.",
                    "Entry has been deleted.", "success");
                } else {
                    SweetAlert.swal("Cancelled", "Error");
                }
            };

            $scope.dismissAlert = function(index, id) {
                $scope.toDelete = {
                    "id": id,
                    "index": index
                };
                return $scope.dismissResponse;
            };
            $scope.alert = function(index, id) {
                SweetAlert.swal($scope.message_config,
                $scope.dismissAlert(index, id)
                );
            };

        }]);
}) (angular);
