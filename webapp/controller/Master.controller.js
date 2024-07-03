sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "sap/m/GroupHeaderListItem",
    "sap/ui/Device",
    "sap/ui/core/Fragment",
    "../model/formatter",
    "sap/ui/core/format/DateFormat"
],
    function (BaseController, JSONModel, Filter, FilterOperator, Sorter, GroupHeaderListItem, Device, Fragment, formatter, DateFormat) {
        "use strict";

        return BaseController.extend("hr.axians.zeptd.controller.Master", {

            formatter: formatter,

            /**
             * Called when the master list controller is instantiated. It sets up the event handling for the master/detail communication and other lifecycle tasks.
             * @public
             */
            onInit: function () {
                let list = this.byId("list");
                let viewModel = this._createViewModel();
                let originalBusyDelay = list.getBusyIndicatorDelay();

                this._groupFunctions = {
                    CreationDate: function (context) {
                        let creationDate = context.getProperty("CreationDate");

                        return {
                            key: creationDate,
                            text: creationDate
                        }
                    }.bind(this)
                }

                this._monthNameFormat = DateFormat.getInstance({ pattern: "MMMM" });

                this._list = list;

                this._listFilterState = {
                    filter: [],
                    search: []
                }

                this.setModel(viewModel, "masterView");

                list.attachEventOnce("updateFinished", function () {
                    viewModel.setProperty("/delay", originalBusyDelay);
                });

                this.getView().addEventDelegate({
                    onBeforeFirstShow: function () {
                        this.getOwnerComponent().listSelector.setBoundMasterList(list);
                    }.bind(this)
                });

                this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
                this.getRouter().attachBypassed(this.onBypassed, this);
            },


            /* =========================================================== */
            /* event handlers                                              */
            /* =========================================================== */

            /**
             * After list data is available, this handler method updates the
             * master list counter
             * @param {sap.ui.base.Event} event the update finished event
             * @public
             */
            onUpdateFinished: function (event) {
                // update the master list object counter after new data is loaded
                this._updateListItemCount(event.getParameter("total"));
            },

            /**
             * Event handler for the master search filed. Applies current
             * filter value and triggers a new search. If the search field's
             * 'refresh' button has been pressed, no new search is triggered
             * and the list binding if refreshed instead.
             * @param {sap.ui.base.Event} event the search event
             * @public
             */
            onSearch: function (event) {
                if (event.getParameters().refreshButtonPressed) {
                    this.onRefresh();
                    return;
                }

                let query = event.getParameter("query");

                if (query) {
                    this._listFilterState.search = [new Filter("DeliveryDocument", FilterOperator.Contains, query)];
                } else {
                    this._listFilterState.search = [];
                }
                this._applyFilterSearch();

            },

            /**
             * Event handler for refresh event. Keeps filter, sort
             * and group settings and refreshes the list binding.
             * @public
             */
            onRefresh: function () {
                this._list.getBinding("items").refresh();
            },

            /**
             * Event handler for the filter, sort and group buttons to open the ViewSettingsDialog.
             * @param {sap.ui.base.Event} event the button press event
             * @public
             */
            onOpenViewSettings: function (event) {
                let dialogTab = "filter";
                if (event.getSource().isA("sap.m.Button")) {
                    let buttonId = event.getSource().getId();
                    if (buttonId.match("sort")) {
                        dialogTab = "sort";
                    } else if (buttonId.match("group")) {
                        dialogTab = "group";
                    }
                }

                // load asynchronous XML fragment
                if (!this._viewSettingsDialog) {
                    this._viewSettingsDialog = Fragment.load({
                        id: this.getView().getId(),
                        name: "hr.axians.zeptd.view.ViewSettingsDialog",
                        controller: this
                    }).then(function (dialog) {
                        // connect dialog to the root view of this component (models, lifecycle)
                        this.getView().addDependent(dialog);
                        dialog.addStyleClass(this.getOwnerComponent().getContentDensityClass());

                        return dialog;
                    }.bind(this));
                }
                
                this._viewSettingsDialog.then(function (dialog) {
                    dialog.open(dialogTab);
                });
            },

            /**
             * Event handler called when ViewSettingsDialog has been confirmed, i.e.
             * has been closed with 'OK'.
             * @param {sap.ui.base.Event} event the confirm event
             * @public
             */
            onConfirmViewSettingsDialog: function (event) {
                let filterItems = event.getParameter("filterItems");
                let filters     = [];
                let captions    = [];

                filterItems.forEach(function (item) {
                    switch (item.getKey()) {
                        case "Delivered":
                            filters.push(new Filter("CreationDate", FilterOperator.NE, null));
                            break;
                        case "NotDelivered":
                            filters.push(new Filter("CreationDate", FilterOperator.EQ, null));
                            break;
                        default:
                            break;
                    }

                    captions.push(item.getText());
                });

                this._listFilterState.filter = filters;
                this._updateFilterBar(captions.join(", "));
                this._applyFilterSearch();
                this._applyGrouper(event);
            },

            /**
             * Apply the chosen grouper to the master list
             * @param {sap.ui.base.Event} event the confirm event
             * @private
             */
            _applyGrouper: function (event) {
                let params  = event.getParameters();
                let path;
                let descending;
                let sorters = [];

                // apply sorter to binding
                if (params.groupItem) {
                    path = params.groupItem.getKey();
                    descending = params.groupDescending;
                    let group = this._groupFunctions[params.groupItem.getKey()];
                    sorters.push(new Sorter(path, descending, group));
                }

                this._list.getBinding("items").sort(sorters);
            },

            /**
             * Event handler for the list selection event
             * @param {sap.ui.base.Event} event the list selectionChange event
             */
            onSelectionChange: function (event) {
                let list     = event.getSource();
                let selected = event.getParameter("selected");

                // skip navigation when deselecting an item in multi selection mode
                if (!(list.getMode() === "MultiSelect" && !selected)) {
                    // get the list item, either from the listItem parameter or from the event's source itself (will depend on the device-dependent mode).
                    this._showDetail(event.getParameter("listItem") || event.getSource());
                }
            },

            /**
             * Event handler for the bypassed event, which is fired when no routing pattern matched.
             * If there was an object selected in the master list, that selection is removed.
             * @public
             */
            onBypassed: function () {
                this._list.removeSelections(true);
            },

            /**
             * 
             * @param {Object} group group whose text is to be displayed
             * @public
             * @returns {sap.m.GroupHeaderListItem} group header with non-capitalized caption.
             */
            createGroupHeader: function (group) {
                return new GroupHeaderListItem({
                    title: group.text,
                    upperCase: false
                });
            },


            /* =========================================================== */
            /* internal methods                                            */
            /* =========================================================== */

            _createViewModel: function () {
                return new JSONModel({
                    isFilterBarVisible: false,
                    filterBarLabel: "",
                    delay: 0,
                    titleCount: 0,
                    noDataText: this.getResourceBundle().getText("masterListNoDataText")
                });
            },

            _onMasterMatched: function () {
                // set the layout property of the FCL control to 'OneColumn'
                this.getModel("appView").setProperty("/layout", "OneColumn");
            },

            _showDetail: function (item) {
                let replace = !Device.system.phone;

                //set the layout property of FCL control to show two columns
                this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
                this.getRouter().navTo("eptddetails", {
                    objectId: item.getBindingContext().getProperty("DeliveryDocument")
                }, replace);
            },

            /**
             * Sets the item count on the master list header
             * @param {int} totalItems the total number of items in the list
             * @private
             */
            _updateListItemCount: function (totalItems) {
                // only update the counter if the length is final
                if (this._list.getBinding("items").isLengthFinal()) {
                    this.getModel("masterView").setProperty("/titleCount", totalItems);
                }
            },

            /**
             * Internal helper method to apply both filter and search state together on the list binding
             * @private
             */
            _applyFilterSearch: function () {
                let filters   = this._listFilterState.search.concat(this._listFilterState.filter);
                let viewModel = this.getModel("masterView");

                this._list.getBinding("items").filter(filters, "Application");

                // changes the noDataText of the list in case there are no filter results
                if (filters.length !== 0) {
                    viewModel.setProperty("/noDataText", this.getResourceBundle().getText("masterListNoDataWithFilterOrSearchText"));
                } else if (this._listFilterState.search.length > 0) {
                    // only reset the no data text to default when no new search was triggered
                    viewModel.setProperty("/noDataText", this.getResourceBundle().getText("masterListNoDataText"));
                }
            },

            /**
             * Internal helper method that sets the filter bar visibility property and the label's caption to be shown
             * @param {string} filterBarText the selected filter value
             */
            _updateFilterBar: function (filterBarText) {
                let viewModel = this.getModel("masterView");
                viewModel.setProperty("/isFilterBarVisible", (this._listFilterState.filter.length > 0));
                viewModel.setProperty("/filterBarLabel", this.getResourceBundle().getText("masterFilterBarText", [filterBarText]));
            }
        });
    }
);