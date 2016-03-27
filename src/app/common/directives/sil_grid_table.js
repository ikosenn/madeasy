(function (angular) {
    "use strict";

    var GRID_TABLE_TPL = "sil.grid.table.tpl.html";

    angular.module("madeasy.common.directives.gridTable", [
        GRID_TABLE_TPL
    ])

    .directive("silGridTable", function() {
        return {
            restrict: "E",
            scope: {
                "columns": "=",
                "filter": "=",
                "getData": "=",
                "list": "=",
                "metadata": "=",
                "paginator": "=",
                "resource": "=",
                "rowLevelActionsList": "=",
                "search": "=",
                "sorter": "="
            },
            templateUrl: GRID_TABLE_TPL
        };
    });
})(angular);
