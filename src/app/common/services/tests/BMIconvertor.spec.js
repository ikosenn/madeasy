"use strict";

describe("Unit Test: BMI convertor", function () {
    var bmiConvertor;
    beforeEach(function () {
        module("emrApp.config");
        module("emr.common.services.query_adapter");
        module("emr.common.convertors.bmi");

        inject(["emr.common.bmi", function (_bmiConvertor) {
            bmiConvertor = _bmiConvertor;
        }]);
    });

    it("Should calculate the BMI given the height and weight", function () {
        var height = 161;
        var weight = 85;
        var expectedBMI = 32.79;

        var result = bmiConvertor.bmi(height, weight);

        expect(result).toEqual(expectedBMI.toFixed(2));
    });

    it("Should give the BMI correct to 2 decimal places", function () {
        var height = 121;
        var weight = 83;

        var result = bmiConvertor.bmi(height, weight);
        var length = String(result).split(".")[1].length;

        expect(length).toBe(2);
    });

    it("Should ensure the BMI has a total of 5 characters", function () {
        var height = 100;
        var weight = 24;

        var result = bmiConvertor.bmi(height, weight);
        var length = String(result).length;

        expect(length).toBe(5);
    });
});
