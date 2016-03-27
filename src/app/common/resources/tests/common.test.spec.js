"use strict";
var testResources = function (moduleName, serviceName, resourceName) {
    describe("Unit tests: " + moduleName, function () {

        var DS;
        beforeEach(function () {
            module("js-data-mocks");
            module(moduleName);
            module("madeasy.common.services.query_adapter");

            inject(["DS", function (_DS_) {
                    DS = _DS_;

                }
            ]);
        });

        it("should intantiate a " + resourceName + "resource", function () {
            spyOn(DS, "defineResource").and.callThrough();
            inject([serviceName, function (res) {
                expect(DS.defineResource).toHaveBeenCalled();
                expect(res.name).toEqual(resourceName);
            }]);
        });
    });
};

describe("Common tests for the resources", function () {

    // Tests for the resource in the auth section
    testResources("madeasy.resources.auth.userRoles",
        "madeasy.resource.userRoles", "userRoles");

    testResources("madeasy.resources.auth.action",
        "madeasy.resource.action", "actions");

    testResources("madeasy.resources.auth.permission",
        "madeasy.resource.permission", "permission");

    testResources("madeasy.resources.auth.roleActions",
        "madeasy.resource.roleActions", "roleActions");

    testResources("madeasy.resources.auth.role",
        "madeasy.resource.role", "role");

    testResources("madeasy.resources.auth.user",
         "madeasy.resource.user", "user");

    //Tests for resources in the common section
    testResources("madeasy.resources.common.contact",
        "madeasy.resource.contact", "contact");

    testResources("madeasy.resources.common.location",
        "madeasy.resources.location" ,"location");

    testResources("madeasy.resources.common.organisation",
        "madeasy.resource.organisation", "organisations");

    testResources("madeasy.resources.common.payer",
        "madeasy.resource.payer", "payer");

    testResources("madeasy.resources.common.person",
        "madeasy.resource.person", "person");

    testResources("madeasy.resources.common.personID",
        "madeasy.resource.personID", "personID");

    testResources("madeasy.resources.common.userProfile",
        "madeasy.resource.userProfile", "userProfile");

    testResources("madeasy.resources.common.userPhoto",
        "madeasy.resource.userPhoto", "attachment");

    //Tests for resources in inbox app
    testResources("madeasy.resources.inbox.userMessage",
        "madeasy.resource.inbox.userMessage", "userMessage");

    //Tests for resources in the patients app
    testResources("madeasy.resources.patients.allergyIntolerance",
        "madeasy.resource.allergyIntolerance", "allergyIntolerance");

    testResources("madeasy.resources.patients.nextOfKin",
        "madeasy.resource.nextOfKin", "nextOfKin");

    testResources("madeasy.resources.patients.patient",
        "madeasy.resource.patient", "patient");

    testResources("madeasy.resources.patients.patientCover",
        "madeasy.resource.patientCover", "patientCover");

    testResources("madeasy.resources.patients.patientNextOfKin",
        "madeasy.resource.patientNextOfKin", "patientNextOfKin");

    testResources("madeasy.resources.patients.physicalAddress",
        "madeasy.resource.physicalAddress", "physicalAddress");

    //Tests for resources in queues app
    testResources("madeasy.resources.queues.queueType",
        "madeasy.resource.queueType", "queueType");

    //Tests for the scheduling app

    testResources("madeasy.resources.scheduling.appointment",
        "madeasy.resources.appointment", "appointment");

    testResources("madeasy.resources.scheduling.participant",
        "madeasy.resources.participant", "participant");

    testResources("madeasy.resources.scheduling.period",
        "madeasy.resources.period", "period");

    testResources("madeasy.resources.scheduling.practitioners",
        "madeasy.resources.practitioners", "practitioners");

    testResources("madeasy.resources.scheduling.schedule",
        "madeasy.resources.schedule", "schedule");

    testResources("madeasy.resources.scheduling.slots",
        "madeasy.resources.slots", "slot");

    //Tests for resources in the visits app
    testResources("madeasy.resources.visits.allergyIntolerance",
        "madeasy.resource.allergyIntolerance", "AlergyIntolerace");

    testResources("madeasy.resources.visits.encounter",
        "madeasy.resources.encounter", "encounter");

    testResources("madeasy.resources.visits.referral",
        "madeasy.resource.referral", "referral");

    testResources("madeasy.resources.visits.statusHistory",
        "madeasy.resource.statusHistory", "statusHistory");

    testResources("madeasy.resources.visits.triage",
        "madeasy.resource.triage", "triage");
    testResources("madeasy.resources.inbox.groupMessage",
        "madeasy.resource.inbox.groupMessage","groupMessage");

});
