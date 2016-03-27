"use strict";
//Test that an event triggers an $emit call and publishes
//the event

// Test that on state change the resource receives the listener
//event broadcasted.

describe ("Unit Test : Event Publisher Service", function () {
    var scope, rootScope, resourceName, resourceUtils;

    beforeEach(function() {
        module("madeasy.common.resourceUtilities");
        module("madeasy.common.services.query_adapter");
        module("madeasy.resources.common.organisation");
        module("madeasy.constants");

        inject(["$rootScope",
            "madeasy.resource.organisation", "madeasy.common.resourceUtilities",
            function($rootScope, organisationResource, resources) {
                rootScope = $rootScope;
                resourceUtils = resources;
                scope = $rootScope.$new();
                resourceName = organisationResource;
            }
        ]);
    });

    it("Should call the event listener",function () {
        spyOn(rootScope, "$emit");
        resourceUtils.publishResourceUpdate(resourceName);
        expect(rootScope.$emit).toHaveBeenCalledWith("organisations.change");
    });

    it("Should receive an event call", function () {
        spyOn(rootScope, "$on");
        var fxn = function () {
            return null;
        };
        var callback = resourceUtils.listenToResourceUpdate(resourceName, fxn);
        resourceUtils.publishResourceUpdate(resourceName);
        expect(rootScope.$on).toHaveBeenCalledWith(
            "organisations.change", callback);
        callback();
    });
});
