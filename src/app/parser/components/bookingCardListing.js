(function(angular) {
    "use strict";
    angular.module("madeasy.parser.component.bookingCardListing", [
        "madeasy.parser.components.bookingCard"
    ])

    .component("bookingCardListing", {
        controller: "madeasy.parser.component.bookingCardListing",
        controllerAs: "bookingCardListing",
        template: `
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
    BookingCardListing.$inject = ["$state"];
    function BookingCardListing ($state) {
        var self = this;

        self.$onInit = function () {
            if (!_.isNull($state.params.bookDetails)) {
                var bookDetails = $state.params.bookDetails;
                self.tripOptions = bookDetails.data;
            }
        };
    }

})(window.angular);
