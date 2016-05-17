(function(angular) {
    "use strict";
    angular.module("madeasy.parser.components.flightCard", [
        "madeasy.common.errorMessages"
    ])

    .component("flightCard", {
        bindings: {
            "cardIndex": "<"
        },
        require: {"parentCtrl": "^flightCardListing"},
        controller: "madeasy.parser.controller.flightCard",
        controllerAs: "flightCrd",
        template: `
                    <div class="card card-shadow">
                        <div class="card-heading">
                            <div class="card-dest pull-left">
                                <strong>
                                    {{flightCrd.results[flightCrd.cardIndex].origin}} -
                                    {{flightCrd.results[flightCrd.cardIndex].destination}}</strong>
                            </div>
                            <div class="card-price pull-right">
                                <i class="fa fa-tag"> {{flightCrd.results[flightCrd.cardIndex].price}}</i>
                            </div>
                        <div>
                        <div class="clearfix"></div>
                        <ul id="timeline-card">
                          <li ng-repeat="segment in flightCrd.results[flightCrd.cardIndex].segments">
                            <div class="relative">
                                <label class="card-label">
                                    {{segment.start_airport}} -
                                    {{segment.stop_airport}}
                                </label>
                                <span class="airline-small">{{segment.airline}}</span>
                                <span class="date">
                                {{segment.start_time| date: 'MMM d'}} <br>
                                </span>
                              <span class="datetime">

                                {{segment.start_time| date: 'H:mm'}} -
                                {{segment.stop_time| date: 'H:mm'}}
                            </span>
                              <span class="circle"></span>
                            </div>
                            <div class='content'>
                            </div>
                          </li>
                        </ul>
                    </div>
                `
    })

    .controller("madeasy.parser.controller.flightCard", FlightCard);
    function FlightCard() {
        var self = this;

        self.$onInit = function () {
            self.results = self.parentCtrl.results;
        };

    }

})(window.angular);
