(function (angular) {
    "use strict";

    angular.module("madeasy.common.formly.user", [])

    .factory("madeasy.common.formly.user", [function () {
        /*
        *   Defining forms fields this way(other than puting them in a JSON file)
        *   enables us to take advantage of the full power of angular-formly
        *   and use it's validation that is easily implemented using JS
        */
        var getFields = function () {
            var fields = [
                    {
                        "key": "email",
                        "templateOptions": {
                            "emailValidationMsg": "Please provide a valid" +
                            " email address",
                            "label": "E-mail Address",
                            "reqValidationMsg": "Please provide an email" +
                            " address here",
                            "required": true,
                            "type": "text"
                        },
                        "type": "input"
                    },
                    {
                        "key": "person_details.first_name",
                        "templateOptions": {
                            "label": "First Name",
                            "reqValidationMsg": "Please provide the User's" +
                            " First Name",
                            "required": true,
                            "type": "text"
                        },
                        "type": "input"
                    },
                    {

                        "key": "person_details.last_name",
                        "templateOptions": {
                            "label": "Last Name",
                            "reqValidationMsg": "Please provide the User's" +
                            " Last Name",
                            "required": true,
                            "type": "text"
                        },
                        "type": "input"
                    }
                ];
            return fields;
        };

        return {
            "getFields": getFields
        };
    }]);
})(angular);
