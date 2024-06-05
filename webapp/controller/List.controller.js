sap.ui.define([
        "hr/axians/zeptd/controller/BaseController",
        "sap/ui/Device"
    ],
    function (Controller, Device) {
        "use strict";

        return Controller.extend("hr.axians.zeptd.controller.List", {
            onInit: function () {
                let list = this.byId("list");
                this._list = list;

                this.getView().addEventDelegate({
                    onBeforeFirstShow: function () {
                        this.getOwnerComponent().listSelector.setBoundMasterList(this._list);
                    }.bind(this)
                });
                
                this.getRouter().getRoute("masterlist").attachPatternMatched(this._onListMatched, this);
                this.getRouter().attachBypassed(this.onBypassed, this);
            },

            _navigateToEPTDDetails: function (deliveryDocument, replace) {
                this.getRouter().navTo(
                    "eptddetails",
                    {
                        objectId: deliveryDocument
                    },
                    replace
                );
            },

            _showDetail: function (item) {
                let replace = !Device.system.phone;
                let deliveryDocument = item.getBindingContext().getProperty("DeliveryDocument");

                this._navigateToEPTDDetails(deliveryDocument, replace);
            },

            onSelect: function (event) {
                this._showDetail(event.getParameter("listItem") || event.getSource());
            },

            onBypassed: function () {
                this._list.removeSelections(true);
            },

            _onListMatched: function () {
                this.getListSelector().whenListLoadingIsDone.then(
                    function (params) {
                        if (params.list.getMode() === "None") {
                            return;
                        }

                        let objectId = params.firstListitem.getBindingContext().getProperty("DeliveryDocument");

                        this._navigateToEPTDDetails(objectId, true);
                    }.bind(this));
            }
        });
    }
);