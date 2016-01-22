"use strict";

describe("Unit Test: Image type and size validator", function () {
    var imageValidator;
    beforeEach(function () {
        module("emr.common.services.query_adapter");
        module("emrApp.config");
        module("emr.common.imageValidator");

        inject(["emr.imageValidator", function (_imageValidator) {
            imageValidator = _imageValidator;
        }]);
    });

    it("Should only allow images less than 1MB in size", function () {
        // only images less than 1024000 bytes in size should be allowed
        // into the SIL EMR GCE backet
        var imageSize = 45535; //45.535KBs
        var imageType = "image/jpg";
        var result = imageValidator.validateImage(imageType, imageSize);

        expect(result).toBeTruthy();
    });

    it("Should not allow images of greater than 1MB in size", function () {
        // do not allow images of a size greater than 1MB i.e. 1024KBs or
        // 1024000 bytes into the SIL EMR GCE bucket
        var imageSize = 1024001;
        var imageType = "image/png";
        var result = imageValidator.validateImage(imageType, imageSize);

        expect(result).toBeFalsy();
    });

    it("Should allow a jpeg image file type", function () {
        // allow a jpeg image file. i.e .jpeg extension
        var imageSize = 1024000;
        var imageType = "image/jpeg";
        var result = imageValidator.validateImage(imageType, imageSize);

        expect(result).toBeTruthy();
    });

    it("Should allow a jpg image file type", function () {
        // allow a jpg image file. i.e .jpg extension
        var imageSize = 378358;
        var imageType = "image/jpg";
        var result = imageValidator.validateImage(imageType, imageSize);

        expect(result).toBeTruthy();
    });

    it("Should allow a png image file type", function () {
        // allow a png image file. i.e .png extension
        var imageSize = 388942;
        var imageType = "image/png";
        var result = imageValidator.validateImage(imageType, imageSize);

        expect(result).toBeTruthy();
    });

    it("Should not allow image types other than jpg, jpeg and png", function ()
    {
        // allow a png image file. i.e .png extension
        var imageSize = 388942;
        var imageType = "image/gif";
        var result = imageValidator.validateImage(imageType, imageSize);

        expect(result).toBeFalsy();
    });

    it("Should not allow json files as to be uploaded as images", function ()
    {
        // allow a png image file. i.e .png extension
        var imageSize = 388942;
        var imageType = "application/json";
        var result = imageValidator.validateImage(imageType, imageSize);

        expect(result).toBeFalsy();
    });

});
