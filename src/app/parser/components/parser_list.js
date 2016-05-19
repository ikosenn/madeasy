(function (angular, _) {
    "use strict";

    angular.module("madeasy.parser.parserGrid", [
        "sil.datalayer",
        "sil.listing.datatable"
    ])

    .component("madeasyParserList", {
        controller: "madeasy.parser.controllers.listController",
        controllerAs: "parserlistpage",
        template: `
            <sil-datatable on-refresh='parserlistpage.getData' cols='parserlistpage.cols'>
            <sil-datatable-title>

             <h3 class="sil-datatable-header-title"> <i class="fa fa-list"></i> Parser List View</h3>
           </sil-datatable-title>
            <sil-datatable-row ng-repeat='row in $parent.sildatatable.list'>
                <sil-datatable-cell data-title='Query'>
                    {{:: row.query}}
                </sil-datatable-cell>
                <sil-datatable-cell data-title='Response time'>
                    {{:: row.response_time}}
                </sil-datatable-cell>
                <sil-datatable-cell data-title='Correct'>
                    {{:: row.is_correct}}
                </sil-datatable-cell>
                <sil-datatable-cell data-title='Command'>
                    {{:: row.command_executed}}
                </sil-datatable-cell>
            </sil-datatable-row>
        </sil-datatable>`
    })

    .controller("madeasy.parser.controllers.listController", ListController);

    ListController.$inject = [
        "$injector", "$state", "silDataLayer"
    ];

    function ListController ($injector, $state, silDataLayer) {
        var self = this;
        self.serviceName = $state.current.data.service;
        self.cols = $state.current.data.columns;
        self.getData = function getData (params) {
            var args = angular.copy($state.current.data.defaultParams);
            _.extendOwn(args, params);

            return silDataLayer.list(self.serviceName.name, {"params": args})
            .then(function dataFxn (data) {
                    return data.data;
                }
            );
        };
    }

})(window.angular, window._);
