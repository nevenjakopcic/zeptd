sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'hr/axians/zeptd/test/integration/FirstJourney',
		'hr/axians/zeptd/test/integration/pages/ZEPTD_CDSList',
		'hr/axians/zeptd/test/integration/pages/ZEPTD_CDSObjectPage'
    ],
    function(JourneyRunner, opaJourney, ZEPTD_CDSList, ZEPTD_CDSObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('hr/axians/zeptd') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheZEPTD_CDSList: ZEPTD_CDSList,
					onTheZEPTD_CDSObjectPage: ZEPTD_CDSObjectPage
                }
            },
            opaJourney.run
        );
    }
);