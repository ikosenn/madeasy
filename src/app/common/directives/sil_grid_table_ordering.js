(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.gridTableOrdering", [])

    .directive("silGridTableOrdering", [
        "madeasy.common.adapter.utils", function (utils) {
            return {
                link: function (scope) {
                    // 1. It should be possible to combine column sorts, each being
                    //    independent of the other but all being combined
                    //    'on the wire'
                    //    the order in which the user adds sort params is significant
                    //
                    // 2. There should be a way to 'reset' or remove ordering and
                    //    start over, without reloading the page.

                    scope.orderData = function(orderingParam, event) {
                        // Obtain the element we clicked on
                        var elem = angular.element(event.target);

                        // Deal with the ordering param
                        var existingOrderingParamsList = scope.sorter.getOrdering();

                        if (_.contains(existingOrderingParamsList, orderingParam)) {
                            scope.sorter.updateOrdering(
                                utils.flipParam(orderingParam));
                        } else {
                            scope.sorter.updateOrdering(orderingParam);
                        }

                        // Toggling the icon
                        if (elem.hasClass("fa-sort")) {
                            elem.toggleClass("fa-sort").addClass("fa-arrow-up");
                        } else if (elem.hasClass("fa-arrow-up")) {
                            elem.toggleClass("fa-arrow-up")
                                .addClass("fa-arrow-down");
                        } else {
                            elem.toggleClass("fa-arrow-down")
                                .addClass("fa-arrow-up");
                        }

                        // Final common pathway
                        scope.getData();
                    };
                },
                restrict: "E"
            };
        }
    ]);
})(angular);
