"use strict";

angular.module("madeasy.common.formly", [
    "formly",
    "formlyBootstrap",
    "ui.bootstrap"
])

.service("emr.common.formly.loadFormly", ["$templateCache",
    function ($templateCache) {
        var loadFormlyJSON = function (path) {

            var temp = $templateCache.get(path);
            var fields = JSON.parse(temp);
            return fields;
        };

        return {
            "loadFormlyJSON": loadFormlyJSON
        };
    }
])

.service("emr.common.formly.formlyConfig",
    ["formlyConfig", function (formlyConfig) {
        var attributes = [
            "date-disabled",
            "custom-class",
            "show-weeks",
            "starting-day",
            "init-date",
            "min-mode",
            "max-mode",
            "format-day",
            "format-month",
            "format-year",
            "format-day-header",
            "format-day-title",
            "format-month-title",
            "year-range",
            "shortcut-propagation",
            "datepicker-popup",
            "current-text",
            "close-text",
            "close-on-date-selection",
            "datepicker-append-to-body"
        ];

        var bindings = [
            "datepicker-mode",
            "min-date",
            "max-date"
        ];
        var camelize = function (string) {
            string = string.replace(/[\-_\s]+(.)?/g, function(match, chr) {
                return chr ? chr.toUpperCase() : "";
            });
            // Ensure 1st char is always lowercase
            return string.replace(/^([A-Z])?/, function(match, chr) {
                return chr ? chr.toLowerCase() : "";
            });
        };
        var ngModelAttrs = {};
        angular.forEach(attributes, function(attr) {
            ngModelAttrs[camelize(attr)] = {attribute: attr};
        });

        angular.forEach(bindings, function(binding) {
            ngModelAttrs[camelize(binding)] = {bound: binding};
        });

        var formlyConfigs = function () {
            formlyConfig.extras.
            errorExistsAndShouldBeVisibleExpression =
            "fc.$touched || form.$submitted";
        };

        var setType = function () {
            formlyConfig.setType([
                {
                    name: "datetimepicker",
                    templateUrl:"common/tpls/datetimepicker.tpl.html",
                    wrapper: ["bootstrapLabel", "bootstrapHasError"],
                    controller: "emr.common.datetimepicker"
                },
                {
                    name: "datepicker",
                    templateUrl:"common/tpls/datepicker.tpl.html",
                    wrapper: ["bootstrapLabel", "bootstrapHasError"],
                    controller: "emr.common.datepicker"
                },
                {
                    name: "timepicker",
                    templateUrl: "common/tpls/timepicker.tpl.html",
                    wrapper: ["bootstrapLabel", "bootstrapHasError"],
                    controller: "emr.common.timepicker"
                },
                {
                    name: "combobox",
                    templateUrl: "common/tpls/combobox.tpl.html",
                    controller: "emr.common.comboboxController",
                    wrapper: ["bootstrapLabel", "bootstrapHasError"]
                },
                {
                    name: "sildatepickerPract",
                    template: "<ng-bs3-datepicker language='en'" +
                        "date-format='YYYY-MM-DD' id='startDate'/>",
                    wrapper: ["bootstrapLabel", "bootstrapHasError"]
                },
                {
                    name: "multiListSelect",
                    template: "<multiple-list-select " +
                        "listeditems='form[options.key]' " +
                        "assigneditems='model[options.key]'>" +
                        "</multiple-list-select>",
                    wrapper: ["bootstrapLabel", "bootstrapHasError"]
                },
                {
                    name: "switch",
                    templateUrl: "common/tpls/switch.tpl.html"
                },

                // Formly custom template for horizontal forms
                {
                    name: "horizontalInput",
                    extends: "input",
                    wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"]
                },
                {
                    name: "horizontalCheckbox",
                    extends: "checkbox",
                    wrapper: ["horizontalBootstrapCheckbox",
                            "bootstrapHasError"]
                },
                {
                    name: "horizontalCombobox",
                    extends: "combobox",
                    wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"]
                },
                {
                    name: "horizontalDatepicker",
                    extends: "datepicker",
                    wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"]
                },
                {
                    name: "horizontalTimepicker",
                    extends: "timepicker",
                    wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"]
                },
                // repeating section
                {
                    name: "repeatSection",
                    templateUrl: "common/tpls/repeating-section.tpl.html",
                    controller: "emr.formly.repeatingSection",
                    wrapper: ["bootstrapLabel", "bootstrapHasError"]
                }
            ]);
        };
        var setWrapper = function () {
            formlyConfig.setWrapper([{
                template: [
                    "<div class='formly-template-wrapper form-group'",
                    "ng-class='{\"has-error\":",
                    " options.validation.errorExistsAndShouldBeVisible}'>",
                    "<formly-transclude></formly-transclude>",
                    "<div class='validation form-error'",
                    "ng-if='options.validation.errorExistsAndShouldBeVisible'",
                    "ng-messages='options.formControl.$error'>",
                    "<div",
                    "ng-messages-include='common/tpls/validation.tpl.html'>",
                    "</div>",
                    "<div ng-message='{{::name}} '",
                    "ng-repeat='(name, message)",
                    " in ::options.validation.messages' ",
                    "class='text-danger form-error-text'>",
                    "{{message(options.formControl.$viewValue,",
                    " options.formControl.$modelValue, this)}}",
                    "</div>",
                    "</div>",
                    "</div>"
                ].join(" "),
                types: ["input", "textarea","timepicker","select",
                "checkbox-inline","radio-inline", "combobox", "horizontalInput",
                "horizontalCheckbox", "horizontalCombobox",
                "horizontalDatepicker",
                "datetimepicker", "repeatSection"
                ]
            },
            {
                name: "horizontalBootstrapLabel",
                template: [
                    "<label for='{{::id}}' class='sil-col-3 control-label'>",
                    "{{to.label}} {{to.required ? '*' : ''}}",
                    "</label>",
                    "<div class='sil-col-8'>",
                    "<formly-transclude></formly-transclude>",
                    "</div>"
                ].join(" ")
            },
            {
                name: "horizontalBootstrapCheckbox",
                template: [
                    "<div class='sil-col-offset-2 sil-col-8'>",
                    "<formly-transclude></formly-transclude>",
                    "</div>"
                ].join(" ")
            }
            ]);
        };

        return {
            "setWrapper": setWrapper,
            "formlyConfigs":formlyConfigs,
            "setType": setType,
            "camelize": camelize
        };
    }
]);
