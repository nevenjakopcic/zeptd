sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "hr/axians/zeptd/model/models",
    "hr/axians/zeptd/controller/ListSelector",
    "hr/axians/zeptd/controller/ErrorHandler"
],
    function (UIComponent, Device, models, ListSelector, ErrorHandler) {
        "use strict";

        return UIComponent.extend("hr.axians.zeptd.Component", {

            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                this.listSelector = new ListSelector();
                this._errorHandler = new ErrorHandler(this);

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();
            },

            destroy: function () {
                this.listSelector.destroy();
                this._errorHandler.destroy();

                UIComponent.prototype.destroy.apply(this, arguments);
            },

            /**
             * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
             * design mode class should be set, which influences the size appearance of some controls.
             * @public
             * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
             */
            getContentDensityClass: function () {
                if (this._contentDensityClass === undefined) {
                    // check whether FLP has already set the content density class; do nothing in this case
                    if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
                        this._contentDensityClass = "";
                    } else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
                        this._contentDensityClass = "sapUiSizeCompact";
                    } else {
                        // "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
                        this._contentDensityClass = "sapUiSizeCozy";
                    }
                }
                return this._contentDensityClass;
            }
        });
    }
);