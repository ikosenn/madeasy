(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.rowLevelAction", [])

    .directive("silRowLevelAction", ["$compile", function ($compile) {
        return {
            link: function (scope, element) {
                var link_to_html = function (link) {
                    return "<button " + link.actions +
                        " id='table-action-buttons' " +
                        " class='sil-table-btn " +
                        " btn-" + link.class + "'" +
                        " >" + link.label + "</button>";
                };

                var html = _.reduce(scope.rowLevelActionsList, function (memo, val) {
                    return memo + link_to_html(val);
                }, "");
                element.html(html);
                $compile(element)(scope);
            },
            replace: true,
            restrict: "E",
            scope: {
                "item": "=",
                "rowLevelActionsList": "="
            },
            template: "<td></td>"
        };
    }]);
})(angular);
