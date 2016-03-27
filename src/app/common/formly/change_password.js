(function (angular) {
    "use strict";

    angular.module("madeasy.common.formly.change_password", [])

    .factory("madeasy.common.formly.change_password", [function () {
        /*
        *   Defining forms fields this way(other than puting them in a JSON file)
        *   enables us to take advantage of the full power of angular-formly
        *   and use it's validation that is easily implemented using JS
        */
        var getFields = function () {
            var fields = [
                {
                    "key": "old_password",
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-lock"
                        },
                        "label": "Old password",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input"
                },
                {
                    "key": "new_password1",
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-lock"
                        },
                        "label": "New password",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input"
                },
                {
                    "expressionProperties": {
                        "templateOptions.pwCheckerVal": "model.new_password1"
                    },
                    "extras": {
                        "validateOnModelChange": true
                    },
                    "key": "new_password2",
                    "ngModelAttrs": {
                        "pwCheckerVal": {
                            "attribute": "sil-pw-checker"
                        }
                    },
                    "templateOptions": {
                        "addonLeft": {
                            "class": "fa fa-lock"
                        },
                        "label": "Confirm password",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input",
                    "validation": {
                        "password-match": true
                    }
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }]);
})(angular);
