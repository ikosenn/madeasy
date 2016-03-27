"use strict";

describe("Unit tests: <sil-delete> directive controller", function () {
    var scope, injector, sweetAlert, alert, controller, DS, name, data, rootScope;
    beforeEach(function () {
        module("madeasy.config");
        module("js-data-mocks");
        module("madeasy.resources.visits.triage");
        module("madeasy.common.controllers.sil_delete");
        module("madeasy.resources.common.jsDataUtils");
        module("madeasy.common.services.query_adapter");
        module("madeasy.common.errorMessages");
        module("madeasy.common.adapter.utils");
        module("oitozero.ngSweetAlert");

        inject(["$rootScope", "$injector", "SweetAlert", "errorMessage", "DS",
                "$controller",
                function (_$rootScope_, _$injector_, _sweetAlert_, _alert_,
                    _DS_, _$controller_) {
                    alert = _alert_;
                    injector = _$injector_;
                    rootScope = _$rootScope_;
                    scope = rootScope.$new();
                    sweetAlert = _sweetAlert_;
                    DS = _DS_;
                    controller = function () {
                        name = "madeasy.common.controller.sil_delete";
                        data = {
                            "$injector": injector,
                            "$scope": scope,
                            "SweetAlert": sweetAlert
                        };
                        return _$controller_(name, data);
                    };
                }]);

    });

    it("Should delete an item listed in a grid and update the API",
    function () {
        controller();

        scope.resource = "madeasy.resource.triage";
        scope.model = [
            {
                active: true,
                deleted: false,
                diastole: 109,
                id: "some-uuid",
                systole: 110,
                temperature: 34
            }
        ];
        var updateParams = {
            active: false,
            deleted: true
        };
        var method = {
            method: "PATCH"
        };
        var response = {
            active: false,
            deleted: true,
            diastole: 109,
            id: "some-uuid",
            systole: 110,
            temperature: 34
        };
        DS.expectUpdate("triage", "1", updateParams, method).respond(response);

        scope.deleteItem(0, "1");
        scope.$digest();
        DS.flush();
        expect(scope.model.length).toBe(0);
    });

    it("Should fail to delete an item listed in a grid", function () {
        controller();

        scope.resource = "madeasy.resource.triage";
        scope.model = [
            {
                active: true,
                deleted: false,
                diastole: 109,
                id: "some-uuid",
                systole: 110,
                temperature: 34
            }
        ];
        var updateParams = {
            active: false,
            deleted: true
        };
        var method = {
            method: "PATCH"
        };
        var error = new Error("Failed to Delete Item");
        DS.expectUpdate("triage", "1", updateParams, method).respond(error);

        scope.deleteItem(0, "1");
        scope.$digest();
        DS.flush();
        var domError = {
            msg: [{}],
            title: "Delete Failed",
            type: "danger"
        };
        expect(scope.alert).toEqual(domError);
        expect(scope.model.length).toEqual(1);
    });

    it("should dismiss a response and return a callback function", function () {
        controller();
        scope.toDelete = {
            "id": "",
            "index": ""
        };

        var result = scope.dismissAlert(0, "1");
        scope.$digest();
        expect(scope.toDelete.id).toBe("1");
        expect(scope.toDelete.index).toBe(0);
        expect(typeof result).toBe("function");
    });

    it("Should call on the SweetAlert dialog box with a cancel action",
    function () {
        inject(["SweetAlert", function (swtAlert) {
            spyOn(swtAlert, "swal").and.callThrough();
            controller();
            scope.toDelete = {
                "id": "1",
                "index": 0
            };

            scope.dismissResponse(false);
            scope.$digest();
            var argss = swtAlert.swal.calls.argsFor(0)[0];
            var args = swtAlert.swal.calls.argsFor(0)[1];
            expect(swtAlert.swal).toHaveBeenCalledWith("Cancelled", "Error");
            expect(argss).toEqual("Cancelled");
            expect(args).toEqual("Error");
        }]);
    });

    it("Should call on the SweetAlert dialog box with a success action",
    function () {
        inject(["SweetAlert", function (alertSweet) {
            spyOn(alertSweet, "swal").and.callThrough();
            controller();
            scope.toDelete = {
                "id": "1",
                "index": 0
            };

            scope.resource = "madeasy.resource.triage";
            scope.model = [
                {
                    active: true,
                    deleted: false,
                    diastole: 109,
                    id: "some-uuid",
                    systole: 110,
                    temperature: 34
                }
            ];
            var updateParams = {
                active: false,
                deleted: true
            };
            var method = {
                method: "PATCH"
            };
            var response = {
                active: false,
                deleted: true,
                diastole: 109,
                id: "some-uuid",
                systole: 110,
                temperature: 34
            };
            DS.expectUpdate("triage", "1", updateParams, method).respond(response);

            scope.dismissResponse(true);
            scope.$digest();
            DS.flush();
            expect(alertSweet.swal).toHaveBeenCalledWith("Deletetion complete.",
            "Entry has been deleted.", "success");
        }]);
    });

    it("Should successfully call the alert function which launches the " +
        "SweetAlert", function () {
            inject(["SweetAlert", function (sweetAlert) {
                spyOn(sweetAlert, "swal");
                controller();
                scope.alert("1", 0);
                scope.$digest();
                expect(sweetAlert.swal).toHaveBeenCalled();
            }]);
        });
});
