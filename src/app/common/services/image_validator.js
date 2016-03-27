(function (angular) {
    "use strict";

    angular.module("madeasy.common.imageValidator", [])

    .service("madeasy.imageValidator", [function () {
        // Private methods
        var _validateImageType = function (imageType) {
            /* The param `imageType` is a string of the form `image/jpg` or
            * `image/png`.
            * This service validates the image types that are allowed for upload.
            * these types include
            * 1. `jpg`,
            * 2. `jpeg`
            * 3. `png` file types.
            * this function checks if an image is of the above types and retutn
            * a boolean value i.e returns true if the image is of the above types
            * and returns false is the image is not of the above types
            * @return Boolean
            */
            var _validExtensions = ["jpg", "jpeg", "png"];
            var realExtension = String(imageType).split("/")[1];
            // The split seperates the string into two parts ['image', 'jpg']
            // hence position [1] in the array
            if (_validExtensions.indexOf(realExtension) !== -1) {
                // Value is present
                return true;
            } else {
                return false;
            }
        };

        var _validateImageSize = function (imageSize) {
            /*
            * The param `imageSize` is an integer representing the size of the
            * image in `bytes`.
            * This service validates that the image size does not exceed 1024
            * Kilobytes i.e. an equivalent of 1 Megabyte or 1024000 bytes
            */
            var _allowedImageSize = 1024000;
            var size = parseInt(imageSize, 10);
            // You want to use radix 10 so that u get a leading zero even with
            // a leading zero e.g 003000
            if (size <= _allowedImageSize) {
                return true;
            } else {
                return false;
            }
        };

        // Public methods
        var validateImage = function (type, size) {
            if (_validateImageType(type) && _validateImageSize(size)) {
                return true;
            } else {
                return false;
            }
        };

        return {
            "validateImage": validateImage
        };
    }]);
})(angular);
