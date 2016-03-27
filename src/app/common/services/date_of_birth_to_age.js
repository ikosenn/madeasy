(function (angular) {
    "use strict";

    angular.module("madeasy.common.convertors", [])

    .service("madeasy.common.dateOfBirthToAge", function () {
        var getAge = function (birthDate, endDate) {
            if (endDate) {
                endDate = new Date(endDate);
            }
            else {
                endDate = new Date();
            }
            birthDate = new Date(birthDate);

            var finalAge;
            var age = [],
            y = [endDate.getFullYear(), birthDate.getFullYear()],
            ydiff = y[0] - y[1],
            m = [endDate.getMonth(), birthDate.getMonth()],
            mdiff = m[0] - m[1],
            d = [endDate.getDate(), birthDate.getDate()],
            ddiff = d[0] - d[1];

            if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) {
                --ydiff;
            }

            if (mdiff < 0) {
                mdiff += 12;
            }

            if (ddiff < 0) {
                birthDate.setMonth(m[1] + 1, 0);
                ddiff = birthDate.getDate() - d[1] + d[0];
                --mdiff;
            }

            // The age is between 1 and 4 years
            // here we need to show only to the month precision
            // i.e. 3 years and 5 months
            if (ydiff > 0) {
                if (ydiff < 5) {
                    // Under 5 years, show the year and the month
                    // e.g. 4 years and 2 months
                    age.push(ydiff + " year" + (ydiff > 1 ? "s" : " "));
                    if (mdiff > 0) {
                        age.push(mdiff + " month" + (mdiff > 1 ? "s" : ""));
                        // No need to check if (age.length > 1)
                        // since the year is already > 0 && < 5
                        // and the month is also > 0 && < 6 months
                        age.splice(age.length - 1 , 0, " and ");
                        finalAge = age.join("");
                        return finalAge;
                    } else {
                        // No months e.g 3 years
                        return age.join("");
                    }
                } else {
                    // Above or 5 years, only show the year
                    // e.g. 20 years
                    age.push(ydiff + " years");
                    finalAge = age.join("");
                    return finalAge;
                }
            }

            // The age is less than a year
            // here we need to show only to the day precision
            // i.e. 4 months and 2 days
            if (mdiff > 0) {
                if (mdiff < 6) {
                    // Below 6 months, show the month(s) and day(s)
                    // e.g. 5 months and 22 days
                    age.push(mdiff + " month" + (mdiff > 1 ? "s" : ""));
                    if (ddiff > 0) {
                        age.push(ddiff + " day" + (ddiff > 1 ? "s" : ""));
                    }
                    if (age.length > 1) {
                        age.splice(age.length - 1 , 0, " and ");
                    }
                    finalAge = age.join("");
                    return finalAge;
                }
                else {
                    // Above 6 months, show the month(s) only
                    age.push(mdiff + " months");
                    finalAge = age.join("");
                    return finalAge;
                }
            } else {
                // No years, no months. Only days e.g. 2 days
                if (ddiff < 1) {
                    finalAge = "Less than a day old";
                    return finalAge;
                } else {
                    age.push(ddiff + " day" + (ddiff > 1 ? "s" : ""));
                    finalAge = age.join("");
                    return finalAge;
                }
            }
        };

        return {
            "getAge": getAge
        };
    });
})(angular);
