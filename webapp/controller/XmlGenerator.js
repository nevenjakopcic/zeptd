sap.ui.define([
    "../lib/xml-js"
], function(xml_js) {
    "use strict";

    let json = {
        foo: "bar",
        banana: {
            orange: "haha"
        }
    }

    return {
        generate: function () {
            return js2xml(json, {compact: true, ignoreComment: true, spaces: 4});
        }
    }
});