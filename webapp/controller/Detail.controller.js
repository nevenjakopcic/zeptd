sap.ui.define([
        "./BaseController",
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/util/File",
        "../model/formatter",
        "./XmlGenerator"
    ],
    function (BaseController, JSONModel, File, formatter, XmlGenerator) {
        "use strict";

        return BaseController.extend("hr.axians.zeptd.controller.Detail", {

            formatter: formatter,

            /* =========================================================== */
            /* lifecycle methods                                           */
            /* =========================================================== */

            onInit: function () {
                let viewModel = new JSONModel({
                    busy: false,
                    delay: 0,
                    lineItemListTitle: this.getResourceBundle().getText("detailLineItemTableHeading"),
                    xml: "test",
                    currency: "EUR"
                });

                this.getRouter().getRoute("eptddetails").attachPatternMatched(this._onObjectMatched, this);

                this.setModel(viewModel, "detailView");

                this.getOwnerComponent().getModel().metadataLoaded().then(this._onMetadataLoaded.bind(this));
            },
            
            /* =========================================================== */
            /* event handlers                                              */
            /* =========================================================== */

            onDownloadPress: function () {
                let content = this.getModel("detailView").getProperty("/xml");

                File.save(content, "zeptd", "xml");
            },

            onCloseDetailPress: function () {
                this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullscreen", false);
                this.getOwnerComponent().listSelector.clearMasterListSelection();
                this.getRouter().navTo("master");
            },

            /* =========================================================== */
            /* internal methods                                            */
            /* =========================================================== */

            _onObjectMatched: function (event) {
                let _arguments = event.getParameter("arguments");
                this._objectId = _arguments.objectId;

                // Don't show two columns when in fullscreen mode
                if (this.getModel("appView").getProperty("/layout") !== "MidColumnFullScreen") {
                    this.getModel("appView").setProperty("/layout", "TwoColumnsMidExpanded");
                }

                this.getModel().metadataLoaded().then( function () {
                    let objectPath = this.getModel().createKey("ZEPTD_CDS", {
                        DeliveryDocument: this._objectId
                    });
                    this._bindView("/" + objectPath);
                }.bind(this));
            },

            _bindView: function (objectPath) {
                let viewModel = this.getModel("detailView");

                viewModel.setProperty("/busy", false);

                this.getView().bindElement({
                    path: objectPath,
                    events: {
                        change: this._onBindingChange.bind(this),
                        dataRequested: function () {
                            viewModel.setProperty("/busy", true);
                        },
                        dataReceived: function () {
                            viewModel.setProperty("/busy", false);
                        }
                    }
                });
            },

            _onBindingChange: function () {
                let view = this.getView();
                let elementBinding = view.getElementBinding();

                if (!elementBinding.getBoundContext()) {
                    this.getRouter().getTargets().display("detailObjectNotFound");
                    this.getOwnerComponent().listSelector.clearMasterListSelection();

                    return;
                }

                let path = elementBinding.getPath();
                this.getOwnerComponent().listSelector.selectAListItem(path);

                let xml = XmlGenerator.generate();
                this.getModel("detailView").setProperty("/xml", xml);
            },

            _onMetadataLoaded: function () {
                let originalViewBusyDelay = this.getView().getBusyIndicatorDelay();
                let viewModel = this.getModel("detailView");
                
                viewModel.setProperty("/delay", 0);

                viewModel.setProperty("/busy", true);
                viewModel.setProperty("/delay", originalViewBusyDelay);
            }
        });
    }
);