(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.alerts", [])

    .directive("silJsDataAlerts",[function () {
        /**
        *   This directive will handle unpacking errors and validations
        *   from the backend. JS Data returns validations as an array of objects or
        *   an array of strings. e.g [{k: v}, {k: v}, "validatio"].
        *
        *   Depending on how the errors are returned by the backend, some of the
        *   validations / errors may be put in an object leading to an array of
        *   objects within objects i.e [{k: {k: v}}].
        *   This directive is able to unpack such nested objects with the help
        *   of the error handler service (commmon/services/error_messages.js)
        */
        return {
            replace: true,
            restrict: "E",
            template: [
                "<div ng-if='alert' class='alert alert-{{alert.type}}",
                " fade in'>",
                "<button type='button' class='close' data-dismiss='alert'",
                " aria-hidden='true'>×</button>",
                "<div ng-if='alert.type == \"danger\"'>",
                "<span ng-repeat='(key, value) in alert.msg'>",
                "<ul ng-repeat='(k, v) in value'>",
                "<li>{{ k }}: {{ v }}</li>",
                "</ul>",
                "</span>",
                "</div>",
                "<div ng-if='alert.type == \"success\" || ",
                "alert.type == \"info\" || alert.type == \"warning\"'>",
                "<strong>{{alert.title}}</strong>: {{alert.msg}}",
                "</div>",
                "</div>"
            ].join(" ")
        };
    }]);
}) (angular);
