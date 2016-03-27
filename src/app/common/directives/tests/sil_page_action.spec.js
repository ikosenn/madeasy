(function () {
    "use strict";

    describe("Test silPageAction directive", function () {
        var compile, scope, html, compiledDirective;

        beforeEach(function () {
            module("madeasy.common.directives.pageAction");

            inject(["$rootScope", "$compile",
                function (_rootScope_, _compile_) {
                    scope = _rootScope_.$new();
                    compile = _compile_;
                    html = `
                        <sil-page-action
                            button-class="success"
                            ui-sref="admin.location"
                            icon="table"
                            action-name="Location List">
                        </sil-page-action>
                    `;
                }
            ]);

            compiledDirective = function () {
                var element = angular.element(html);
                var comp = compile(element)(scope);
                scope.$digest();

                return comp;
            };
        });

        it("should have compiled directive", function () {
            var comp = compiledDirective();

            expect(comp.html()).toBeDefined();
        });

        it("should have replaced the directive", function () {
            var comp = compiledDirective().find("sil-page-action");

            expect(comp.length).toEqual(0);
        });

        it("should have 'fa fa-table' in the <i> tag", function () {
            var comp = compiledDirective().find("i");

            expect(comp.hasClass("fa fa-table")).toBeTruthy();
        });
    });
})();
