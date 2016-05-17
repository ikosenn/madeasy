(function(angular, _) {
    "use strict";
    angular.module("madeasy.parser.component.flightCardListing", [
        "madeasy.parser.components.flightCard",
        "madeasy.common.errorMessages"
    ])

    .component("flightCardListing", {
        controller: "madeasy.parser.component.flightCardListing",
        controllerAs: "flightCardListing",
        template: `
                <madeasy-js-data-alerts></madeasy-js-data-alerts>
                <div class='row'>
                    <!-- <div class="row" ng-if="$index%3==0"> -->
                        <div class="madeasy-col-4"
                             ng-repeat="result in flightCardListing.results">
                                <flight-card card-index="$index"></flight-card>
                        </div>
                    <!-- </div ng-if="$index%3==0"> -->
                </div>

                    `
    })

    .controller("madeasy.parser.component.flightCardListing", FlightCardListing);
    FlightCardListing.$inject = ["$state", "errorMessage", "$scope"];
    function FlightCardListing ($state, errs, $scope) {
        var self = this;
        self.$onInit = function () {
            if (!_.isNull($state.params.flightDetails)) {
                var flightDetails = $state.params.flightDetails;
                self.results = flightDetails.data.results;
            }
            if (_.isEmpty(self.results) || _.isNull($state.params.flightDetails)) {
                $scope.alert = errs.showInfo("You do not have any booked flights.");
            }
        };
    }

})(window.angular, window._);
