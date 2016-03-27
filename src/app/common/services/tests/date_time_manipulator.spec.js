(function () {
    "use strict";

    describe("Unit Test: Date Time Manipulator", function () {

        var dateTime, moment;
        var validDate = "Tue Jan 12 2016 12:00:12 GMT+0300 (EAT)";
        var validTime = "Thu Feb 18 2016 23:27:04 GMT+0300 (EAT)";
        var invalidDate = "12-01-2016";
        var invalidTime = "12-01-2016 23:41:06";

        beforeEach(function () {
            module("madeasy.common.manipulators.dateTime");

            inject(["madeasy.common.dateTimeManipulator", "moment",
                function (_dateTime, m) {
                    dateTime = _dateTime;
                    moment = m;
                }
            ]);
        });

        /**
         * DateTimeManipulator.format
         */

        it("should give the required format given valid datetime", function () {
            var format = "DD-MM-YYYY";

            var formattedDT = dateTime.format(validDate, format);

            expect(formattedDT).toEqual("12-01-2016");
        });

        it("should give an empty string given invalid datetime", function () {
            var format = "YYYY-MM-DD";

            var formattedDT = dateTime.format(invalidDate, format);

            expect(formattedDT).toEqual("");
        });

        /**
         * DateTimeManipulator.combineDateTime
         */

        it("should combine given valid date and time with specified format",
            function () {
                var format = "YYYY-MM-DD HH:mm:ss";

                var combinedDT = dateTime.combineDateTime(
                    validDate, validTime, format
                );

                expect(combinedDT).toEqual("2016-01-12 23:27:04");
            }
        );

        it("should return empty string given invalid date or time", function () {
            var format = "YYYY-MM-DD HH:mm:ss";

            var combinedDT = dateTime.combineDateTime(
                invalidDate, invalidTime, format
            );

            expect(combinedDT).toEqual("");
        });

        /**
         * DateTimeManipulator.manipulateDateTime
         */

        it("should add a duration to a date", function () {
            var addedDate = dateTime.manipulateDateTime("+5M");

            expect(moment(addedDate).format("YYYY-MM-DD"))
                .toEqual(moment().add(5, "M").format("YYYY-MM-DD"));
        });

        it("should add a duration to a time", function () {
            var addedTime = dateTime.manipulateDateTime("+5h");

            expect(moment(addedTime).format("HH:mm:ss"))
                .toEqual(moment().add(5, "h").format("HH:mm:ss"));
        });

        it("should subtract a duration from a date", function () {
            var subtractedDate = dateTime.manipulateDateTime("-2y");

            expect(moment(subtractedDate).format("YYYY-MM-DD"))
                .toEqual(moment().subtract(2, "y").format("YYYY-MM-DD"));
        });

        it("should subtract a duration from a time", function () {
            var subtractedTime = dateTime.manipulateDateTime("-45m");

            expect(moment(subtractedTime).format("HH:mm:ss"))
                .toEqual(moment().subtract(45, "m").format("HH:mm:ss"));
        });

        it("should return undefined given invalid datetime operation", function () {
            var invalidDTOp = dateTime.manipulateDateTime("45m");

            expect(invalidDTOp).toBeUndefined();
        });

        it("should return undefined given no datetime operation", function () {
            var invalidDTOp = dateTime.manipulateDateTime();

            expect(invalidDTOp).toBeUndefined();
        });

        it("should return undefined given invalid duration", function () {
            var invalidDTOp = dateTime.manipulateDateTime("+fivem");

            expect(invalidDTOp).toBeUndefined();
        });

    });

})();
