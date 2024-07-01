sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
],
    function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend("hr.axians.zeptd.controller.App", {

            onInit: function () {
                let originalBusyDelay = this.getView().getBusyIndicatorDelay();

                let viewModel = new JSONModel({
                    busy: true,
                    delay: 0,
                    layout: "OneColumn",
                    previousLayout: "",
                    actionButtonsInfo: {
                        midColumn: {
                            fullScreen: false
                        }
                    }
                });
                this.setModel(viewModel, "appView");

                let setAppNotBusy = function () {
                    viewModel.setProperty("/busy", false);
                    viewModel.setProperty("/delay", originalBusyDelay);
                };

                this.getOwnerComponent().getModel().metadataLoaded().then(setAppNotBusy);
                this.getOwnerComponent().getModel().attachMetadataFailed(setAppNotBusy);

                this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
            }
        });
    }
);