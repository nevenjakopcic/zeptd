sap.ui.define([
        "hr/axians/zeptd/controller/BaseController",
        "sap/ui/Device"
    ],
    function (Controller, Device) {
        "use strict";

        return Controller.extend("hr.axians.zeptd.controller.Detail", {
            onInit: function () {
                this.getRouter().getRoute("eptddetails").attachPatternMatched(this._onObjectMatched, this);

            },

            _onBindingChange: function () {
                let view = this.getView();
                let elementBinding = view.getElementBinding();

                if (!elementBinding.getBoundContext()) {
                    // TODO add detailObjectNotFound
                    this.getRouter().getTargets().display("detailObjectNotFound");
                    this.getOwnerComponent().listSelector.clearMasterListSelection();

                    return;
                }

                let path = elementBinding.getPath();
                this.getOwnerComponent().listSelector.selectAListItem(path);
            },

            _bindView: function (objectPath) {
                let view = this.getView();

                this.getView().bindElement({
                    path: objectPath,
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function () {
                            view.setBusy(true);
                        },
                        dataReceived: function () {
                            view.setBusy(false);
                        }
                    }
                });
            },

            _onObjectMatched: function (event) {
                this.getView().getModel("mainView").setProperty("/layout", "TwoColumnsMidExpanded");

                let objectPath = "/ZEPTD_CDS('" + event.getParameter("arguments").objectId + "')";
                this._bindView(objectPath);
            }
        });
    }
);