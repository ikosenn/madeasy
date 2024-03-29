(function library (angular) {
    "use strict";

    angular.module("madeasy.common.services.apiRegistry", [
        "sil.datalayer"
    ])

    .run(APIRegistry);

    APIRegistry.$inject = ["silDataStoreFactory", "SERVER_URL"];
    function APIRegistry (silDataStoreFactory, SERVER_URL) {
        silDataStoreFactory("parse_query", {
            url: SERVER_URL + "/api/parser/parse_query/"
        });

        silDataStoreFactory("create_trip", {
            url: SERVER_URL + "/api/airline/trips/create_trip/"
        });

        silDataStoreFactory("parser_correctness", {
            url: SERVER_URL + "/api/parser/parser_results/parser_correctness/"
        });

        silDataStoreFactory("parser_response_day", {
            url: SERVER_URL + "/api/parser/parser_results/parser_response_day/"
        });

        silDataStoreFactory("users", {
            url: SERVER_URL + "/api/auth/create_user/"
        });

        silDataStoreFactory("parser", {
            url: SERVER_URL + "/api/parser/parser_results/"
        });

        silDataStoreFactory("parser_numbers", {
            url: SERVER_URL + "/api/parser/parser_results/parser_numbers/"
        });

        silDataStoreFactory("parser_command_type", {
            url: SERVER_URL + "/api/parser/parser_results/parser_command_type/"
        });
    }
})(window.angular);
