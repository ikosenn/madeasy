(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.sil_delete", [])

    .directive("silDelete", [function () {
        /**
        *   This directive creates a way to allow for "deletion" of data in list
        *   views(grids) e.g the triage grid. The directive makes use of the
        *   3rd party ngSweetAlert directive that allows for the confirmation of
        *   an initiated "delete".
        *
        *   The user(developer) supplies the endPoint, index(on the grid) and
        *   the ID of the item to be "deleted" and everything else is taken
        *   care of. i.e "delete" is toggled to true while "active" is toggled
        *   to false in the backend.
        *
        *   Usage:
        *   <sil-delete resource="resource" index="0"
        *       detailID="some-uuid"></sil-delete>
        */
        return {
            controller: "madeasy.common.controller.sil_delete",
            replace: true,
            restrict: "E",
            scope: {
                index: "@",
                itemid: "@",
                model: "@",
                resource: "@",
                title: "@"
            },
            template: [
                "<span class='btn btn-sm btn-danger'",
                "ng-click='alert(index, itemid)'>",
                "<i class='fa fa-times'></i>",
                "{{title}}",
                "</span>"
            ].join(" ")
        };
    }]);
}) (angular);
