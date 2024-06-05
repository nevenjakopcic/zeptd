sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'hr/axians/zeptd/test/integration/FirstJourney',
		'hr/axians/zeptd/test/integration/pages/masterlist',
		'hr/axians/zeptd/test/integration/pages/eptddetails'
    ],
    function(JourneyRunner, opaJourney, masterlist, eptddetails) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('hr/axians/zeptd') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheMasterlist: masterlist,
					onTheEptddetails: eptddetails
                }
            },
            opaJourney.run
        );
    }
);