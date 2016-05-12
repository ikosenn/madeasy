(function library (angular) {
    "use strict";

    angular.module("madeasy.auth.formly.signup", [])

    .factory("madeasy.auth.formly.signup", Signup);
    function Signup () {
        var getFields = function () {
            var fields = [
                {
                    "key": "first_name",
                    "templateOptions": {
                        "label": "First name",
                        "reqValidationMsg": "Please fill in you first name",
                        "required": true,
                        "type": "text"
                    },
                    "type": "input"
                },
                {
                    "key": "last_name",
                    "templateOptions": {
                        "label": "Last name",
                        "reqValidationMsg": "Please fill in you last name",
                        "required": true,
                        "type": "text"
                    },
                    "type": "input"
                },
                {
                    "key": "email",
                    "templateOptions": {
                        "emailValidationMsg": "Please provide a valid" +
                        " email address",
                        "label": "Email",
                        "reqValidationMsg": "Please provide an email" +
                        " address here",
                        "required": true,
                        "type": "email"
                    },
                    "type": "input"
                },
                {
                    "key": "password",
                    "templateOptions": {
                        "label": "Password",
                        "reqValidationMsg": "Please provide a password here",
                        "required": true,
                        "type": "password"
                    },
                    "type": "input"
                }
            ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }
})(window.angular);
