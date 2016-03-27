(function (angular) {
    "use strict";

    angular.module("madeasy.common.manipulators.dateTime", [])

    .service("madeasy.common.dateTimeManipulator", ["moment",
        function (moment) {
            /**
             * Format a date || time || dateTime to specified format
             * @param  {string} dateTime  datetime to be formatted
             * @param  {string} endFormat format to apply on the datetime
             * @return {string}           formatted datetime
             */
            var format = function (dateTime, endFormat) {
                var formattedDT = "";
                var m = moment(dateTime);

                if (m.isValid()) {
                    formattedDT = m.format(endFormat);
                }

                return formattedDT;
            };

            /**
             * Given a date and a time, combine to one datetime string
             * @param  {string} date           date part of datetime
             * @param  {string} time           time part of datetime
             * @param  {string} dateTimeFormat format used by the datetime
             * @return {string}                the combined datetime string
             */
            var combineDateTime = function (date, time, dateTimeFormat) {
                var dateTime = "";
                // Date
                var d = moment(date);
                // Time
                var t = moment(time);

                if (d.isValid() && t.isValid()) {
                    dateTime = moment([
                        d.year(),
                        d.month(),
                        d.date(),
                        t.hour(),
                        t.minute(),
                        t.second()
                    ]).format(dateTimeFormat);
                }

                return dateTime;
            };

            /**
             * Perform operations (add || subtract) on a given data || time
             * @param  {string} dateTimeOp  arithmetic operation to be done
             *                              e.g `+5m`, `+34s`
             * @return {object}           manipulated Date object
             */
            var manipulateDateTime = function (dateTimeOp) {
                dateTimeOp = dateTimeOp || "";
                var manipulatedDT = dateTimeOp;

                // One can only add or subtract to a date
                var ops = ["+", "-"];

                // One can only perform operations on `year`, `month`, `day`, `hour`
                // , `minute` or `second`
                var n = [
                    "y", "M", "d", "h", "m", "s"
                ];
                var dateTimeArr = dateTimeOp.split("");

                var operator = _.first(dateTimeArr);
                var period = _.last(dateTimeArr);

                // Check if a valid op (+ || -) exists in the first index
                // Check if a valid name (y, m, d, h, m, s) exists in the last index
                if (_.contains(ops, operator) && _.contains(n, period)) {

                    var num = dateTimeArr
                        .slice(1, dateTimeArr.length - 1).join("");

                    // Check if num is a number
                    if (_.isNumber(Number(num)) && !_.isNaN(Number(num))) {
                        manipulatedDT =
                            new Date(dateTimeOperation(operator, num, period));

                        return manipulatedDT;
                    }
                }
            };

            /**
             * Perform either addition or subtraction to current moment
             * @param  {string} operator operation sign e.g. + || -
             * @param  {string} duration number to perform operation on
             * @param  {string} period   can be months, days, hours, minutes e.t.c
             * @return {object}          moment object
             */
            function dateTimeOperation(operator, duration, period) {
                var datetime = moment();

                switch (operator) {
                    case "+":
                        datetime = datetime.add(duration, period);
                        break;
                    case "-":
                        datetime = datetime.subtract(duration, period);
                        break;
                }

                return datetime;
            }

            return {
                "combineDateTime": combineDateTime,
                "format": format,
                "manipulateDateTime": manipulateDateTime
            };
        }
    ]);
})(angular);
