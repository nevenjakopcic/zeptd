sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "hr/axians/zeptd/model/models",
        "hr/axians/zeptd/controller/ListSelector"
    ],
    function (UIComponent, Device, models, ListSelector) {
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
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // instantiation of the list selector
                this.listSelector = new ListSelector();

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);