"use strict";

describe("Unit Test: Fire Webcam Service", function () {
    var webcamService, domWindow;

    beforeEach(function () {
        module("madeasy.common.services.query_adapter");
        module("madeasy.common.webcamStarter");

        inject(["madeasy.webcamStarter", "$window",
        function (_webcamService, $window) {
            webcamService = _webcamService;
            domWindow = $window;
        }]);
    });

    it("Should not allow the user to capture an image when the " +
        "channel is not set up. i.e width and height attributes", function () {
            // When video element is not set up
            var video = null;
            var videoAttributes = null;
            var selector = null;

            var args = webcamService.startWebcam(selector, videoAttributes,
            video);

            expect(args).toBeFalsy();
        });

    it("Should not allow the user to capture an image when the " +
        "channel  set up. but the canvas is not.", function () {
            // Video element is set up but the canvas element is not.
            var video = domWindow.document.createElement("video");
            video.setAttribute("height", 240);
            video.setAttribute("width", 320);
            var videoAttributes = {h: 0, w: 0, x: 0, y: 0};

            var selector = null;

            var args = webcamService.startWebcam(selector, videoAttributes,
            video);

            expect(args).toBeFalsy();
        });

    it("Should allow the user to capture an image when the " +
        "channel is well set up. i.e video and canvas are set", function () {
            // Set up the webcam appropriately when both the canvas and the
            // video elements are set up
            var canvas = domWindow.document.createElement("canvas");
            var video = domWindow.document.createElement("video");
            video.setAttribute("height", 240);
            video.setAttribute("width", 320);
            var canvasID = "#testerID";
            canvas.setAttribute("id", canvasID);
            canvas.setAttribute("height", 240);
            canvas.setAttribute("width", 320);

            spyOn(domWindow.document, "querySelector").and.returnValue(canvas);
            spyOn(domWindow.document, "createElement").and.returnValue(canvas);

            var videoAttributes = {h: 240, w: 320, x: 0, y: 0};
            var selector = domWindow.document.querySelector(canvasID);
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
