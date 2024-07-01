sap.ui.define([
    "sap/ui/base/Object",
    "sap/m/MessageBox"
], function(UI5Object, MessageBox) {
    "use strict";
    
    return UI5Object.extend("hr.axians.zeptd.controller.ErrorHandler", {

        constructor: function (component) {
            this._resourceBundle = component.getModel("i18n").getResourceBundle();
            this._component      = component;
            this._model          = component.getModel();
            this._messageOpen    = false;
            this._errorText      = this._resourceBundle.getText("errorText");

            this._model.attachMetadataFailed(function (event) {
                let params = event.getParameters();
                this._showServiceError(params.response);
            }, this);

            this._model.attachRequestFailed(function (event) {
                let params = event.getParameters();

                if (params.response.statusCode !== "404" || (params.response.statusCode === 404 && params.response.responseText.indexOf("Cannot POST") === 0)) {
                    this._showServiceError(params.response);
                }
            }, this);
        },

        _showServiceError: function (details) {
            if (this._messageOpen) {
                return;
            }

            this._messageOpen = true;
            MessageBox.error(
                this._errorText,
                {
                    id: "serviceErrorMessageBox",
                    details: details,
                    styleClass: this._component.getContentDensityClass(),
                    actions: [MessageBox.Action.CLOSE],
                    onClose: function () {
                        this._messageOpen = false;
                    }.bind(this)
                }
            );
        }
    });
});