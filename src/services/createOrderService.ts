const createOrder = (data:any) => {
    
    const seats = 0;
    const wheelchairs = 0;
    const baggage = 0;
    const paymentType:{[key:string]: number} = {
        "CASH":0,
        "CARD_PRESENT": 5,
        "BILLED": 10,
        "VOUCHER": 30,
        "ETICKET": 41,
    }

    return {
        "order" : {
            "company_id" : 1,
            "provider_id" : 1,
            "items":[
                {
                    "@type": "passengers",
                    "seq": 0,
                    "passenger": {
                        "name": data.name,
                        "phone":data.phone, // full phone number including country code
                        "email": data.email
                    },
                    "client_id": 0,
                    "account": null,
                    "require": {
                        "seats": seats, // amount of seats
                        "wc": wheelchairs, // number of wheelchairs
                        "bags": baggage // amount of bag spaces
                    },
                    "pay_info": // payment data, e.g cash, card reader
                        [
                            {
                                "@t": paymentType[data.paymentMethod],
                                "data": null
                                // data required for the chosen payment method: CASH: null, CARD_PRESENT: null, ETICKET: { code: string }, BILLED: { account_id: integer, code: string }, VOUCHER: { voucher_id: long }
                            }
                        ],
                    "custom_fields": {
                        "tag.driver.1": "true", // Driver tags to be used in the booking 
                        "tag.vehicle.1": "true" // Vehicle tag to be used in the booking
                    }
                }
            ],
            "route": {
                "dist": 6264, // TOTAL route distance in meters
                "est_dur": 683, // estimated TOTAL duration in seconds
                "nodes": [
                    {
                        "actions": // contains action such as pick up, drop off
                            [
                                {
                                    "@type": "client_action",
                                    "item_seq": 0, // passenger seq
                                    "action": "in" // pick up
                                }
                            ],
                        "location": {
                            "name": "Järnvägsgatan 3, 582 22 Linköping, Sweden", // pick up address
                            "coords": [15626493, 58415701] // pick up coordinates, coordinates from google maps are multiplied by 1e6 (15.626493, 58.415701 => 15626493, 58415701) and parsed as [Long, Lat]
                        },
                        "times": {
                            "arrive": {
                                "target": 1487890582, // pick up time: timestamp in unix seconds
                                "latest": 0 // leave this at 0
                            }
                        },
                        "info": {
                            "all": "Needs help with luggage" // a message to the driver or ""
                        },
                        "seq": 0 // "sequence" number
                    },
                    {
                        "actions": [
                            {
                                "@type": "client_action",
                                "item_seq": 0, // passenger seq
                                "action": "out" // drop off
                            }
                        ],
                        "location": {
                            "name": "Teknikringen 1A, Linköping, Sweden", // drop off address
                            "coords": [15566656, 58393584] // drop off coordinates
                        },
                        "times": null, // can be null for drop off node
                        "info": {},
                        "seq": 1 // "sequence" number
                    }
                    ],
                "legs": [
                        {
                            "meta": {
                                "dist": 5496, // estimated leg distance
                                "est_dur": 603 // estimated leg duration
                            },
                            "pts":
                                [
                                    15621480,
                                    58410380,
                                    15619850,
                                    58410130,
                                    15620170,
                                    58409480,
                                    15618970,
                                    58409330,
                                    15618900,
                                    58409300,
                                    15618800,
                                    58409240,
                                    15618610,
                                    58408880,
                                    15618220,
                                    58408300,
                                    15618090,
                                    58408170,
                                    15617930,
                                    58408070 // more ...
                                ],
                            "from_seq": 0,
                            "to_seq": 1
                        }
                    ],
                "meta" : {
                
                }
            }
        }
    }
}