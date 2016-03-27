(function (angular) {
    "use strict";

    angular.module("madeasy.common.directives.form", [])

    .directive("silForm", ["$injector", function($injector) {
        return {
            link: function(scope) {
                    var formlyService = $injector.get(scope.service);
                    scope.fields = formlyService.getFields();
                },
            replace: true,
            restrict: "E",
            scope: {
                buttontext: "@",
                formname: "@",
                model: "=",
                service: "@",
                submitfunction: "&",
                title: "@"
            },
            template: `
                <div class="panel">
                <div class="panel-heading">
                    <span class="panel-title">{{title}}</span>
                </div>
                <div class="panel-body">
                    <div class="sil-col-offset-2 sil-col-8">
                        <form novalidate name="{{formname}}">
                            <fieldset ng-disabled="submitClicked">
                            <formly-form fields="fields" model="model">
                            <div id="form-submit-button" class="sil-col-12">
                                <button  class="btn btn-primary"
                                ng-click="submitfunction()"
                                type="submit">{{buttontext}}</button>
                            </div>
                            </formly-form>
                            </fieldset>
                    </form>
                </div>
            </div>
            </div>

            `
        };
    }]);
})(angular);
