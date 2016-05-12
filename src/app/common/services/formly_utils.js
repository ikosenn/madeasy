(function (angular) {
    "use strict";

    angular.module("madeasy.common.formlyUtils", [
        "formly",
        "formlyBootstrap",
        "ui.bootstrap",
        "madeasy.common.components.micCheck"
    ])

    .service("madeasy.common.formly.formlyConfig",
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
                        controller: "madeasy.common.datetimepicker",
                        name: "datetimepicker",
                        templateUrl:"common/tpls/datetimepicker.tpl.html",
                        wrapper: ["bootstrapLabel", "bootstrapHasError"]
                    },
                    {
                        name: "datepicker",
                        templateUrl:"common/tpls/datepicker.tpl.html",
                        wrapper: ["bootstrapLabel", "bootstrapHasError"]
                    },
                    {
                        name: "timepicker",
                        templateUrl: "common/tpls/timepicker.tpl.html",
                        wrapper: ["bootstrapLabel", "bootstrapHasError"]
                    },
                    {
                        controller: "madeasy.common.comboboxController",
                        name: "combobox",
                        templateUrl: "common/tpls/combobox.tpl.html",
                        wrapper: ["bootstrapLabel", "bootstrapHasError"]
                    },
                    {

                        name: "voice-input",
                        template: `
                            <mic-check formly-model="model[options.key]">
                            </mic-check>`
                        ,
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
                        template: "<sil-multiple-list-select " +
                            "listeditems='form[options.key]' " +
                            "assigneditems='model[options.key]'>" +
                            "</sil-multiple-list-select>",
                        wrapper: ["bootstrapLabel", "bootstrapHasError"]
                    },
                    {
                        name: "switch",
                        template: [
                            "<div><toggle-switch ng-model='model[options.key]'",
                            "on-label='{{to.onLabel}}'",
                            " off-label='{{to.offLabel}}'>",
                        "<toggle-switch></div>"].join(" "),
                        wrapper: ["bootstrapLabel", "bootstrapHasError"]
                    },

                    // Formly custom template for horizontal forms
                    {
                        extends: "input",
                        name: "horizontalInput",
                        wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"]
                    },
                    {
                        extends: "checkbox",
                        name: "horizontalCheckbox",
                        wrapper: ["horizontalBootstrapCheckbox", "bootstrapHasError"]
                    },
                    {
                        extends: "combobox",
                        name: "horizontalCombobox",
                        wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"]
                    },
                    {
                        extends: "datepicker",
                        name: "horizontalDatepicker",
                        wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"]
                    },
                    {
                        extends: "timepicker",
                        name: "horizontalTimepicker",
                        wrapper: ["horizontalBootstrapLabel", "bootstrapHasError"]
                    },
                    // Repeating section
                    {
                        controller: "madeasy.formly.repeatingSection",
                        name: "repeatSection",
                        templateUrl: "common/tpls/repeating_section.tpl.html",
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
                        "<div class='sil-col-9'>",
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
                "camelize": camelize,
                "formlyConfigs":formlyConfigs,
                "setType": setType,
                "setWrapper": setWrapper
            };
        }
    ]);
})(angular);
