"use strict";

(function (window) {

    var setts = {
        "SERVER_URL": "http://localhost:8000",
        "ACTIONS": {
            "RESTRICT": []
        },
        "CREDZ": {
            "client_id": "madeasyapp224",
            "client_secret": "madeasyapp@siri"
        },
        "AUTH": {
            "TOKEN_URL": "/o/token/",
            "REVOKE_TOKEN_URL": "/o/revoke_token/",
            "USER_INFO_URL": "/me/",
        }
    };

    setts.CREDZ.token_url = setts.SERVER_URL + setts.AUTH.TOKEN_URL;
    setts.CREDZ.revoke_url = setts.SERVER_URL + setts.AUTH.REVOKE_TOKEN_URL;
    window.MADEASY_SETTINGS = setts;

})(window);
