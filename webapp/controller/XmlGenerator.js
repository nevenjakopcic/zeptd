sap.ui.define([
    "../lib/xml-js",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/date/UI5Date"
], function (xml_js, DateFormat, UI5Date) {
    "use strict";

    return {
        generate: function () {
            let json = this.baseJsonTemplate();

            return js2xml(json, { compact: true, ignoreComment: true, spaces: 4 });
        },

        baseJsonTemplate: function () {
            return {
                "_declaration": {
                    "_attributes": {
                        "version": "1.0",
                        "encoding": "UTF-8",
                        "standalone": "yes"
                    }
                },
                "ns2:IE815": {
                    "_attributes": {
                        "xmlns": "urn:publicid:-:EC:DGTAXUD:EMCS:PHASE4:TMS:V3.13",
                        "xmlns:ns2": "urn:publicid:-:EC:DGTAXUD:EMCS:PHASE4:IE815:V3.13"
                    },
                    "ns2:Header": {
                        "MessageSender": "", // TODO
                        "MessageRecipient": "", // TODO
                        "DateOfPreparation": DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" }).format(UI5Date.getInstance()),
                        "TimeOfPreparation": DateFormat.getDateInstance({ pattern: "yyyy-MM-dd HH:mm:ss" }).format(UI5Date.getInstance()),
                        "MessageIdentifier": this.uuidv4()
                    },
                    "ns2:Body": {
                        "ns2:Attributes": {
                            "ns2:SubmissionMessageType": "1",
                            "ns2:DeferredSubmissionFlag": "0"
                        },
                        "ns2:ConsigneeTrader": {
                            "_attributes": {
                                "language": "hr"
                            },
                            "ns2:Traderid": "", // TODO
                            "ns2:TraderName": "", // TODO
                            "ns2:StreetName": "", // TODO
                            "ns2:Postcode": "", // TODO
                            "ns2:City": "" // TODO
                        },
                        "ns2:ConsignorTrader": {
                            "_attributes": {
                                "language": "hr"
                            },
                            "ns2:TraderExciseNumber": "", // TODO
                            "ns2:TraderName": "", // TODO
                            "ns2:StreetName": "", // TODO
                            "ns2:StreetNumber": "", // TODO
                            "ns2:Postcode": "", // TODO
                            "ns2:City": "", // TODO
                        },
                        "ns2:PlaceOfDispatchTrader": {
                            "_attributes": {
                                "language": "hr"
                            },
                            "ns2:ReferenceOfTaxWarehouse": "", // TODO
                            "ns2:TraderName": "", // TODO
                            "ns2:StreetName": "", // TODO
                            "ns2:StreetNumber": "", // TODO
                            "ns2:Postcode": "", // TODO
                            "ns2:City": "", // TODO
                        },
                        "ns2:DispatchImportOffice": {},
                        "ns2:ComplementConsigneeTrader": {},
                        "ns2:DeliveryPlaceCustomsOffice": {},
                        "ns2:CompetentAuthorityDispatchOffice": {
                            "ns2:ReferenceNumber": "" // TODO
                        },
                        "ns2:DocumentCertificate": {
                            "ns2:DocumentType": "3", // TODO check this
                            "ns2:DocumentReference": "" // TODO
                        },
                        "ns2:HeaderEad": {
                            "ns2:DestinationTypeCode": "99", // TODO check this
                            "ns2:JourneyTime": "", // TODO
                            "ns2:TransportArrangement": "1", // TODO check this
                        },
                        "ns2:TransportMode": {
                            "ns2:TransportModeCode": "3", // TODO check this
                            "ns2:ComplementaryInformation": {}
                        },
                        "ns2:MovementGuarantee": {
                            "ns2:GuarantorTypeCode": "1" // TODO check this
                        }
                    }
                }
            }
        },

        bodyEadJsonTemplate: function () {
            return {
                "ns2:BodyEad": {
                    
                }
            }
        },

        uuidv4: function () {
            return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
                (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
            );
        }
    };
});