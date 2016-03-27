"use strict";

describe("Unit Test: madeasy.common.services.upload", function () {
    var User, httpBackend, serverUrl;

    beforeEach(function () {
        module("madeasy.common.services");
        module("madeasy.common.services.query_adapter");
        module("madeasy.auth.services");
        module("madeasy.config");

        inject(["$httpBackend", "madeasy.auth.services.login", "SERVER_URL",
            function (_httpBackend_, user, _serverUrl_) {
                User = user;
                httpBackend = _httpBackend_;
                serverUrl = _serverUrl_;
            }
        ]);

    });

    it("should upload an image", function () {
        var user = {
            "first_name": "Jordan",
            "organisation": "feb7d6fe-be08-4af9-b2d9-792a3085f7f2"
        };
        spyOn(User, "getUser").and.returnValue(user);

        var uploadLoc = "/api/attachment/";
        var file = new File([""], "filename.txt",
            {name: "file", size: 1900, type: "text/plain"});

        httpBackend.expectPOST(serverUrl + uploadLoc)
            .respond(200, "Success");

        inject(["madeasy.common.services.upload", function (upload) {
            var res = upload.uploadPhoto(file,{},uploadLoc);
            httpBackend.flush();
            expect(res.$$state.value).toEqual("Success");
        }]);
    });

    it("should fail to upload an image", function () {
        var user = {
            "first_name": "Jordan",
            "organisation": "feb7d6fe-be08-4af9-b2d9-792a3085f7f2"
        };
        spyOn(User, "getUser").and.returnValue(user);

        var uploadLoc = "/api/attachment/";
        var file = new File([""], "filename.txt",
            {name: "file", size: 1900, type: "text/plain"});

        httpBackend.expectPOST(serverUrl + uploadLoc)
            .respond(400, "Error");

        inject(["madeasy.common.services.upload", function (upload) {
            var res = upload.uploadPhoto(file,{},uploadLoc);
            httpBackend.flush();
            expect(res.$$state.value).toEqual("Error");
        }]);
    });
    it("should fail to upload an image when user doesnt exist", function () {

        spyOn(User, "getUser").and.returnValue(null);

        var uploadLoc = "/api/attachment/";
        var file = new File([""], "filename.txt",
            {name: "file", size: 1900, type: "text/plain"});

        inject(["madeasy.common.services.upload", function (upload) {
            var res = upload.uploadPhoto(file,{},uploadLoc);
            expect(res.$$state.value).toEqual("Please assign an organisation " +
                "to the current logged in user");
        }]);
    });
    it("should fail to upload an image when user doesnt have an organisation",
        function () {

            var user = {
                "first_name": "Jordan"
            };
            spyOn(User, "getUser").and.returnValue(user);

            var uploadLoc = "/api/attachment/";
            var file = new File([""], "filename.txt",
                {name: "file", size: 1900, type: "text/plain"});

            inject(["madeasy.common.services.upload", function (upload) {
                var res = upload.uploadPhoto(file,{},uploadLoc);
                expect(res.$$state.value).toEqual("Please assign an " +
                    "organisation to the current logged in user");
            }]);
        }
    );
});
