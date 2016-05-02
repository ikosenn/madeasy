(function library (angular) {
    "use strict";

    angular.module("madeasy.common.services.apiRegistry", [
        "sil.datalayer"
    ])

    .run(APIRegistry);

    APIRegistry.$inject = ["silDataStoreFactory", "SERVER_URL"];
    function APIRegistry (silDataStoreFactory, SERVER_URL) {
        silDataStoreFactory("parse_query",{
            url: SERVER_URL + "/api/parser/parse_query/"
        });

        silDataStoreFactory("create_trip",{
            url: SERVER_URL + "/api/airline/trips/create_trip/"
        });
    }
})(window.angular);
