(function(angular, _) {
    "use strict";
    angular.module("madeasy.common.components.micCheck", [])

    .component("micCheck", {
        bindings: {
            "formlyModel": "="
        },
        controller: "madeasy.common.controller.micCheck",
        controllerAs: "mc",
        template: `
                <div class="input-group">
                  <input class="form-control" ng-model="mc.formlyModel">
                  <div class="input-group-addon mic" ng-click='mc.startRecognition()'>
                    <i class="fa fa-145x" ng-class="{'fa-microphone mic-active': mc.active, 'fa-microphone-slash': !mc.active}"></i>
                  </div>
                </div>
                    `
    })

    .controller("madeasy.common.controller.micCheck", MicCheck);
    MicCheck.$inject = ["$scope"];
    function MicCheck($scope) {
        var self = this;
        self.active = false;
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-GB";

        function capitalize(s) {
            var first_char = /\S/;
            return s.replace(first_char, function(m) {
                return m.toUpperCase();
            });
        }

        self.startRecognition = function () {
            if (!self.active) {
                self.active = true;
                recognition.start();
                self.final_transcript = "";
                recognition.onresult = function (evt) {
                    self.interim_transcript = "";
                    for (var i = evt.resultIndex; i < evt.results.length; ++i) {
                        if (evt.results[i].isFinal) {
                            self.final_transcript += evt.results[i][0].transcript;

                        } else {
                            self.interim_transcript += evt.results[i][0].transcript;

                        }
                    }
                    self.final_transcript = capitalize(self.final_transcript);
                    if (_.isEmpty(self.interim_transcript)) {
                        self.formlyModel = self.final_transcript;
                    }
                    else {
                        self.formlyModel = self.interim_transcript;
                    }

                    $scope.$digest();
                };
            }
            else {
                recognition.stop();
                self.active = false;
            }
        };

    }

})(window.angular, window._);
