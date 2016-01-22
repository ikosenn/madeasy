"use strict";

angular.module("madeasy.common.services.formly.auth.login", [])

.service("madeasy.common.services.auth.login", [function () {
    /*
    *   Defining forms fields this way(other than puting them in a JSON file)
    *   enables us to take advantage of the full power of angular-formly
    *   and use it's validation that is easily implemented using JS
    */
    var getFields = function () {
        var fields = [
            {
                "fieldGroup": [
                    {
                        "type": "input",
                        "key": "username",
                        "templateOptions": {
                            "label": "Email",
                            "required": true,
                            "type": "email",
                            "reqValidationMsg": "Please provide an email" +
                            " address here",
                            "emailValidationMsg": "Please provide a valid" +
                            " email address",
                            "addonLeft": {
                                "class": "fa fa-envelope"
                            }
                        }
                    }
                ]
            },

            {
                "fieldGroup": [
                    {
                        "type": "input",
                        "key": "password",
                        "templateOptions": {
                            "label": "Password",
                            "type": "password",
                            "required": true,
                            "reqValidationMsg": "Please provide a password",
                            "addonLeft": {
                                "class": "fa fa-lock"
                            }
                        }
                    }
                ]
            }
        ];
        return fields;
    };

    return {
        "getFields": getFields
    };
}]);
