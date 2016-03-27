"use strict";

describe("Test silform directive", function () {
    var $rootScope, $scope, $compile, httpBackend, html, formlyService;
    html = "<sil-form formname='payerForm' title='New Payer'" +
     "submitfunction='createPayer()' model='payerForm.model'" +
     "service='madeasy.patients.formly.registration.basic' buttontext='Save" +
     " Payer'></sil-form>";

    beforeEach(function() {
        module("madeasy.patients.formly.registration.basic");
        module("madeasy.common.directives.form");
        module("common/tpls/sil_form.tpl.html");

        inject(["$rootScope", "$compile", "$httpBackend", "$injector",
            "$templateCache", function (_rootScope_, _compile_, _httpBackend_,
                $injector) {
                $rootScope = _rootScope_;
                $scope = $rootScope.$new();
                $compile = _compile_;
                httpBackend = _httpBackend_;
                formlyService =
                $injector.get("madeasy.patients.formly.registration.basic");
            }]);
    });

    it("should check that a form has been successfully rendered", function () {

        var element = angular.element(html);
        var el = $compile(element)($scope);
        $scope.$digest();
        expect(el.hasClass("sil-col-8").toBeTruthy);
    });
});
