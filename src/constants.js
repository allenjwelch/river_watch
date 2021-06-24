const { REACT_APP_WEATHER_KEY } = process.env;

export const WATER_SERVICE_URL =  'https://waterservices.usgs.gov/nwis/iv/?format=json&sites={SITES}&parameterCd=00060,00065,99407,00011&siteStatus=all';
export const WEATHER_SERVICE_URL = `https://api.openweathermap.org/data/2.5/onecall?lat={LAT}&lon={LON}&units=imperial&exclude=minute&appid=${REACT_APP_WEATHER_KEY}`;

export const ERROR_MESSAGES = {
    NO_WATER: 'USGS Water Services not available',
    NO_WEATHER: 'Weather data not available'
}

export const STATION_VARIABLES = {
    'Discharge, cubic feet per second': 'Flow Rate',
    'Gage height, feet': 'Gage Height',
    'Escherichia coli, estimated by regression equation, water, colonies per 100 milliliters': 'E. Coli Level'
}

export const RIVERS = {
    CHATT: 'CHATT',
    OCMULGEE: 'OCMULGEE'
}

export const LOCATION_DATA = {
    CHATT: {
        NAME: 'Chattahoochee River',
        SECTIONS: {
            N_ATL: 'N_ATL',
            ROSWELL: 'ROSWELL',
            NORCROSS: 'NORCROSS',
            SUWANNEE: 'SUWANNEE',
            BUFORD: 'BUFORD'
        },
        SECTION_DATA: {
            N_ATL: {
                NAME: 'North Atlanta',
                COORD: {
                    LON: '-84.4430278',
                    LAT: '33.9019722'
                },
                RIVER_STATIONS: '02335815,02335880,02335990,02336000',
                STATION_NAMES: {
                    'CHATTAHOOCHEE RIVER BELOW MORGAN FALLS DAM, GA': 'MORGAN_FALLS',
                    'CHATT R AT POWERS FY & I-285 NR ATLANTA, GA': 'POWERS_FERRY',
                    'CHATTAHOOCHEE RIVER AT US 41, AT ATLANTA, GA': 'US_41_ATL',
                    'CHATTAHOOCHEE RIVER AT ATLANTA, GA' : 'PACES_FERRY'
                },
                FORMATTED_STATION_NAMES: {
                    MORGAN_FALLS: 'Morgan Falls Dam',
                    POWERS_FERRY: 'Powers Ferry',
                    US_41_ATL: 'US-41 Atlanta',
                    PACES_FERRY: 'Paces Ferry'
                },
                PUT_INS: [
                    {
                        NAME: 'Morgan Falls Dam',
                        COORD: {
                            LON: '-84.3827778',
                            LAT: '33.96805556'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Johnson Ferry',
                        COORD: {
                            LON: '-84.40417555250298',
                            LAT: '33.946619038367885'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Powers Island',
                        COORD: {
                            LON: '-84.4420137738136',
                            LAT: '33.90405265969966'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Whitewater Creek',
                        COORD: {
                            LON: '-84.44149068821153',
                            LAT: '33.877893867886144'
                        },
                        RESTRICTIONS: []
                    }
                ]
            },
            ROSWELL: {
                NAME: 'Roswell',
                COORD: {
                    LON: '-84.3160356',
                    LAT: '33.98593369'
                },
                RIVER_STATIONS: '02335450',
                STATION_NAMES: {
                    'CHATTAHOOCHEE RIVER ABOVE ROSWELL, GA': 'CHATT_ROSWELL'
                },
                FORMATTED_STATION_NAMES: {
                    CHATT_ROSWELL: 'Roswell'
                },
                PUT_INS: [
                    {
                        NAME: 'Island Ford',
                        COORD: {
                            LON: '-84.33018191798706',
                            LAT: '33.99468109374149'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Don White Park',
                        COORD: {
                            LON: '-84.33785674482351',
                            LAT: '34.01074588550463'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Riverside Park',
                        COORD: {
                            LON: '-84.34670218394976',
                            LAT: '34.00661509143397'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Chattahoochee Nature Center',
                        COORD: {
                            LON: '-84.38135635592583',
                            LAT: '34.00435598648783'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Overlook Park',
                        COORD: {
                            LON: '-84.37949012517183',
                            LAT: '33.9706799859668'
                        },
                        RESTRICTIONS: []
                    }
                ]
            },
            NORCROSS: {
                NAME: 'Norcross',
                COORD: {
                    LON: '-84.2019444',
                    LAT: '33.9972222'
                },
                RIVER_STATIONS: '02335000',
                STATION_NAMES: {
                    'CHATTAHOOCHEE RIVER NEAR NORCROSS, GA': 'MEDLOCK_BRIDGE'
                },
                FORMATTED_STATION_NAMES: {
                    MEDLOCK_BRIDGE: 'Medlock Bridge'
                },
                PUT_INS: [
                    {
                        NAME: 'Medlock Bridge',
                        COORD: {
                            LON: '-84.2019444',
                            LAT: '33.9972222'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Jones Bridge',
                        COORD: {
                            LON: '-84.23870318730509',
                            LAT: '34.00054764999629'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Garrard Landing',
                        COORD: {
                            LON: '-84.26473891207122',
                            LAT: '33.974959766834296'
                        },
                        RESTRICTIONS: []
                    }
                ]
            },
            SUWANNEE: {
                NAME: 'Suwannee',
                COORD: {
                    LON: '-84.1090833',
                    LAT: '34.05630556'
                },
                RIVER_STATIONS: '02334653',
                STATION_NAMES: {
                    'CHATTAHOOCHEE R 0.76 MI US MCGINNIS FY SUWANEE GA': 'MCGINNIS_FERRY'
                },
                FORMATTED_STATION_NAMES: {
                    'MCGINNIS_FERRY': 'McGinnis Ferry'
                },
                PUT_INS: [
                    {
                        NAME: 'McGinnis Ferry',
                        COORD: {
                            LON: '-84.1090833',
                            LAT: '34.05630556'
                        },
                        RESTRICTIONS: ['NO_TUBES']
                    },
                    {
                        NAME: 'Rogers Bridge',
                        COORD: {
                            LON: '-84.14096281613949',
                            LAT: '34.02878332044261'
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Abbotts Bridge',
                        COORD: {
                            LON: '-84.17073499099756',
                            LAT: '34.02367441210792'
                        },
                        RESTRICTIONS: []
                    }
                ]
            },
            BUFORD: {
                NAME: 'Buford',
                COORD: {
                    LON: '-84.07888889',
                    LAT: '34.15694444'
                },
                RIVER_STATIONS: '02334430',
                STATION_NAMES: {
                    'CHATTAHOOCHEE RIVER AT BUFORD DAM, NEAR BUFORD, GA': 'BUFORD_DAM'
                },
                FORMATTED_STATION_NAMES: {
                    'BUFORD_DAM': 'Buford Dam'
                },
                PUT_INS: [{
                    NAME: 'Buford Dam',
                    COORD: {
                        LON: '-84.07888889',
                        LAT: '34.15694444'
                    },
                    RESTRICTIONS: ['NO_TUBES']
                    },
                    {
                        NAME: 'Settles Bridge',
                        COORD: {
                            LON: '-84.10860353788529',
                            LAT: '34.09849734464112'
                        },
                        RESTRICTIONS: ['NO_TUBES']
                    }
                ]
            }
        }
    },
    OCMULGEE: {
        Name: 'Ocmulgee River',
        SECTIONS: {
            MACON: 'MACON',
            DAMES_FERRY: 'DAMES_FERRY'
        },
        SECTION_DATA: {
            MACON: {
                NAME: 'Macon',
                COORD: {
                    LON: '-83.6205556',
                    LAT: '32.8386111'
                },
                RIVER_STATIONS: '02213000',
                STATION_NAMES: {
                    'OCMULGEE RIVER AT MACON, GA': 'MACON'
                },
                FORMATTED_STATION_NAMES: {
                    'MACON': 'Macon'
                },
                PUT_INS: [
                    {
                        NAME: '',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: ['']
                    }
                ]
            },
            DAMES_FERRY: {
                NAME: 'Dames Ferry',
                COORD: {
                    LON: '-83.7271944',
                    LAT: '33.0168611'
                },
                RIVER_STATIONS: '02212735',
                STATION_NAMES: {
                    'OCMULGEE RIVER AT GA 18, AT DAMES FERRY, GA': 'DAMES_FERRY'
                },
                FORMATTED_STATION_NAMES: {
                    'DAMES_FERRY': 'Dames Ferry'
                },
                PUT_INS: [
                    {
                        NAME: '',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: ['']
                    }
                ]
            }
        }
    }
  
}

/*
    TEMPLATE----------
    RIVER: {
        Name: 'River',
        SECTIONS: {
            XYZ: 'XYZ',
        },
        SECTION_DATA: {
            XYZ: {
                NAME: 'Xyz',
                COORD: {
                    LON: '',
                    LAT: ''
                },
                RIVER_STATIONS: '000,111,222',
                STATION_NAMES: {
                    '': ''
                },
                FORMATTED_STATION_NAMES: {
                    '': ''
                },
                PUT_INS: [
                    {
                        NAME: '',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: ['']
                    }
                ]
            }
        }
    }
*/
