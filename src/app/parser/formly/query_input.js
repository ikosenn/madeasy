(function library (angular) {
    "use strict";

    angular.module("madeasy.parser.formly.query", [])

    .factory("madeasy.parser.formly.query", Query);
    function Query () {

        function getFields () {
            var fields = [
                {
                    "key": "query",
                    "type": "voice-input",
                    "templateOptions": {
                        "reqValidationMsg": "Please provide a query here",
                        "required": true
                    }
            }
        ];
            return fields;
        }

        return {
            "getFields": getFields
        };
    }
})(angular);
