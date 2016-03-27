"use strict";

describe("jsDatahttpMethods helper service", function () {
    var httpMethodsSvc, httpBackend, DS, resource;

    beforeEach(module("madeasyApp", "js-data-mocks"));

    beforeEach(inject(["resourceHttpMethods", "$httpBackend", "DS",
        "madeasy.resources.appointment",
        function (_resourceHttpMethods_, $httpBackend, _DS_,
            _resource_) {
            httpMethodsSvc = _resourceHttpMethods_;
            httpBackend = $httpBackend;
            resource = _resource_;
            DS = _DS_;
        }]));

    it("should get the data - TEST LIST", function () {
        var params = {};
        var appointments = {
            appointmentStatusID : "1",
            practiceCodesID : "1",
            slotID : "1"
        };
        DS.expectFindAll("appointment").respond([appointments]);
        httpMethodsSvc.resourceActions.list(resource, params).then(
            function(data) {
                expect(data).toEqual([appointments]);
            }
          );
        DS.flush();
    });

    it("should resolve params to {} if there are none", function () {
        var appointments = {
            appointmentStatusID : "1",
            practiceCodesID : "1",
            slotID : "1"
        };
        DS.expectFindAll("appointment").respond([appointments]);
        httpMethodsSvc.resourceActions.list(resource).then(
            function(data) {
                expect(data).toEqual([appointments]);
            }
          );
        DS.flush();
    });

});
