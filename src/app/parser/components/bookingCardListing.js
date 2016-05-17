(function(angular, _) {
    "use strict";
    angular.module("madeasy.parser.component.bookingCardListing", [
        "madeasy.parser.components.bookingCard",
        "madeasy.common.errorMessages"
    ])

    .component("bookingCardListing", {
        controller: "madeasy.parser.component.bookingCardListing",
        controllerAs: "bookingCardListing",
        template: `
                <madeasy-js-data-alerts></madeasy-js-data-alerts>
                <div class='row'>
                    <!-- <div class="row" ng-if="$index%3==0"> -->
                        <div class="madeasy-col-4"
                             ng-repeat="leg in bookingCardListing.tripOptions.legs">
                                <booking-card card-index="$index"></booking-card>
                        </div>
                    <!-- </div ng-if="$index%3==0"> -->
                </div>

                    `
    })

    .controller("madeasy.parser.component.bookingCardListing", BookingCardListing );
    BookingCardListing.$inject = ["$state", "$scope", "errorMessage"];
    function BookingCardListing ($state, $scope, errs) {
        var self = this;

        self.$onInit = function () {
            if (!_.isNull($state.params.bookDetails)) {
                var bookDetails = $state.params.bookDetails;
                self.tripOptions = bookDetails.data;
            }
            if (_.isEmpty(self.tripOptions) || _.isNull($state.params.bookDetails)) {
                $scope.alert = errs.showInfo(
                    "There are no flights available on that day.");
            }
        };
    }

})(window.angular, window._);
