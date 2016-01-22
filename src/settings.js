"use strict";

(function (window) {

    var setts = {
        "HOME_PAGE_NAME": "",
        "SERVER_URL": "http://localhost:8000",
        "DEBUG": true,
        "ACTIONS": {
            "RESTRICT": []
        },
        "CREDZ": {
            "client_id": "madeasy",
            "client_secret": "madeasy@siri"
        },
        "AUTH": {
            "TOKEN_URL": "/o/token/",
            "AUTHORIZE_URL": "/o/authorize/",
            "REVOKE_TOKEN_URL": "/o/revoke_token/",
            "USER_INFO_URL": "/me/",
            "REDIRECT_URL": "/complete/",
            "USER_PROFILE": "/manage/profile/"
        }
    };

    setts.CREDZ.token_url = setts.SERVER_URL + setts.AUTH.TOKEN_URL;
    setts.CREDZ.revoke_url = setts.SERVER_URL + setts.AUTH.REVOKE_TOKEN_URL;
    window.MADEASY_SETTINGS = setts;

})(window);
