"use strict";

(function () {
    describe("Test the Paginate Directive: ", function () {
        var $scope, template, elem, $element, resource, controllerBindings,
            silPaginateController;
        var templateUrl = "sil.grid.pagination.tpl.html";

        beforeEach(function () {
            module("madeasy.common");
            module("madeasy.resources");
            module("sil.grid.pagination.tpl.html");
        });

        beforeEach (inject(["$compile", "$rootScope", "$templateCache",
            "queryAdapter", "$controller", "madeasy.resources.encounter",
            function ($compile, $rootScope, $templateCache, adapter, $controller,
                encounterResource) {
                template = $templateCache.get(templateUrl);
                $templateCache.put(templateUrl, template);
                $scope = $rootScope.$new();
                $scope.getData = function (params) {
                    return params;
                };
                resource = encounterResource;
                $scope.paginator = adapter.handlePaging(resource);

                $element = angular.element(
                    "<sil-paginate paginator='paginator' " +
                    "get-data='getData'></sil-paginate>"
                );
                elem = $compile($element)($scope);
                $scope.$digest();
                controllerBindings = {
                    getData: $scope.getData,
                    paginator: $scope.paginator
                };
                silPaginateController = $controller("silPaginateController", {
                    $scope: $scope
                }, controllerBindings);
            }]));

        it ("Should go to next page", function () {
            spyOn(silPaginateController.paginator, "getNextPage");
            silPaginateController.nextPage();
            expect(silPaginateController.paginator.getNextPage).toHaveBeenCalled();
        });

        it("Should go to the previous page", function () {
            spyOn(silPaginateController.paginator, "getPreviousPage");
            silPaginateController.previousPage();
            expect(
                silPaginateController.paginator.getPreviousPage).toHaveBeenCalled();
        });

        it("Should go to the first page", function () {
            spyOn(silPaginateController.paginator, "getFirstPage");
            silPaginateController.firstPage();
            expect(silPaginateController.paginator.getFirstPage).toHaveBeenCalled();
        });

        it("Should go to the last page", function () {
            spyOn(silPaginateController.paginator, "getLastPage");
            silPaginateController.lastPage();
            expect(silPaginateController.paginator.getLastPage).toHaveBeenCalled();
        });

        it("Should go to a specified page", function () {
            var pageNumber = 2;
            spyOn(silPaginateController.paginator, "getPage");
            silPaginateController.goToPage(pageNumber);
            expect(
                silPaginateController.paginator.getPage)
                    .toHaveBeenCalledWith(pageNumber);
        });

        it("Should not return message if paginator is defined and the pageNumber " +
            "is not truthy", function () {
                spyOn(silPaginateController.paginator, "getTotalPages")
                    .and.returnValue(30);
                silPaginateController.paginator.getTotalPages();

                expect(silPaginateController.notify(35)).not.toEqual("");
                expect(silPaginateController.notify(1)).toEqual("");
                expect(silPaginateController.notify("1")).toEqual("");
            });

        it("Should not return message if paginator is undefined and the " +
            "pageNumber is truthy", function () {
                expect(silPaginateController.notify(35)).toEqual("");
            });
    });
})();
