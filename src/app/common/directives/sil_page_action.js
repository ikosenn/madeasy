(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.pageAction", [])

    .directive("silPageAction", ["$compile", function ($compile) {
        return {
            link: function (scope, elem, attrs) {
                var args = {
                    "actionName": attrs.actionName,
                    "buttonClass": attrs.buttonClass,
                    "icon": attrs.icon,
                    "uiSref": attrs.uiSref
                };
                var tpl = `
                    <button class="btn btn-{{spa.buttonClass}} btn-sm"
                        ui-sref="{{spa.uiSref}}">
                        <i class="fa fa-{{spa.icon}}"></i>&nbsp;{{spa.actionName}}
                    </button>
                `;
                scope.spa = args;
                elem.append(tpl);
                $compile(elem.contents())(scope);
            },
            replace: true,
            restrict: "E",
            template: `<div></div>`
        };
    }]);
})(angular);
