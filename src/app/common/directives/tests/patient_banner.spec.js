"use strict";

describe("Unit Test: Patient Banner Directive", function () {
    var html, scope, compile, elem, triageUrl, allergyUrl, httpBackend;
    var allergyData = {
        "results": [
            {
                "allergy_category": "fc16fc09-c713-4ea7-9a5e-e61b57191055",
                "allergy_criticality": "d7f64173-b431-496a-b29b-0ebe3a58b282",
                "allergy_onset": "2015-11-09T12:14:30Z",
                "allergy_status": "ec0ed93e-ab2f-4bbb-843c-67f3de95d83d",
                "allergy_substance": "9f19a7f6-8322-42fc-a467-9fe28ea85c05",
                "allergy_type": "317a2e62-b9fd-45b0-b6a8-dcf4f890cde1",
                "id": "efdbb8c4-f7a6-455a-847a-a131c2fe72eb",
                "last_occurence": "2015-11-09T12:14:30Z",
                "note": "SNOMED recognizes this symptoms",
                "patient": "7325528c-f291-44dd-9d01-ccaf0b4cbe6c",
                "recorded_date": "2015-11-09T12:14:30Z",
                "recorder": "d47f94c0-23e3-41f4-9578-2a4e5ffd8685"
            }
        ]
    };
    var triageData = {
        "results": [
            {
                "diastole": 85,
                "encounter": "3b9bb93e-f84b-442f-9a38-7c03461016e7",
                "height": 6.0,
                "id": "efdbb8c4-f7a6-455a-847a-a122c2fe34eb",
                "patient": "b506c730-6c31-49cd-8909-9df9603171e7",
                "pulse": 72,
                "respiratory_rate": 20,
                "systole": 135,
                "temperature": 37.7,
                "time_taken": "2015-10-10T10:21:30Z",
                "weight": 89.0
            }
        ]
    };
    html = "<sil-patient-banner></sil-patient-banner>";

    beforeEach(function() {
        module("madeasyApp");
        module("madeasy.common.directives.patientBanner");
        module("common/tpls/views/patient_banner.tpl.html");

        inject(["$compile", "$rootScope", "SERVER_URL", "ALLERGY_INTOLERANCE",
        "TRIAGE_END_POINT", "$httpBackend",
        function (_$compile_, _$rootScope_, serverUrl, allergy, triage,
            _$httpBackend_) {
            compile = _$compile_;
            scope = _$rootScope_.$new();
            httpBackend = _$httpBackend_;

            triageUrl = serverUrl + triage;
            allergyUrl = serverUrl + allergy;

            httpBackend.expectGET(allergyUrl).respond(200, allergyData);
            httpBackend.expectGET(triageUrl).respond(200, triageData);
            elem = compile(html)(scope);
            _$rootScope_.$digest();
            httpBackend.flush();
        }]);
    });

    afterEach(function () {
        angular.element("body").empty();
    });

    it("Should compile the patient banner template", function () {
        expect(elem.html()).toBeTruthy();
    });

    it("Should have the 'Patient Summary' header defined", function () {
        var heading = elem.find("div > strong.patient-header");
        expect(heading.text()).toBe("Patient Summary");
    });

    it("Should have the 'Patient Summary Spinner' header defined", function () {
        var spinner = elem.find("div > strong.patient-header-spinner");
        expect(spinner.text()).toBe("Loading Patient Summary...");
    });

    it("Should have the 'Patient Summary Allergy' header defined", function () {
        var header = elem.find("div > strong.patient-header-allergy");
        expect(header.text()).toBe("ALLERGIES");
    });

    it("Should have the 'Patient Summary Allergy' spinner defined",
    function () {
        var spinner = elem.find("div > strong.patient-header-allergy-spinner");
        expect(spinner.text()).toBe("Loading Patient Allergies... ");
    });

    it("Should have the 'Patient Summary Vitals' header defined", function () {
        var header = elem.find("div > strong.patient-header-vitals");
        expect(header.text()).toBe("VITALS");
    });

    it("Should have the 'Patient Summary Vitals' spinner defined",
    function () {
        var spinner = elem.find("div > strong.patient-header-vitals-spinner");
        expect(spinner.text()).toBe("Loading Patient Vitals... ");
    });
});
