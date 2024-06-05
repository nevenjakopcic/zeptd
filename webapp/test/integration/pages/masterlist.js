sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'hr.axians.zeptd',
            componentId: 'masterlist',
            contextPath: '/ZEPTD_CDS'
        },
        CustomPageDefinitions
    );
});