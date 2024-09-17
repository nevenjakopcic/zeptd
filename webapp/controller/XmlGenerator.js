sap.ui.define([
    "../lib/xml-js",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/date/UI5Date"
], function (xml_js, DateFormat, UI5Date) {
    "use strict";

    return {
        generate: function (body, items) {
            let json = this.baseJsonTemplate(body, items);

            let xml = js2xml(json, { compact: false, ignoreComment: true, spaces: 4 });
            return xml;
        },

        baseJsonTemplate: function (body, items) {
            return {
                "declaration": {
                    "attributes": {
                        "version": "1.0",
                        "encoding": "UTF-8",
                        "standalone": "yes"
                    }
                },
                "elements": [
                    {
                        "type": "element",
                        "name": "ns2:IE815",
                        "attributes": {
                            "xmlns": "urn:publicid:-:EC:DGTAXUD:EMCS:PHASE4:TMS:V3.13",
                            "xmlns:ns2": "urn:publicid:-:EC:DGTAXUD:EMCS:PHASE4:IE815:V3.13"
                        },
                        "elements": [
                            {
                                "type": "element",
                                "name": "ns2:Header",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "MessageSender",
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "NDEA.HR"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "MessageRecipient",
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "NDEA.HR"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "DateOfPreparation",
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" }).format(UI5Date.getInstance())
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "TimeOfPreparation",
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": DateFormat.getDateInstance({ pattern: "yyyy-MM-dd HH:mm:ss" }).format(UI5Date.getInstance())
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "MessageIdentifier",
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": this.uuidv4()
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                "type": "element",
                                "name": "ns2:Body",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "ns2:SubmittedDraftOfEAD",
                                        "elements": [
                                            {
                                                "type": "element",
                                                "name": "ns2:Attributes",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:SubmissionMessageType",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "1"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:DeferredSubmissionFlag",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "0"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:ConsigneeTrader",
                                                "attributes": {
                                                    "language": "hr"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:Traderid",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:TraderName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderName
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:StreetName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderStreet
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:StreetNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderHouseNumber
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:Postcode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderPostalCode
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:City",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderCity
                                                            }
                                                        ]
                                                    },
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:ConsignorTrader",
                                                "attributes": {
                                                    "language": "hr"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:TraderExciseNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:TraderName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderName
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:StreetName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderStreet
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:StreetNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderHouseNumber
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:Postcode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderPostalCode
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:City",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderCity
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:PlaceOfDispatchTrader",
                                                "attributes": {
                                                    "language": "hr"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:ReferenceOfTaxWarehouse",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:TraderName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.PODTraderName
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:StreetName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.PODTraderStreet
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:StreetNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.PODTraderHouseNumber
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:Postcode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.PODTraderPostalCode
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:City",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.PODTraderCity
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:DispatchImportOffice"
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:ComplementConsigneeTrader"
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:DeliveryPlaceTrader",
                                                "attributes": {
                                                    "language": "hr"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:Traderid",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:TraderName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderName
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:StreetName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderStreet
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:StreetNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderHouseNumber
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:Postcode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderPostalCode
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:City",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderCity
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:DeliveryPlaceCustomsOffice"
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:CompetentAuthorityDispatchOffice",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:ReferenceNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "1"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:HeaderEad",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:DestinationTypeCode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "99"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:JourneyTime",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "D01"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:TransportArrangement",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "1"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:TransportMode",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:TransportModeCode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "3"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:ComplementaryInformation",
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:MovementGuarantee",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:GuarantorTypeCode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "1"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            ...this.generateBodyEads(items),
                                            {
                                                "type": "element",
                                                "name": "ns2:Ead",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:LocalReferenceNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "3674951286023000163840"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:InvoiceNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "41280-23010123-23"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:InvoiceDate",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "2023-07-26"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:OriginTypeCode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "1"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:DateOfDispatch",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "2023-07-26"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:TimeOfDispatch",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "01:23:45"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ns2:TransportDetails",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:TransportUnitCode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "2"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:IdentityOfTransportUnits",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "ZD 385 AO"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:ComplementaryInformation",
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ns2:SealInformation",
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        },

        generateBodyEads: function (items) {
            let bodyEads = [];
            for (let i = 0; i < items.length; i++) {
                let bodyEad = this.bodyEadJsonTemplate(i, items[i]);
                bodyEads.push(bodyEad);
            }

            return bodyEads;
        },

        bodyEadJsonTemplate: function (index, item) {
            return {
                "type": "element",
                "name": "ns2:BodyEad",
                "elements": [
                    {
                        "type": "element",
                        "name": "ns2:BodyRecordUniqueReference",
                        "elements": [
                            {
                                "type": "text",
                                "text": index + 1
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ns2:ExciseProductCode",
                        "elements": [
                            {
                                "type": "text",
                                "text": "1"
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ns2:CnCode",
                        "elements": [
                            {
                                "type": "text",
                                "text": "1"
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ns2:Quantity",
                        "elements": [
                            {
                                "type": "text",
                                "text": item.OriginalDeliveryQuantity
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ns2:GrossWeight",
                        "elements": [
                            {
                                "type": "text",
                                "text": item.ItemGrossWeight
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ns2:NetWeight",
                        "elements": [
                            {
                                "type": "text",
                                "text": item.ItemNetWeight
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ns2:AlcoholicStrength",
                        "elements": [
                            {
                                "type": "text",
                                "text": "1"
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ns2:FiscalMarkUsedFlag",
                        "elements": [
                            {
                                "type": "text",
                                "text": "false"
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ns2:CommercialDescription",
                        "attributes": {
                            "language": "hr"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": item.ProductDescription
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ns2:Package",
                        "elements": [
                            {
                                "type": "element",
                                "name": "ns2:KindOfPackages",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "1"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "ns2:NumberOfPackages",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "1"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "ns2:SealInformation",
                            }
                        ]
                    }
                ]
            }
        },

        uuidv4: function () {
            return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
                (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
            );
        }
    };
});