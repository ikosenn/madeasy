"use strict";

describe("Unit Test: Date of birth to Age convertor", function () {
    var ageConvertor;
    beforeEach(function () {
        module("emrApp.config");
        module("emr.common.services.query_adapter");
        module("emr.common.convertors");

        inject(["emr.common.dateOfBirthToAge", function (_ageConvertor) {
            ageConvertor = _ageConvertor;
        }]);
    });

    it("Should make a new date object given an endDate", function () {
        var startDate = "2015-09-01";
        var endDate = "2015-10-01";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("1 month");
    });

    it("Should show only the month for ages above 6 months", function () {
        var startDate = "2015-02-02";
        var endDate = "2015-01-01";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("10 months");
    });

    it("Should show the year and the MONTHS if age is under 5 years", function
    () {
        // for less than 6 months
        var startDate = "2010-02-02";
        var endDate = "2014-05-02";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("4 years and 3 months");
    });

    it("Should show the year and the MONTH if age is under 5 years", function
    () {
        var startDate = "2010-02-02";
        var endDate = "2014-03-02";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("4 years and 1 month");
    });

    it("Should show the year and the MONTHS if age is under 5 years", function
    () {
        // for more than 6 months
        var startDate = "2010-02-02";
        var endDate = "2014-11-02";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("4 years and 9 months");
    });

    it("Should not add `and` when no month is present", function
    () {
        // for zero months but several years less than 5
        var startDate = "2010-02-02";
        var endDate = "2011-02-02";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("1 year ");
    });

    it("Should have a year diffrence of 1", function () {
        var startDate = "2010-02-02";
        var endDate = "2011-02-02";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("1 year ");
    });

    it("Should have a day diffrence of 1", function () {
        var startDate = "2010-02-02";
        var endDate = "2011-02-03";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("1 year ");
    });

    it("Should show only the year if age is above or 5 years and " +
    "several months", function () {
        // test for 5 years with several months
        var startDate = "2010-01-01";
        var endDate = "2015-11-01";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("5 years");
    });

    it("Should show only the year if age is above or 5 years and one month",
    function () {
        // test for 5 years with one month
        var startDate = "2010-01-01";
        var endDate = "2015-03-01";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("5 years");
    });

    it("Should show only the year if age is above or 5 years and no month",
    function () {
        // test for 5 years with zero month
        var startDate = "2010-01-01";
        var endDate = "2015-01-01";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("5 years");
    });

    it("Should show the year and MONTHS if age is below or 5 years",
    function () {
        // test for 1 year with several months
        var startDate = "2014-01-01";
        var endDate = "2015-05-01";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("1 year  and 4 months");
    });

    it("Should show the year and MONTH if age is below or 5 years",
    function () {
        // test for 1 year with one month
        var startDate = "2014-01-01";
        var endDate = "2015-02-01";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("1 year  and 1 month");
    });

    it("Should show the month and DAYS if age less than 6 months", function () {
        // less than 6 months
        // show, 3 months and 4 days
        var startDate = "2015-01-01";
        var endDate = "2015-04-05";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("3 months and 4 days");
    });

    it("Should show the month and day if age less than 6 months", function () {
        // less than 6 months
        // show, 3 months and 1 day
        var startDate = "2015-01-01";
        var endDate = "2015-04-02";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("3 months and 1 day");
    });

    it("Should show age to days precision if the year and month are zero",
    function () {
        // zero years, zero months 2 days
        // this test covers the `s` suffix put to pluralize the day(s)
        // show 2 days instead of 2 day
        var startDate = "2015-12-10";
        var endDate = "2015-12-12";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("2 days");
    });

    it("Should show age to the day precision if the year and month are zero",
    function () {
        // zero years, zero months 1 day
        // this test covers the `s` suffix put to pluralize the day(s)
        // show 1 day instead of 1 days
        var startDate = "2015-12-10";
        var endDate = "2015-12-11";
        var age = ageConvertor.getAge(startDate, endDate);
        expect(age).toEqual("1 day");
    });
});
