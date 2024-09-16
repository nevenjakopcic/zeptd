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
                    xml: "",
                    deliveryItems: [],
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

            toggleFullScreen: function () {
                let fullScreen = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
                this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !fullScreen);
                if (!fullScreen) {
                    // store current layout and go full screen
                    this.getModel("appView").setProperty("/previousLayout", this.getModel("appView").getProperty("/layout"));
                    this.getModel("appView").setProperty("/layout", "MidColumnFullScreen");
                } else {
                    // reset to previous layout
                    this.getModel("appView").setProperty("/layout", this.getModel("appView").getProperty("/previousLayout"));
                }
    
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

                    let detailView = this.getModel("detailView");
                    let bodyData, childrenData;

                    // Delivery data is needed for creation of XML
                    this.getView().getModel().read(`/ZEPTD_CDS(${this._objectId})`, {
                        success: function (data) {
                            bodyData = data;
                            console.log("Body data:", bodyData);
                        },
                        error: function (error) {
                            console.error("Error fetching body data:", error);
                        }
                    });

                    // Delivery item data is needed for creation of XML
                    this.getView().getModel().read("/ZEPTD_ITEM_CDS", {
                        urlParameters: {
                            "$filter": "DeliveryDocument eq '" + this._objectId + "'"
                        },
                        success: function (data) {
                            childrenData = data.results;
                            console.log("Children data:", childrenData);

                            if (bodyData) {
                                let xml = XmlGenerator.generate(bodyData, childrenData);
                                detailView.setProperty("/xml", xml);
                            }
                        },
                        error: function (error) {
                            console.error("Error fetching item data:", error);
                        }
                    });

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