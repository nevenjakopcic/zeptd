sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel"
],
    function (BaseController, JSONModel) {
        "use strict";

        return BaseController.extend(
            "hr.axians.zeptd.controller.App", {
                onInit: function () {
                    let viewModel = new JSONModel({
                        layout: "OneColumn"
                    });

                    this.getView().setModel(viewModel, "mainView");
                }
            }
        );
    }
);