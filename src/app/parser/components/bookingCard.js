  // jscs:disable
(function(angular) {
    "use strict";
    angular.module("madeasy.parser.components.bookingCard", [
        "madeasy.common.errorMessages"
    ])

    .component("bookingCard", {
        bindings: {
            "cardIndex": "<"
        },
        require: {"parentCtrl": "^bookingCardListing"},
        controller: "madeasy.parser.controller.bookingCard",
        controllerAs: "bookingCrd",
        template: `
                    <div class="card card-shadow">
                        <div class="card-heading">
                            <div class="card-dest pull-left">
                                <strong>
                                    {{bookingCrd.tripOptions.origin}} -
                                    {{bookingCrd.tripOptions.destination}}</strong>
                            </div>
                            <div class="card-price pull-right">
                                <i class="fa fa-tag"> $ {{bookingCrd.tripOptions.legs[bookingCrd.cardIndex].price}}</i>
                            </div>
                        <div>
                        <div class="clearfix"></div>
                        <ul id="timeline-card">
                          <li ng-repeat="segment in bookingCrd.tripOptions.legs[bookingCrd.cardIndex].segments">
                            <div class="relative">
                                <label class="card-label">
                                    {{segment.start_airport}} -
                                    {{segment.stop_airport}}
                                </label>
                                <span class="airline-small">{{segment.airline}}</span>

                              <span class="date">
                                {{segment.start_time| date: 'H:mm'}} -
                                {{segment.stop_time| date: 'H:mm'}}
                            </span>
                              <span class="circle"></span>
                            </div>
                            <div class='content'>
                            </div>
                          </li>
                        </ul>
                        <div>
                            <button class="btn btn-primary btn-card"
                             ng-click="bookingCrd.bookTrip(bookingCrd.cardIndex)">Book</button>
                        </div>
                    </div>
                `
    })

    .controller("madeasy.parser.controller.bookingCard", BookingCard);
    BookingCard.$inject = ["$rootScope", "$state", "silDataLayer", "errorMessage"];
    function BookingCard($rootScope, $state, silDataLayer, errs) {
        var self = this;

        self.$onInit = function () {
            self.tripOptions = self.parentCtrl.tripOptions;
        };

        var success_fxn = function () {
            $rootScope.alert = errs.showSuccess(
                "Flight was booked successfully", "Success");
        };

        var error_fxn = function (error) {
            $rootScope.alert = errs.showError(error, "Error");
        };

        self.bookTrip = function (index) {
            var bookObj = {
                leg:{}
            };
            bookObj.origin = self.tripOptions.origin;
            bookObj.origin_id = self.tripOptions.origin_id;
            bookObj.destination = self.tripOptions.destination;
            bookObj.destination_id = self.tripOptions.destination_id;
            bookObj.leg = self.tripOptions.legs[index];
            silDataLayer.create("create_trip", {"flight_details": bookObj})
                .then(success_fxn, error_fxn);

        };
    }

})(window.angular);
