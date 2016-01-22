"use strict";
var testFormly = function (moduleName, serviceName, fieldSize) {
    describe("Unit tests: " + moduleName, function () {

        var formlyConfig;
        beforeEach(function () {
            module(moduleName);
            inject([serviceName, function (__formlyConfig__) {
                formlyConfig = __formlyConfig__;
            }]);
        });

        it("should be able to return the formly field", function () {
            spyOn(formlyConfig, "getFields").andCallThrough();
            var result = formlyConfig.getFields();
            expect(formlyConfig.getFields).toHaveBeenCalled();
            expect(result.length).toBe(fieldSize);
        });
    });
};

describe("Tests for the formly field configs", function () {
    testFormly("emr.common.services.formly.patients.allergy.new",
                "emr.common.services.formly.newAllergy", 1);

    testFormly("emr.common.patients.formly.edit.contact",
                "emr.common.service.patients.edit.contact", 2);

    testFormly("emr.common.services.formly.patients.registration.basic",
                "emr.common.services.formly.basic", 6);

    testFormly("emr.common.services.formly.patients.registration.billing",
                "emr.common.services.formly.billing", 6);

    testFormly("emr.common.services.formly.patients.registration.contact",
                "emr.common.services.formly.contact", 5);

    testFormly("emr.common.services.formly.patients.registration.nextOfKin",
                "emr.common.services.formly.nextOfKin", 9);

    testFormly("emr.common.patients.formly.edit.allergy",
                "emr.common.service.patients.edit.allergy", 1);

    testFormly("emr.common.patients.formly.edit.billing",
                "emr.common.service.patients.edit.billing", 1);

    testFormly("emr.common.patients.formly.edit.next_of_kin",
                "emr.common.service.patients.edit.next_of_kin", 1);

    testFormly("emr.common.services.formly.scheduling.appointment",
                "emr.common.services.scheduling.formly.appointment", 6);

    testFormly("emr.common.services.formly.scheduling.calendar_event",
                "emr.common.services.scheduling.formly.calendar_event", 3);

    testFormly("emr.common.services.formly.scheduling.filtering",
                "emr.common.services.scheduling.formly.filtering", 1);

    testFormly("emr.common.services.formly.queues.queue_type",
                "emr.common.services.queues.formly.queue_type", 2);

    testFormly("emr.common.services.formly.common.change_password",
                "emr.common.services.common.change_password", 3);

    testFormly("emr.common.services.formly.common.user",
                "emr.common.services.common.user", 3);

    testFormly("emr.common.services.formly.auth.login",
                "emr.common.services.auth.login", 2);

    testFormly("emr.common.services.formly.auth.reset_confirm",
                "emr.common.services.auth.reset_confirm", 2);

    testFormly("emr.common.services.formly.auth.reset_email",
                "emr.common.services.auth.reset_email", 1);

    testFormly("emr.common.services.formly.admin.location",
                "emr.common.services.admin.formly.location", 9);

    testFormly("emr.common.services.formly.admin.slots",
                "emr.common.services.admin.formly.slots", 4);

    testFormly("emr.common.services.formly.admin.schedule",
                "emr.common.services.admin.formly.schedule", 4);

    testFormly("emr.common.services.formly.admin.practitioner",
                "emr.common.services.admin.formly.practitioner", 1);

    testFormly("emr.common.services.formly.admin.organisation",
                "emr.common.services.admin.formly.organisation", 2);

    testFormly("emr.common.services.formly.admin.payer",
                "emr.common.services.admin.formly.payer", 2);

    testFormly("emr.common.services.formly.admin.user",
                "emr.common.services.admin.formly.user", 4);
});
