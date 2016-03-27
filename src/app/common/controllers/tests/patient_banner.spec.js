"use strict";

describe("Tests for the Photo Uploader controller", function () {
    var scope, controller, DS, state, httpBackend, linker, User,
    pPhotoUrl, silAlerts, modal, domWindow;

    beforeEach(function () {
        module("js-data-mocks");
        module("madeasy.resources.common.userPhoto");
        module("madeasy.resources.patients.linkPatients");
        module("madeasy.resources.visits.triage");
        module("madeasy.patients.filters");
        module("madeasy.common.controllers.patientBanner");
        module("madeasy.common.errorMessages");

        inject(["$rootScope", "$controller", "$state", "DS",
            "madeasy.resource.linkPatients", "$httpBackend", "SERVER_URL",
            "madeasy.auth.services.login", "errorMessage", "$uibModal", "$window",
            function ($rootScope, $controller, _state, _DS, _linker,
                _httpBackend_, serverUrl, user, _silAlerts_, _modal_, $window) {

                domWindow = $window;
                state = _state;
                modal = _modal_;
                state.params.patientID = "4568hggh76";
                scope = $rootScope.$new();
                DS = _DS;
                httpBackend = _httpBackend_;
                linker = _linker;
                User = user;
                silAlerts = _silAlerts_;

                var data = {
                    $scope: scope,
                    $state: _state,
                    linker: _linker,
                    modal: _modal_,
                    silAlerts: _silAlerts_
                };

                controller = function () {
                    var ctrl = $controller(
                    "madeasy.common.patientBannerLoader", data);
                    return ctrl;
                };
            }
        ]);
    });
    it("Should display patient's basic details", function () {

        var data = {
            active: true,
            id: "4568hggh76",
            organisation: "myHospital",
            patientID: "qwerghj",
            person_details: {
                contact_set: [
                    {
                        contact: "02029402943"
                    }
                ],
                date_of_birth: "1994-10-10",
                first_name: "Denis",
                gender_name: "Male",
                last_name: "Karanja",
                other_names: "Mburu",
                personphoto_set: [
                    {
                        data: "https://someurl/fodler/somephoto.jpg"
                    },
                    {
                        data: "https://someurl/folder/anotherphoto.png"
                    }
                ]
            },
            person_resource: {
                gender_resource: {
                    display: "Male"
                }
            }
        };
        controller();

        DS.expectFind("patient", state.params.patientID).respond(data);

        scope.displayPatientBanner();

        scope.$apply();
        DS.flush();

        expect(scope.patient).toEqual(data);
    });

    it("Should default gender to unkown if absent", function () {

        var data = {
            active: true,
            id: "4568hggh76",
            organisation: "myHospital",
            patientID: "qwerghj",
            person_details: {
                contact_set: [
                    {
                        contact: "02029402943"
                    }
                ],
                date_of_birth: "1994-10-10",
                first_name: "Denis",
                gender_name: null,
                last_name: "Karanja",
                other_names: "Mburu",
                personphoto_set: [
                    {
                        data: "https://someurl/fodler/somephoto.jpg"
                    },
                    {
                        data: "https://someurl/folder/anotherphoto.png"
                    }
                ]
            },
            person_resource: {
                gender_resource: {
                    display: "Male"
                }
            }
        };
        controller();

        DS.expectFind("patient", state.params.patientID).respond(data);

        scope.displayPatientBanner();

        scope.$apply();
        DS.flush();

        expect(scope.patient).toEqual(data);
        expect(scope.gender).toEqual("Unknown");
    });

    it("Should display NULL when no contact details are available",
    function () {
        var data = {
            active: true,
            id: "4568hggh76",
            organisation: "myHospital",
            patientID: "qwerghj",
            person_details: {
                contact_set: [],
                date_of_birth: "1994-10-10",
                first_name: "Denis",
                gender_name: "Male",
                last_name: "Karanja",
                other_names: "Mburu",
                personphoto_set: [
                    {
                        data: "https://someurl/fodler/somephoto.jpg"
                    },
                    {
                        data: "https://someurl/folder/anotherphoto.png"
                    }
                ]
            },
            person_resource: {
                gender_resource: {
                    display: "Male"
                }
            }
        };
        controller();

        DS.expectFind("patient", state.params.patientID).respond(data);

        scope.displayPatientBanner();

        scope.$apply();
        DS.flush();

        expect(scope.patient).toEqual(data);
        expect(scope.contacts).toEqual(0);
        expect(scope.contact).toEqual("NULL");
        expect(scope.oneContact).toBeTruthy();
    });

    it("Should display one contact number for a patient", function () {

        var data = {
            active: true,
            id: "4568hggh76",
            organisation: "myHospital",
            patientID: "qwerghj",
            person_details: {
                contact_set: [
                    {
                        contact: "02029402943"
                    }
                ],
                date_of_birth: "1994-10-10",
                first_name: "Denis",
                gender_name: "Male",
                last_name: "Karanja",
                other_names: "Mburu",
                personphoto_set: [
                    {
                        data: "https://someurl/fodler/somephoto.jpg"
                    },
                    {
                        data: "https://someurl/folder/anotherphoto.png"
                    }
                ]
            },
            person_resource: {
                gender_resource: {
                    display: "Male"
                }
            }
        };
        controller();

        DS.expectFind("patient", state.params.patientID).respond(data);

        scope.displayPatientBanner();

        scope.$apply();
        DS.flush();

        expect(scope.patient).toEqual(data);
        expect(scope.contacts).toEqual(1);
        expect(scope.oneContact).toBeTruthy();
    });

    it("Should display multiple contact numbers for a patient", function () {

        var data = {
            active: true,
            id: "4568hggh76",
            organisation: "myHospital",
            patientID: "qwerghj",
            person_details: {
                contact_set: [
                    {
                        contact: "02029402943"
                    },
                    {
                        contact: "07992498244"
                    }
                ],
                date_of_birth: "1994-10-10",
                first_name: "Denis",
                gender_name: "Male",
                last_name: "Karanja",
                other_names: "Mburu",
                personphoto_set: [
                    {
                        data: "https://someurl/fodler/somephoto.jpg"
                    },
                    {
                        data: "https://someurl/folder/anotherphoto.png"
                    }
                ]
            },
            person_resource: {
                gender_resource: {
                    display: "Male"
                }
            }
        };
        controller();

        DS.expectFind("patient", state.params.patientID).respond(data);

        scope.displayPatientBanner();

        scope.$apply();
        DS.flush();

        expect(scope.patient).toEqual(data);
        expect(scope.contacts).toEqual(2);
        expect(scope.manyContacts).toBeTruthy();
    });

    it("Should load the default image if photo wasn't taken", function () {
        var data = {
            active: true,
            id: "4568hggh76",
            organisation: "myHospital",
            patientID: "qwerghj",
            person_details: {
                contact_set: [
                    {
                        contact: "02029402943"
                    }
                ],
                date_of_birth: "1994-10-10",
                first_name: "Denis",
                gender_name: "Male",
                last_name: "Karanja",
                other_names: "Mburu",
                personphoto_set: []
            },
            person_resource: {
                gender_resource: {
                    display: "Male"
                }
            }
        };
        var defaultImage = "../assets/img/blue_guy.png";

        controller();

        DS.expectFind("patient", state.params.patientID).respond(data);

        scope.displayPatientBanner();

        scope.$apply();
        DS.flush();

        expect(scope.image).toEqual(defaultImage);
    });

    it("Should load patient image from the server", function () {
        var data = {
            active: true,
            id: "4568hggh76",
            organisation: "myHospital",
            patientID: "qwerghj",
            person_details: {
                contact_set: [
                    {
                        contact: "02029402943"
                    }
                ],
                date_of_birth: "1994-10-10",
                first_name: "Denis",
                gender_name: "Male",
                last_name: "Karanja",
                other_names: "Mburu",
                personphoto_set: [
                    {
                        data: "https://someurl/fodler/somephoto.jpg"
                    },
                    {
                        data: "https://someurl/folder/anotherphoto.png"
                    }
                ]
            },
            person_resource: {
                gender_resource: {
                    display: "Male"
                }
            }
        };

        controller();

        DS.expectFind("patient", state.params.patientID).respond(data);

        scope.displayPatientBanner();

        scope.$apply();
        DS.flush();

        expect(scope.image).toEqual(
            data.person_details.personphoto_set[0].data);
    });

    it("Should switch upload button `on` & initialize file data",
        function () {
        controller();
        var data = {
            name: "fake-image.jpg",
            size: 232342,
            type: "image/jpeg"
        };
        var fileData = new File([data], "fake-image.jpg");
        expect(scope.uploadComplete).toBeFalsy();

        scope.fileNameChanged(fileData);
        scope.$apply();

        expect(scope.uploadComplete).toBeFalsy();
        expect(scope.file).toEqual(fileData);
    });

    it("Should update cropped image from the patient banner", function () {
        var user = {
            "first_name": "Jordan",
            "organisation": "feb7d6fe-be08-4af9-b2d9-792a3085f7f2"
        };
        spyOn(User, "getUser").and.returnValue(user);
        var file = [
            {
                lastModified: 142892889244,
                name: "some-fake-name.jpg",
                type: "image/png"
            }
        ];
        scope.$dismiss = angular.noop;
        controller();

        httpBackend.expectPOST(pPhotoUrl).respond(200, "Success");
        scope.cropper = {};
        var dataURI =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAADwCAYAAAB";
        scope.cropper.croppedImage = dataURI;
        scope.file = file;
        scope.updatePatientImage();
        scope.$apply();

        httpBackend.flush();
        expect(scope.uploaded).toEqual("Success");
        expect(scope.uploadPhoto).toBeFalsy();
        expect(scope.initializePhotoUpdate).toBeFalsy();
    });

    it("Should fail to update cropped image from the patient banner", function
    () {
        var user = {
            "first_name": "Jordan",
            "organisation": "feb7d6fe-be08-4af9-b2d9-792a3085f7f2"
        };
        spyOn(User, "getUser").and.returnValue(user);
        var file = [
            {
                lastModified: 142892889244,
                name: "some-fake-name.gif",
                size: 10202203232,
                type: "image/gif"
            }
        ];
        controller();

        scope.cropper = {};
        var error = "Image size must be less than 1MB. You tried ";
        var domError = {
            msg : error,
            title : "Error",
            type : "danger"
        };
        var dataURI =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAADwCAYAAAB";
        scope.cropper.croppedImage = dataURI;
        scope.file = file;

        spyOn(silAlerts, "showError").and.returnValue(domError);

        scope.updatePatientImage();
        scope.$apply();

        expect(silAlerts.showError).toHaveBeenCalled();

        expect(scope.alert).toEqual(domError);
    });

    it("Should update webcam image from the patient banner", function () {
        var file = [
            {
                lastModified: 142892889244,
                name: "some-fake-name.jpg",
                type: "image/png"
            }
        ];
        controller();

        scope.cropper = {};
        scope.cropper.croppedImage = null;
        scope.file = file;
        scope.imageType = file[0].type;
        var dataURI =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAADwCAYAAAB";
        scope.imgBase64 = dataURI;
        scope.updatePatientImage();
        scope.$apply();

        expect(scope.uploadPhoto).toBeFalsy();
        expect(scope.initializePhotoUpdate).toBeFalsy();
    });

    it("Should load patient vitals to the banner if they exists", function () {
        controller();

        var triage = [
            {
                diastole: 80,
                height: 170,
                patient: state.params.patientID,
                systole: 120,
                temperature: 37.80,
                weight: 85
            }
        ];
        var params = {
            patient: state.params.patientID
        };

        DS.expectFindAll("triage", params).respond(triage);

        scope.loadVitals();

        scope.$apply();
        DS.flush();

        expect(scope.presentVitals[0].systole).toEqual(120);
        expect(scope.presentVitals[0].diastole).toEqual(80);
        expect(scope.presentVitals[0].temperature).toEqual(37.80);
    });

    it("Should inform users when no vitals are present.", function () {
        controller();

        var triage = [];

        var params = {
            patient: state.params.patientID
        };

        DS.expectFindAll("triage", params).respond(triage);

        scope.loadVitals();

        scope.$apply();
        DS.flush();

        var response = "Patient has no vitals details.";

        expect(scope.bmi).toBeUndefined();
        expect(scope.temperature).toBeUndefined();
        expect(scope.blood_pressure).toBeUndefined();
        expect(scope.vitals).toEqual(response);
    });

    it("Should load patient allergies if they are present", function () {
        controller();

        var presentAllergies = [
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            },
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            },
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            }
        ];

        var params = {
            patient: state.params.patientID
        };

        DS.expectFindAll("AlergyIntolerace", params).respond(presentAllergies);

        scope.loadAllergies();

        scope.$apply();
        DS.flush();
        expect(scope.presentAllergies.length).toBe(3);
    });

    it("Should show patient allergies if they are more than 6", function () {
        controller();
        /*Scope.moreAllergies = 0;*/
        var presentAllergies = [
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            },
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            },
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            },
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            },
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            },
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            },
            {
                allergy_criticality_name: "Low Risk",
                allergy_substance_name: "No Known Drug Allergies"
            }
        ];

        var params = {
            patient: state.params.patientID
        };

        DS.expectFindAll("AlergyIntolerace", params).respond(presentAllergies);

        scope.loadAllergies();

        scope.$apply();
        DS.flush();
        expect(scope.presentAllergies.length).toBe(7);
        expect(scope.moreAllergies).toBe(1);
    });

    it("Should inform user when no patient allergies are present",
        function () {
            controller();

            var allergy = [];

            var params = {
                patient: state.params.patientID
            };

            DS.expectFindAll("AlergyIntolerace", params).respond(
                allergy);

            scope.loadAllergies();

            scope.$apply();
            DS.flush();

            var response = "Patient has no known allergies.";

            expect(scope.alergyName).toBeUndefined();
            expect(scope.criticality).toBeUndefined();
            expect(scope.allergy).toEqual(response);
        }
    );

    // Webcam Tests
    it("Should raise an error when the webcam fails to start", function () {
        controller();

        expect(scope.webcamError).toBeFalsy();
        var err = "User Did not allow permision";

        var domError = {
            msg : err,
            title : "Error",
            type : "danger"
        };
        spyOn(silAlerts, "showError").and.returnValue(domError);
        scope.onError(err);
        scope.$apply();
        expect(silAlerts.showError).toHaveBeenCalled();

        expect(scope.webcamError).toEqual(err);
        expect(scope.startWebcam).toBeFalsy();
        expect(scope.alert).toEqual(domError);
    });

    it("Should load up canvas width and height if browser supports" +
        "`getUserMedia()`", function () {
            controller();
            scope.channel = {
                video: {
                    height: 240,
                    width: 320
                }
            };
            scope.videoAttributes = {h: 0, w: 0, x: 0, y: 0};

            scope.onSuccess();
            scope.$apply();

            expect(scope.showDemos).toBeTruthy();
            expect(scope.videoAttributes.w).toBe(320);
            expect(scope.videoAttributes.h).toBe(240);
        });

    it("Should start streaming the webcam with a live video", function () {
        controller();

        expect(scope.streamWebcam).toBeFalsy();

        scope.openWebcam();
        scope.$apply();

        expect(scope.streamWebcam).toBeTruthy();
        expect(scope.fileNotSelected).toBeTruthy();
    });

    it("Should allow a user to take a snapshot using the webcam", function () {
        controller();

        var canvas = domWindow.document.createElement("canvas");
        var video = domWindow.document.createElement("video");
        video.setAttribute("height", 240);
        video.setAttribute("width", 320);

        spyOn(domWindow.document, "querySelector").and.returnValue(canvas);
        spyOn(domWindow.document, "createElement").and.returnValue(canvas);

        scope.channel = {
            video: video
        };
        scope.videoAttributes = {h: 0, w: 0, x: 0, y: 0};

        scope.onSuccess();
        scope.$apply();

        scope.takeSnapshot();
        scope.$apply();

        expect(domWindow.document.querySelector).toHaveBeenCalled();
        expect(domWindow.document.createElement).toHaveBeenCalled();

        var queryArg = domWindow.document.querySelector.calls.argsFor(0)[0];
        var canvasCreate = domWindow.document.createElement.calls.argsFor(0)[0];

        expect(scope.showDemos).toBeTruthy();
        expect(scope.videoAttributes.w).toBe(320);
        expect(scope.videoAttributes.h).toBe(240);
        expect(queryArg).toEqual("#captureLiveImage");
        expect(canvasCreate).toEqual("canvas");

        expect(scope.cropper.croppedImage).toBeNull();
        expect(scope.enableUploadBtn).toBeTruthy();
        expect(scope.streamWebcam).toBeFalsy();
        expect(scope.fileNotSelected).toBeTruthy();
    });

    it("Should launch the patient photo uploader modal", function () {
        controller();
        expect(scope.initializePhotoUpdate).toBeFalsy();
        var file = "common/tpls/patient_photo_modal.tpl.html";
        httpBackend.expectGET(file).respond(200);
        scope.launchModal();
        scope.$apply();
        httpBackend.flush();

        expect(scope.initializePhotoUpdate).toBeTruthy();
    });
});
