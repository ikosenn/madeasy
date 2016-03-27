(function () {
    "use strict";

    describe("Test silSidebar directives", function () {
        var compile, scope, html, compiledDirective;

        beforeEach(function () {
            module("madeasy.common.directives.sidebar");
            module("madeasy.common.directives.sidebarLabel");
            module("madeasy.common.directives.sidebarTitle");

            inject(["$rootScope", "$compile",
                function (_rootScope_, _compile_) {
                    scope = _rootScope_.$new();
                    compile = _compile_;
                    html = `
                        <sil-sidebar>
                            <sidebar-label label="Users"></sidebar-label>
                            <sidebar-title
                                sref="profile"
                                icon="user"
                                title="Profile">
                            </sidebar-title>
                        </sil-sidebar>
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

        it("should have compiled", function () {
            var comp = compiledDirective();

            expect(comp.html()).toBeDefined();
        });

        it("should have replaced the directive", function () {
            var comp = compiledDirective().find("sil-sidebar");

            expect(comp.length).toEqual(0);
        });

        it("should have 'fa fa-user' in the <span> tag", function () {
            var comp = compiledDirective().find("span");

            expect(comp.hasClass("fa fa-user")).toBeTruthy();
        });

        it("should have transcluded content", function () {
            var comp = compiledDirective().find("li");

            expect(comp.length).toEqual(2);
        });

        it("should have empty <span> given no icon attribute", function () {
            html = `
                <sil-sidebar>
                    <sidebar-label label="Users"></sidebar-label>
                    <sidebar-title
                        sref="profile"
                        title="Profile">
                    </sidebar-title>
                </sil-sidebar>
            `;

            var comp = compiledDirective().find("span:first-child");

            expect(comp.text()).toEqual("");
            expect(comp.text().length).toEqual(0);
        });
    });
})();
