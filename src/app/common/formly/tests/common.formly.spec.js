"use strict";

var testFormly = function (name, fieldSize) {
    describe("Unit tests: " + name, function () {

        var formlyConfig;
        beforeEach(function () {
            module(name);
            inject([name, function (__formlyConfig__) {
                formlyConfig = __formlyConfig__;
            }]);
        });

        it("should be able to return the formly field", function () {
            spyOn(formlyConfig, "getFields").and.callThrough();
            var result = formlyConfig.getFields();
            expect(formlyConfig.getFields).toHaveBeenCalled();
            expect(result.length).toBe(fieldSize);
        });
    });
};

describe("Tests for the formly field configs", function () {
    testFormly("madeasy.patients.formly.allergy.new", 5);

    testFormly("madeasy.patients.formly.edit.contact", 2);

    testFormly("madeasy.patients.formly.registration.basic", 7);

    testFormly("madeasy.patients.formly.registration.billing", 6);

    testFormly("madeasy.patients.formly.registration.contact", 6);

    testFormly("madeasy.patients.formly.registration.nextOfKin", 9);

    testFormly("madeasy.patients.formly.edit.allergy", 7);

    testFormly("madeasy.patients.formly.edit.billing", 1);

    testFormly("madeasy.patients.formly.edit.next_of_kin", 1);

    testFormly("madeasy.scheduling.formly.appointment", 6);

    testFormly("madeasy.scheduling.formly.calendar_event", 2);

    testFormly("madeasy.scheduling.formly.filtering", 1);

    testFormly("madeasy.queues.formly.queue_type", 2);

    testFormly("madeasy.common.formly.change_password", 3);

    testFormly("madeasy.common.formly.user", 3);

    testFormly("madeasy.auth.formly.login", 2);

    testFormly("madeasy.auth.formly.reset_confirm", 2);

    testFormly("madeasy.auth.formly.reset_email", 1);

    testFormly("madeasy.admin.formly.location", 9);

    testFormly("madeasy.admin.formly.slots", 5);

    testFormly("madeasy.admin.formly.schedule", 5);

    testFormly("madeasy.admin.formly.practitioner", 9);

    testFormly("madeasy.admin.formly.organisation", 1);

    testFormly("madeasy.admin.formly.payer", 2);

    testFormly("madeasy.admin.formly.user", 4);

    testFormly("madeasy.admin.formly.valuesets.valuesets_form", 3);

    testFormly("madeasy.admin.formly.user_management.create_roles", 3);

    testFormly("madeasy.admin.formly.user_management.user", 4);
});
