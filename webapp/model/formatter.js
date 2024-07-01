sap.ui.define([
    "sap/ui/model/type/Currency"
], function(Currency) {
    "use strict";
    
    return {
        
        /**
         * Rounds the currency value to 2 digits
         * 
         * @public
         * @param {string} value value to be formatted
         * @returns {string} formatted currency value with 2 digits
         */
        currencyValue: function (value) {
            if (!value) {
                return "";
            }
            return parseFloat(value).toFixed(2);
        },

        /**
         * Rounds the currency value to 2 digits
         * 
         * @public
         * @param {number} quantity product quantity
         * @param {number} price product price
         * @param {string} currencyCode currency code for the price
         * @returns {string} formatted currency value with 2 digits
         */
        calculateItemTotal: function (quantity, price, currencyCode) {
            let currency = new Currency({showMeasure: false});
            let total    = quantity * price;

            return currency.formatValue([total.toFixed(2), currencyCode], "string");
        },

        /**
         * Converts a binary string into an image format suitable for the src attribute
         * 
         * @public
         * @param {string} data a binary string representing the image data
         * @returns {string} formatted string with image metadata based on the input or a default image when the input is empty
         */
        handleBinaryContent: function (data) {
            if (data) {
                let metaData1 = 'data:image/jpeg;base64, ';
                let metaData2 = data.substr(104);
                return metaData1 + metaData2;
            } else {
                return "../images/Employee.png";
            }
        }
    }
});