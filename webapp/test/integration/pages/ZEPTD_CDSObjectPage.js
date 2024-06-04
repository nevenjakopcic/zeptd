sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'hr.axians.zeptd',
            componentId: 'ZEPTD_CDSObjectPage',
            contextPath: '/ZEPTD_CDS'
        },
        CustomPageDefinitions
    );
});