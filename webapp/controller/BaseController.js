sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ],
    function (Controller, History) {
        "use strict";

        return Controller.extend(
            "hr.axians.zeptd.controller.BaseController",
            {
                getRouter: function () {
                    return this.getOwnerComponent().getRouter();
                },

                getListSelector: function () {
                    return this.getOwnerComponent().listSelector;
                },

                getResourceBundle: function () {
                    return this.getOwnerComponent()
                        .getModel("i18n")
                        .getResourceBundle();
                },

                onNavBack: function () {
                    let previousHash = History.getInstance().getPreviousHash();

                    if (previousHash !== undefined) {
                        // the history contains a previous entry
                        history.go(-1);
                    } else {
                        // otherwise we go backwards with a forward history
                        let replace = true;
                        this.getRouter().navTo("masterlist", {}, replace);
                    }
                }
            }
        );
    }
);