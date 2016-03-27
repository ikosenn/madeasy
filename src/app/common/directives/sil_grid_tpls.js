(function (angular) {
    "use strict";

    var sil_grid_table_template = "sil.grid.table.tpl.html";
    var sil_grid_filters_template = "sil.grid.filters.tpl.html";
    var sil_grid_pagination_template = "sil.grid.pagination.tpl.html";

    angular.module(sil_grid_table_template, []).run(["$templateCache",
        function ($templateCache) {
            $templateCache.put(sil_grid_table_template,
                `<sil-filters metadata="metadata" filter="filter"
                    search="search" get-data="getData"
                    resource="resource.class">
                 </sil-filters>
                 <div class="panel-body">
                   <div id="no-more-tables">
                     <table class="table table-responsive table-hover">
                       <thead class="thead-default">
                         <tr>
                           <th ng-repeat="col in columns">
                             <sil-grid-table-ordering columns="columns">
                               <i class="fa fa-sort"
                                 ng-if="col.sortable !== ''"
                                 ng-click="orderData(col.sortable, $event)"
                                 id="ordering-icon">
                               </i>{{col.display}}
                             </sil-grid-table-ordering>
                           </th>
                           <th>Actions</th>
                         </tr>
                       </thead>
                       <tbody>
                         <tr ng-repeat="item in list">
                           <td ng-repeat="col in columns"
                             data-title="{{col.display}}">
                             {{item[col.name]  || "not provided" |
                             date: col.date_format}}
                           </td>
                           <td>
                             <sil-row-level-action
                               row-level-actions-list="rowLevelActionsList"
                               item="item">
                             </sil-row-level-action>
                           </td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                 </div>
                 <sil-paginate paginator="paginator" get-data="getData">
                 </sil-paginate>`);
        }]);

    angular.module(sil_grid_filters_template, []).run(["$templateCache",
        function ($templateCache) {
            $templateCache.put(sil_grid_filters_template,
                `<div class="panel-header">
                  <div class="row pt20">
                    <div class="sil-col-7">
                      <div class="sil-col-4">
                        <select ng-model="filterField" class="form-control"
                          ng-options="filterField for filterField in
                            filterFieldsFunc(metadata.filterFields)"
                          ng-change="getDataType(metadata.filterFields,
                            filterField)">
                          <option value="">Filter {{resource}} by...</option>
                        </select>
                      </div>
                      <div class="sil-col-8">
                        <form ng-submit="filterData(filterField, filterValue)">
                          <div class="input-group"
                            ng-show="dataType == 'text'">
                            <input class="form-control" type="text"
                              ng-model="filterValue"
                          placeholder="Filter {{resource}} by {{filterField}}"/>
                            <span class="input-group-btn">
                              <button class="btn btn-default btn-lg">
                                <i class="fa fa-filter"></i>
                              </button>
                            </span>
                          </div>
                          <div class="input-group"
                            ng-show="dataType == 'number'">
                            <input class="form-control" type="number"
                              ng-model="filterValue"
                          placeholder="Filter {{resource}} by {{filterField}}"/>
                            <span class="input-group-btn">
                              <button class="btn btn-default btn-lg">
                                <i class="fa fa-filter"></i>
                              </button>
                            </span>
                          </div>
                          <div class="input-group"
                            ng-show="dataType == 'date-time'">
                            <div class="sil-col-5">
                              <input class="form-control" type="text"
                                placeholder="From"/>
                            </div>
                            <div class="sil-col-5">
                              <input class="form-control" type="text"
                                placeholder="To"/>
                            </div>
                          </div>
                          <div class="input-group"
                            ng-show="dataType == 'method'">
                            <input class="form-control" type="text"
                              ng-model="filterValue"
                          placeholder="Filter {{resource}} by {{filterField}}"/>
                            <span class="input-group-btn">
                              <button class="btn btn-default btn-lg">
                                <i class="fa fa-filter"></i>
                              </button>
                            </span>
                          </div>
                          <div class="input-group"
                            ng-show="dataType == 'boolean'">
                            <input class="form-control" type="text"
                              ng-model="filterValue"
                          placeholder="Filter {{resource}} by {{filterField}}"/>
                            <span class="input-group-btn">
                              <button class="btn btn-default btn-lg">
                                <i class="fa fa-filter"></i>
                              </button>
                            </span>
                          </div>
                          <div class="input-group"
                            ng-show="dataType == 'choice'">
                            <input class="form-control" type="text"
                              ng-model="filterValue"
                          placeholder="Filter {{resource}} by {{filterField}}"/>
                            <span class="input-group-btn">
                              <button class="btn btn-default btn-lg">
                                <i class="fa fa-filter"></i>
                              </button>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div class="sil-col-5 pull-right">
                      <div class="sil-col-12">
                        <form ng-submit="searchData(searchParam)">
                          <div class="input-group">
                            <input class="form-control" ng-model="searchParam"
                              type="text" placeholder="Search {{resource}}"/>
                            <span class="input-group-btn">
                              <button class="btn btn-default btn-lg">
                                <i class="fa fa-search"></i>
                              </button>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>`);
        }]);

    angular.module(sil_grid_pagination_template, []).run(["$templateCache",
        function ($templateCache) {
            $templateCache.put(sil_grid_pagination_template,
                `<div class="panel-footer">
                  <div class="row">
                    <div class="sil-col-6">
                      <table class="table table-responsive">
                        <tbody>
                          <tr>
                          <td id="paging-info">
                            <strong>{{sPC.paginator.getPageStartIndex()}}</strong>
                          </td>
                          <td id="paging-info">-</td>
                          <td id="paging-info">
                            <strong>{{sPC.paginator.getPageEndIndex()}}</strong>
                          </td>
                          <td id="paging-info">of</td>
                          <td id="paging-info">
                            <strong>{{sPC.paginator.getTotalItemCount()}}</strong>
                          </td>
                          <td id="paging-info">records</td>
                          <td id="paging-info">
                            <strong>{{sPC.paginator.getCurrentPage()}}</strong>
                          </td>
                          <td id="paging-info">of</td>
                          <td id="paging-info">
                            <strong>{{sPC.paginator.getTotalPages()}}</strong>
                          </td>
                          <td id="paging-info">Pages</td>
                          <td id="paging-info">Enter</td>
                          <td id="paging-info">Page</td>
                          <td id="paging-info">
                            <input type="number" class="form-control"
                              ng-model="sPC.pageParam" id="page-number-input"/>
                          </td>
                          <td id="paging-info">
                            <button class="btn btn-success btn-sm"
                              ng-click="sPC.goToPage(sPC.pageParam)">Go
                            </button>
                          </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="sil-col-4">
                      <span class="notify">
                        {{sPC.notify(sPC.pageParam)}}
                      </span>
                    </div>
                    <div class="sil-col-2">
                      <table class="table table-responsive">
                        <tbody>
                          <tr>
                            <td id="paging-info">
                              <button id="paging-navigation"
                                  class="btn btn-default btn-sm"
                                  ng-click="sPC.firstPage()">
                                <i class="fa fa-angle-double-left"></i>
                              </button>
                            </td>
                            <td id="paging-info">
                              <button id="paging-navigation"
                                  class="btn btn-default btn-sm"
                                  ng-click="sPC.previousPage()">
                                <i class="fa fa-angle-left"></i>
                              </button>
                            </td>
                            <td id="paging-info">
                              <button id="paging-navigation"
                                  class="btn btn-default btn-sm"
                                  ng-click="sPC.nextPage()">
                                <i class="fa fa-angle-right"></i>
                              </button>
                            </td>
                            <td id="paging-info">
                              <button id="paging-navigation"
                                  class="btn btn-default btn-sm"
                                  ng-click="sPC.lastPage()">
                                <i class="fa fa-angle-double-right"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>`);
        }]);
}(angular));
