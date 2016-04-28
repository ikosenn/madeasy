(function library (angular) {
    "use strict";

    angular.module("madeasy.parser.formly.query", [])

    .factory("madeasy.parser.formly.query", Query);
    function Query () {

        function getFields () {
            var fields = [
                {
                    "key": "query",
                    "templateOptions": {
                        "addonRight": {
                            "class": "fa fa-search"
                        },
                        "reqValidationMsg": "Please provide a query here",
                        "required": true,
                        "type": "text"
                    },
                    "type": "input"
                }
            ];
            return fields;
        }

        return {
            "getFields": getFields
        };
    }
})(angular);
