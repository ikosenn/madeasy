(function () {
    "use strict";

    describe("Directive: Testing the list assign directive", function () {
        var rootScope, compile;
        var directiveTpl = "<sil-multiple-list-select " +
                                "listeditems='listeditems'" +
                                " assigneditems='assigneditems'>" +
                           "</sil-multiple-list-select>";

        beforeEach(function () {
            module("madeasy.common.directives.mutlipleListSelect");
            module("templates-app");
            module("templates-common");

            inject(["$rootScope", "$compile",
                function ($rootScope, $compile) {
                    rootScope = $rootScope;
                    compile = $compile;
                }
            ]);
        });
        it("should create mfl list assignment directive",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            var template = $compile(directiveTpl)(scope);

            scope.listeditems = [{id: "1", name: "National"}];
            scope.assigneditems = [{id: "2", name: "CHRIO"}];
            scope.$digest();

            var templateAsHtml = template.html();

            expect(templateAsHtml).toContain("National");
        }]));
        it("should test clickedItem function",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            var $element = $compile(directiveTpl)(scope);
            scope.$digest();
            var isolatedScope = $element.isolateScope();
            var test_obj = {
                selected : false
            };
            isolatedScope.clickedItem(test_obj);

            expect(test_obj.selected).toBeTruthy();
        }]));
        it("should test setItem function",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            var $element = $compile(directiveTpl)(scope);
            scope.$digest();
            var isolatedScope = $element.isolateScope();
            var test_obj = {
                set_selected : false
            };
            isolatedScope.setItem(test_obj);

            expect(test_obj.set_selected).toBeTruthy();
        }]));
        it("should test addItems function",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            scope.listeditems = [{id: "1", name: "National"}];
            scope.assigneditems = [
                {
                    id: "1",
                    name: "test",
                    selected: false,
                    set_selected: true
                },
                {
                    id: "1",
                    name : "National",
                    selected: true,
                    set_selected : false
                }
            ];
            var $element = $compile(directiveTpl)(scope);

            scope.$digest();
            var isolatedScope = $element.isolateScope();
            isolatedScope.filtered_items = [
                {
                    name: "test",
                    selected: false
                },
                {
                    name : "test_two",
                    selected : true
                }
            ];
            isolatedScope.addItems();
        }]));
        it("should test revertItems function",
        inject(["$rootScope", "$compile",function($rootScope, $compile) {
            var scope = $rootScope.$new();
            scope.listeditems = [{id: "1", name: "National"}];
            scope.assigneditems = [
                {
                    id: "1",
                    name: "test",
                    selected: false,
                    set_selected: true
                },
                {
                    id: "1",
                    name : "National",
                    selected: true,
                    set_selected : false
                }
            ];
            var $element = $compile(directiveTpl)(scope);
            scope.$digest();
            var isolatedScope = $element.isolateScope();

            isolatedScope.revertItems();

        }]));
    });
})();
