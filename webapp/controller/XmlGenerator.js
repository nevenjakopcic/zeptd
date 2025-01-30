sap.ui.define([
    "../lib/xml-js",
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/date/UI5Date"
], function (xml_js, DateFormat, UI5Date) {
    "use strict";

    return {
        generate: function (body, items) {
            console.log(items);
            items = this.preprocessItems(items);
            console.log(items);

            let json = this.baseJsonTemplate(body, items);

            let xml = js2xml(json, { compact: false, ignoreComment: true, spaces: 4 });
            return xml;
        },

        preprocessItems: function (items) {
            let output = [];
            
            // combine items of same material
            items.forEach(item => {
                let existing = output.filter(function(v, i) { return v["Material"] === item["Material"]});

                if (existing.length > 0) {
                    let existingIndex = output.indexOf(existing[0]);
                    output[existingIndex] = this.combineItems(output[existingIndex], item);
                } else {
                    output.push(item);
                }
            });

            return output;
        },

        combineItems: function (target, source) {
            target["ItemVolume"]       = Number(target["ItemVolume"])       + Number(source["ItemVolume"]);
            target["ItemGrossWeight"]  = Number(target["ItemGrossWeight"])  + Number(source["ItemGrossWeight"]);
            target["ItemNetWeight"]    = Number(target["ItemNetWeight"])    + Number(source["ItemNetWeight"]);
            target["NumberOfPackages"] = Number(target["NumberOfPackages"]) + Number(source["NumberOfPackages"]);

            return target;
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
                        "name": "ie815:IE815",
                        "attributes": {
                            "xmlns:ie815": "http://apisit.hr/b22/emcs/ie/2012/ie815",
                            "xmlns:tms": "http://apisit.hr/b22/emcs/ie/2012/tms"
                        },
                        "elements": [
                            {
                                "type": "element",
                                "name": "ie815:Header",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "tms:MessageSender",
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "NDEA.HR"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "tms:MessageRecipient",
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": "NDEA.HR"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "tms:DateOfPreparation",
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": DateFormat.getDateInstance({ pattern: "yyyy-MM-dd" }).format(UI5Date.getInstance())
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "tms:TimeOfPreparation",
                                        "elements": [
                                            {
                                                "type": "text",
                                                "text": DateFormat.getDateInstance({ pattern: "HH:mm:ss" }).format(UI5Date.getInstance())
                                            }
                                        ]
                                    },
                                    {
                                        "type": "element",
                                        "name": "tms:MessageIdentifier",
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
                                "name": "ie815:Body",
                                "elements": [
                                    {
                                        "type": "element",
                                        "name": "ie815:SubmittedDraftOfEADESAD",
                                        "elements": [
                                            {
                                                "type": "element",
                                                "name": "ie815:Attributes",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:SubmissionMessageType",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "1"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:DeferredSubmissionFlag",
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
                                                "name": "ie815:ConsigneeTrader",
                                                "attributes": {
                                                    "language": "hr"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:Traderid",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderId
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:TraderName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderName
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:StreetName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderStreet
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:StreetNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderHouseNumber
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:Postcode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsigneeTraderPostalCode
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:City",
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
                                                "name": "ie815:ConsignorTrader",
                                                "attributes": {
                                                    "language": "hr"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:TraderExciseNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderId
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:TraderName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderName
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:StreetName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderStreet
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:StreetNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderHouseNumber
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:Postcode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.ConsignorTraderPostalCode
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:City",
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
                                                "name": "ie815:PlaceOfDispatchTrader",
                                                "attributes": {
                                                    "language": "hr"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:ReferenceOfTaxWarehouse",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": items[0] ? items[0].PODTraderId : ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:TraderName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:StreetName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:StreetNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:Postcode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:City",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ie815:DispatchImportOffice"
                                            },
                                            {
                                                "type": "element",
                                                "name": "ie815:ComplementConsigneeTrader"
                                            },
                                            {
                                                "type": "element",
                                                "name": "ie815:DeliveryPlaceTrader",
                                                "attributes": {
                                                    "language": "hr"
                                                },
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:Traderid",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderId
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:TraderName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderName
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:StreetName",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderStreet
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:StreetNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderHouseNumber
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:Postcode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DeliveryPlaceTraderPostalCode
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:City",
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
                                                "name": "ie815:DeliveryPlaceCustomsOffice"
                                            },
                                            {
                                                "type": "element",
                                                "name": "ie815:CompetentAuthorityDispatchOffice",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:ReferenceNumber",
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
                                                "name": "ie815:HeaderEadEsad",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:DestinationTypeCode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DestinationTypeCode
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:JourneyTime",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "D05"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:TransportArrangement",
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
                                                "name": "ie815:TransportMode",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:TransportModeCode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "3"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:ComplementaryInformation",
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ie815:MovementGuarantee",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:GuarantorTypeCode",
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
                                                "name": "ie815:EadEsadDraft",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:LocalReferenceNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": this.generateLocalReferenceNumber(body.DeliveryDocument)
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:InvoiceNumber",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.InvoiceNumber
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:InvoiceDate",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.InvoiceDate ? body.InvoiceDate.toLocaleDateString('en-CA') : ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:OriginTypeCode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "1"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:DateOfDispatch",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": body.DateOfDispatch ? body.DateOfDispatch.toLocaleDateString('en-CA') : ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:TimeOfDispatch",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": sap.ui.core.format.DateFormat.getTimeInstance({pattern: "HH:mm:ss"}).format(new Date(body.TimeOfDispatch.ms))
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "element",
                                                "name": "ie815:TransportDetails",
                                                "elements": [
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:TransportUnitCode",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": "2"
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:IdentityOfTransportUnits",
                                                        "elements": [
                                                            {
                                                                "type": "text",
                                                                "text": ""
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:ComplementaryInformation",
                                                    },
                                                    {
                                                        "type": "element",
                                                        "name": "ie815:SealInformation",
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
            const regex = /\/\d+/g;
            
            return {
                "type": "element",
                "name": "ie815:BodyEadEsad",
                "elements": [
                    {
                        "type": "element",
                        "name": "ie815:BodyRecordUniqueReference",
                        "elements": [
                            {
                                "type": "text",
                                "text": index + 1
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ie815:ExciseProductCode",
                        "elements": [
                            {
                                "type": "text",
                                "text": item.ExternalProductGroup
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ie815:CnCode",
                        "elements": [
                            {
                                "type": "text",
                                "text": item.CommodityCode
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ie815:Quantity",
                        "elements": [
                            {
                                "type": "text",
                                "text": item.ItemVolume
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ie815:GrossMass",
                        "elements": [
                            {
                                "type": "text",
                                "text": item.ItemGrossWeight
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ie815:NetMass",
                        "elements": [
                            {
                                "type": "text",
                                "text": item.ItemNetWeight
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ie815:AlcoholicStrengthByVolumeInPercentage",
                        "elements": [
                            {
                                "type": "text",
                                "text": Number(item.AlcoholicStrength).toFixed(2)
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ie815:FiscalMarkUsedFlag",
                        "elements": [
                            {
                                "type": "text",
                                "text": "0"
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ie815:CommercialDescription",
                        "attributes": {
                            "language": "hr"
                        },
                        "elements": [
                            {
                                "type": "text",
                                "text": item.DeliveryDocumentItemText.replace("%", "vol").replace(regex, '')
                            }
                        ]
                    },
                    {
                        "type": "element",
                        "name": "ie815:Package",
                        "elements": [
                            {
                                "type": "element",
                                "name": "ie815:KindOfPackages",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": "CT"
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "ie815:NumberOfPackages",
                                "elements": [
                                    {
                                        "type": "text",
                                        "text": Math.ceil(Number(item.NumberOfPackages))
                                    }
                                ]
                            },
                            {
                                "type": "element",
                                "name": "ie815:SealInformation",
                            }
                        ]
                    }
                ]
            }
        },

        generateLocalReferenceNumber: function (deliveryDocument) {
            let yy = DateFormat.getDateInstance({ pattern: "yy" }).format(UI5Date.getInstance());            
            return "36749512860" + yy + deliveryDocument.padStart(9, "0"); 
        },

        uuidv4: function () {
            return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
                (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
            );
        }
    };
});