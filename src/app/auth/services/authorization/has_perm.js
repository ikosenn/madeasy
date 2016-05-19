(function library (angular, _) {
    "use strict";

    angular.module("madeasy.auth.services.authorization.hasPerm", [
        "madeasy.authentication",
        "madeasy.auth.services"
    ])

    .factory("madeasy.authorization.hasPerm", hasPerm);
    hasPerm.$inject = ["madeasy.auth.services.login"];
    function hasPerm (authConfig) {

        return {
            hasPermissions : function hasPermissionsFunction (perms) {
                var user = authConfig.getUser();
                if (_.isNull(user)) {
                    return false;
                }
                if (_.isNull(user.actions)) {
                    return false;
                }
                var user_perms = user.actions;
                var want_perms = _.pluck(perms, "name");
                var union = _.union(user_perms, want_perms);

                return union.length === user_perms.length;
            }
        };
    }
})(window.angular, window._);
