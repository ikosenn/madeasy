(function (angular) {
    "use strict";

    angular.module("madeasy.resources.common.resourceHttpMethods", [])

    .service("resourceHttpMethods", [function () {
            this.resourceActions = {
                list: function(resource, query_param) {
                    return resource.findAll(
                        query_param || {},
                        {
                            bypassCache: true
                        }
                    );
                }
            };
        }]);
})(angular);
