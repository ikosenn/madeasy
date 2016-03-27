(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.sidebarTitle", [])

    .directive("sidebarTitle", ["$compile", function ($compile) {
        return {
            link: function (scope, elem, attrs) {
                var icon = attrs.icon;
                var tpl;

                // Check if directive contains icon attribute
                if (!_.isUndefined(icon)) {
                    tpl = `
                        <span class="fa fa-{{icon}}"></span>
                    `;
                    scope.icon = icon;
                } else {
                    tpl = `
                        <span></span>
                    `;
                }

                elem.find("a").prepend(tpl);
                $compile(elem.contents())(scope);
            },
            replace: true,
            restrict: "E",
            scope: {
                icon: "@",
                sref: "@",
                title: "@"
            },
            template: `
                <li ui-sref-active="active">
                    <a ui-sref="{{sref}}">
                        <span class="sidebar-title">{{title}}</span>
                    </a>
                </li>
            `
        };
    }]);
})(angular);
