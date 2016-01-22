"use strict";

describe("Unit Test: Fire Webcam Service", function () {
    var webcamService;

    beforeEach(function () {
        module("emr.common.services.query_adapter");
        module("emr.common.webcamStarter");

        inject(["emr.webcamStarter", function (_webcamService) {
            webcamService = _webcamService;
        }]);
    });

    it("Should not allow the user to capture an image when the " +
        "channel is not set up. i.e width and height attributes", function () {
            // when video element is not set up
            var video = null;
            var videoAttributes = null;
            var selector = null;

            var args = webcamService.startWebcam(selector, videoAttributes,
            video);

            expect(args).toBeFalsy();
        });

    it("Should not allow the user to capture an image when the " +
        "channel  set up. but the canvas is not.", function () {
            // video element is set up but the canvas element is not.
            var video = document.createElement("video");
            video.setAttribute("height", 240);
            video.setAttribute("width", 320);
            var videoAttributes = {x: 0, y: 0, w: 0, h: 0};

            var selector = null;

            var args = webcamService.startWebcam(selector, videoAttributes,
            video);

            expect(args).toBeFalsy();
        });

    it("Should allow the user to capture an image when the " +
        "channel is well set up. i.e video and canvas are set", function () {
            // Set up the webcam appropriately when both the canvas and the
            // video elements are set up
            var canvas = document.createElement("canvas");
            var video = document.createElement("video");
            video.setAttribute("height", 240);
            video.setAttribute("width", 320);
            var canvasID = "#testerID";
            canvas.setAttribute("id", canvasID);
            canvas.setAttribute("height", 240);
            canvas.setAttribute("width", 320);

            spyOn(document, "querySelector").andReturn(canvas);
            spyOn(document, "createElement").andReturn(canvas);

            var videoAttributes = {x: 0, y: 0, w: 320, h: 240};
            var selector = document.querySelector(canvasID);
            var result = webcamService.startWebcam(selector, videoAttributes,
                video);

            var size = video.height * video.width * 4;
            var dataURI = canvas.toDataURL();
            var contentType = dataURI.split(",")[0].split(":")[1]
            .split(";")[0];

            expect(result.showImage).toBeTruthy();
            expect(result.saveImageButton).toBeTruthy();
            expect(result.size).toEqual(size);
            expect(result.dataURI).toEqual(dataURI);
            expect(result.type).toEqual(contentType);
        });
});
