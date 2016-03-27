(function (angular, _) {
    "use strict";

    angular.module("madeasy.common.errorMessages", [
        "madeasy.common.services.js_data_alerts"
    ])

    .service("errorMessage", [
        "madeasy.common.service.js_data_alerts", "madeasy.common.adapter.utils",
        function (alert, adapter) {
            var e = this;

            /**
            *   @function getKeysInArrayWithObj
            *   @param {object} array - an array containing an object [{k: v}]
            *   @returns {object}
            *   @description
            *   This Method gets object keys when an object is contained inside an
            *   array. e.g
            *    err = {
            *       data: [
            *           {
            *               'valid_from': 'some message',
            *               'valid_to': 'some other message'
            *           }
            *       ]
            *   }
            */
            var getKeysInArrayWithObj = function (array) {
                var keys = [];
                _.each(array, function (obj, index) {
                    // Errors from the backend that come as an array are
                    // contained in one object with keys and their respective
                    // values
                    _.each(array[index], function (value, key) {
                        // Loop through [{k: v}, {k: v}, {k: v}]
                        keys.push(key);
                    });
                });
                return keys;
            };

            /**
            *   @function getObjKeys
            *   @param {object} obj
            *   @return {object}
            *   @description
            *   Return object keys in the order they were presented
            */
            var getObjKeys = function (obj) {
                var keys = [];
                if (!_.isArray(obj)) {
                    _.each(obj, function (value, key) {
                        keys.push(key);
                    });
                    return keys;
                } else {
                    return getKeysInArrayWithObj(obj);
                }
            };

            /**
            *   @function getObjValues
            *   @param {object} obj - an object
            *   @returns {object}
            *   @description
            *   Return object values in the order they were presented
            */
            var getObjValues = function (obj) {
                var values = [];
                _.each(obj, function (value) {
                    if (_.isArray(value)) {
                        _.each(value, function (msg) {
                            values.push(msg);
                        });
                    } else {
                        values.push(value);
                    }
                });
                return values;
            };

            /**
            *   @function hasUnderscore
            *   @param {string} word - a string of characters e.g 'friend'
            *   @returns {boolean}
            *   @description
            *   What?
            *       This method checks if a certain word contains underscores
            *
            *   Why?
            *       A word with an underscore means those are two words.
            *       This will be used to display errors to the user on the UI
            *       in a friendly way. A word like "patient" would be displayed
            *       as "Patient".
            */
            var hasUnderscore = function (word) {
                var delimiter = "_";
                var result = (word.indexOf(delimiter) > -1) ? true : false;
                return result;
            };

            /**
            *   @function capitalize
            *   @param {string} string - a string of characters e.g 'friend'
            *   @returns {string}
            *   @description
            *   What?
            *       This method capitalizes the first character of a string.
            *   Why?
            *       We need to give the user a nice feedback when errors arise.
            *       a field such as "person" is well formatted to "Person"
            */
            var capitalize = function (string) {
                var firstChar = string.charAt(0).toUpperCase();
                var otherChars = string.substring(1).toLowerCase();
                return firstChar + otherChars;
            };

            /**
            *   @function capitalizeStrippedWords
            *   @param {object} array - an array of strings e.g ['first', 'name']
            *   @returns {string}
            *   @description
            *   This method capitalizes every word present in an array.
            */
            var capitalizeStrippedWords = function (array) {
                var uiName = "";
                _.each(array, function (value) {
                    uiName += " " + capitalize(value);
                });
                return uiName.substr(1);
            };

            /**
            *   @function stripUnderscore
            *   @param {string} word - a string e.g first_name
            *   @returns {string}
            *   @description
            *   This method strips underscores from a word and capitalizes
            *   the first letters for the stripped words.
            */
            var stripUnderscore = function (word) {
                if (hasUnderscore(word)) {
                    // Check if the word has undersore(s)
                    var words = word.split("_");
                    return capitalizeStrippedWords(words);
                }
                return capitalize(word);
            };

            /**
            *   @function extractObjectWithinObjects
            *   @param {object} array - an array of objects
            *   @returns {object}
            *   @description
            *   This function extracts objects within objects.
            *   Some of the errors returned by the API are in the form of an obejct
            *   i.e {k: v}. JS-DATA returns all the validations as an array of
            *   objects. i.e [{}, {}]. But if the validations are themselve
            *   contained in an object, then we have to loop through them to extract
            *   the messages. i.e [{k: {k: v}}]
            */
            var extractObjectWithinObjects = function (array) {
                var finalValidations = [];
                var obj = {};
                _.each(array, function (value) {
                    // Loop the array and get index, obj e.g 0, {k: v}
                    // i.e {k: {k: v}}
                    _.each(value, function (val, key) {
                        if (_.isObject(val)) {
                            // Loop through the value containing an object
                            // and upack the value to a single object
                            _.each(val, function (v, k) {
                                obj[stripUnderscore(k)] = v;
                            });
                        } else {
                            obj[stripUnderscore(key)] = val;
                        }
                    });
                    finalValidations.push(obj);
                });
                return finalValidations;
            };

            /**
            *   @function mapObjectWithKeys
            *   @param {object} keysArray - an array containing keys to an
            *   object
            *   @param {object} valuesArray - array containing values to an *
            *   object
            *   @returns {object}
            *   @description
            *   What?
            *     This method maps object keys with their respective values
            *   Why?
            *     Object keys need to be formatted so that keys like
            *     "first_name" can be well presented to the user as "First Name"
            *      for a friendly feedback.
            */
            var mapObjectWithKeys = function (keysArray, valuesArray) {
                var validations = [];
                var obj = {};
                _.each(keysArray, function (value, index) {
                    obj[stripUnderscore(keysArray[index])] = valuesArray[index];
                });
                validations.push(obj);
                // Check to see if the array contains objects with objects e.g
                // [{k: v}, {k: {k: v}}]
                var result = [];
                result = extractObjectWithinObjects(validations);
                return result;
            };

            /**
            *   This closure tries to filter validation messages from the API
            *   @function showError
            *   @param {object} err - an object containing validation messgaes
            *   @return {object}
            */
            e.showError = function (err, errorMsg) {
                errorMsg = errorMsg || "Validation Error";
                var traverse = function (err) {

                    if (err.status === -1 || err.status === 0) {
                        // Handles the case of an unreachable api server
                        errorMsg = "Error";
                        err = "Sorry, a connection error occurred";
                    }
                    else if (adapter.objContainsKey(err, "data") &&
                    !_.isNull(err.data)) {
                        // This part handle errors from the backend only
                        // The key "data" contains all validation messages
                        // from the backend. Handle validation here
                        var validations = err.data;
                        var keysArray = getObjKeys(validations);
                        var valuesArray = getObjValues(validations);
                        var mappedLogs = mapObjectWithKeys(keysArray, valuesArray);
                        return mappedLogs;
                    }
                    // This section handles all the front-end errors. E.g
                    // If there's no internet(production case), the frontend
                    // is put in a such a way that it gives some kind of
                    // feedback to the UI. The <sil-js-data-alerts>
                    // directive iterates through an array of objects and
                    // we therefore need to convert these single string
                    // values into array of objects.

                    // So in this case,
                    // Make an object with the 'data' key and call on the
                    // `traverse()` function which will now handle this
                    // error in the If block above and return our desired
                    // results.
                    var singleErrObj = {
                        "data": {}
                    };

                    singleErrObj.data[errorMsg] = err;
                    return traverse(singleErrObj, errorMsg);
                };
                var validations = [];
                var msg = traverse (err);
                validations.push(msg);
                return alert.showErr(msg, errorMsg);
            };

            e.showSuccess = function (success, msg) {
                success = success || "Record has been saved successfully";
                msg = msg || "Success";
                return alert.showOk(success, msg);
            };

            e.showWarning = function (warning, title) {
                title = title || "Warning";
                return alert.showWarning(warning, title);
            };

            e.showInfo = function (info, title) {
                title = title || "Info";
                return alert.showInfo(info, title);
            };
        }
    ]);
}) (angular, _);
