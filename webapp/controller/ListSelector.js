sap.ui.define([
    "sap/ui/base/Object"
], function(BaseObject) {
    "use strict";

    return BaseObject.extend("hr.axians.zeptd.controller.ListSelector", {
        constructor: function () {
            this._whenListHasBeenSet = new Promise(function (resolveListHasBeenSet) {
                this._resolveListHasBeenSet = resolveListHasBeenSet;
            }.bind(this));

            this.whenListLoadingIsDone = new Promise(function (resolve, reject) {
                this._whenListHasBeenSet
                    .then(function (list) {
                        list.getBinding("items")
                            .attachEventOnce("dataReceived",
                            function (oData) {
                                if (!oData.getParameter("data")) {
                                    reject({
                                        list: list,
                                        error: true
                                    });
                                }

                                let firstListitem = list.getItems()[0];
                                if (firstListitem) {
                                    resolve({
                                        list: list,
                                        error: false
                                    });
                                }
                            });
                    });
            }.bind(this));
        },

        setBoundMasterList: function (list) {
            this._list = list;
            this._resolveListHasBeenSet(list);
        },

        selectAListItem: function (bindingPath) {
            this.whenListLoadingIsDone.then(
                function () {
                    let list = this._list, selectedItem;

                    if (list.getMode() === "None") {
                        return;
                    }

                    selectedItem = list.getSelectedItem();

                    // skip update if the current selection is already matching the object path
                    if (selectedItem && selectedItem.getBindingContext().getPath() === bindingPath) {
                        return;
                    }

                    list.getItems().some(function (item) {
                        if (item.getBindingContext() && item.getBindingContext().getPath() === bindingPath) {
                            list.setSelectedItem(item);
                            return true;
                        }
                    });
                }.bind(this));
        },

        clearMasterListSelection: function () {
            this._whenListHasBeenSet.then(function () {
                this._list.removeSelections(true);
            }.bind(this));
        }
    });
});