(function (angular) {
    "use strict";

    angular.module("madeasy.common.controllers.formlyRepeatingSection", [])

    .controller("madeasy.formly.repeatingSection", [
        "$scope", function ($scope) {
            var unique = 1;
            $scope.randomNumber = 1;
            $scope.formOptions = {
                formState: $scope.formState
            };

            var addRandomIds = function (fields) {
                unique++;
                angular.forEach(fields, function(field, index) {
                    if (field.fieldGroup) {
                        addRandomIds(field.fieldGroup);
                        // FieldGroups don't need an ID
                        return;
                    }
                    if (field.templateOptions && field.templateOptions.fields) {
                        addRandomIds(field.templateOptions.fields);
                    }
                    field.id = field.id || (field.key + "_" + index + "_" + unique);
                });
            };

            $scope.copyFields = function (fields) {
                fields = angular.copy(fields);
                addRandomIds(fields);
                return fields;
            };

            $scope.addNew = function () {
                $scope.model[$scope.options.key] =
                $scope.model[$scope.options.key] || [];
                var repeatsection = $scope.model[$scope.options.key];
                var lastSection = repeatsection[
                    repeatsection.length - 1];
                var newsection = {};
                if (lastSection) {
                    newsection = angular.copy(lastSection);
                }
                repeatsection.push(newsection);
                $scope.repeatingSection = repeatsection;
            };

        }
    ]);
})(angular);
