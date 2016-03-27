"use strict";

describe("Unit Test: <sil-delete> directive", function () {
    var html, model, compile, injector, scope;

    model = [
        {
            active: true,
            deleted: false,
            id: 1
        }
    ];
    html = "<sil-delete data-title='Delete' data-index='0'" +
           " data-itemid='1' data-resource='madeasy.resource.triage'" +
           " data-model='" + model + "'></sil-delete>";
    beforeEach(function () {
        module("madeasy.config");
        module("madeasy.common.directives.sil_delete");
        module("madeasy.resources.visits.triage");
        module("madeasy.common.controllers.sil_delete");
        module("madeasy.resources.common.jsDataUtils");
        module("madeasy.common.services.query_adapter");
        module("madeasy.common.errorMessages");
        module("madeasy.common.adapter.utils");
        module("oitozero.ngSweetAlert");

        inject(["$compile", "$rootScope", "$injector",
        function (_$compile_, _$rootScope_, _$injector_) {
            scope = _$rootScope_.$new();
            compile = _$compile_;
            injector = _$injector_;
            injector.get("madeasy.resource.triage");
        }]);
    });

    it("Should render the delete button as expected", function () {
        var element = angular.element(html);
        var el = compile(element)(scope);
        scope.$digest();
        expect(el.hasClass("btn-danger").toBeTruthy);
    });
});
