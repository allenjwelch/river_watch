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
    CHATT: 'CHATT'
}

// export const LOCATION_NAMES = {
//     CHATT_ATL: 'Chattahoochee River - Atlanta Area'
// }

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
                    LON: '-84.3958',
                    LAT: '33.9335'
                },
                RIVER_STATIONS: '02335000,02335815,02335880,02336000',
                STATION_NAMES: {
                    // 'CHATTAHOOCHEE RIVER NEAR NORCROSS, GA': 'MEDLOCK_BRIDGE',
                    'CHATTAHOOCHEE RIVER BELOW MORGAN FALLS DAM, GA': 'MORGAN_FALLS',
                    'CHATT R AT POWERS FY & I-285 NR ATLANTA, GA': 'POWERS_FERRY',
                    'CHATTAHOOCHEE RIVER AT ATLANTA, GA' : 'PACES_FERRY'
                },
                FORMATTED_STATION_NAMES: {
                    MEDLOCK_BRIDGE: 'Medlock Bridge',
                    MORGAN_FALLS: 'Morgan Falls Dam',
                    POWERS_FERRY: 'Powers Ferry',
                    PACES_FERRY: 'Paces Ferry'
                },
                PUT_INS: [
                    {
                        NAME: 'Morgan Falls Dam',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Johnson Ferry',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Powers Island',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Whitewater Creek',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    }
                ]
            },
            ROSWELL: {
                NAME: 'Roswell',
                COORD: {
                    LON: '',
                    LAT: ''
                },
                RIVER_STATIONS: '',
                STATION_NAMES: {},
                FORMATTED_STATION_NAMES: {},
                PUT_INS: [
                    {
                        NAME: 'Island Ford',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Don White Park',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Riverside Park',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Chattahoochee River Park',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Chattahoochee Nature Center',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Overlook Park',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    }
                ]
            },
            NORCROSS: {
                NAME: 'Norcross',
                COORD: {
                    LON: '',
                    LAT: ''
                },
                RIVER_STATIONS: '',
                STATION_NAMES: {},
                FORMATTED_STATION_NAMES: {},
                PUT_INS: [
                    {
                        NAME: 'Medlock Bridge',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Jones Bridge',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Garrard Landing',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                ],
                RESTRICTIONS: []
            },
            SUWANNEE: {
                NAME: 'Suwannee',
                COORD: {
                    LON: '',
                    LAT: ''
                },
                RIVER_STATIONS: '',
                STATION_NAMES: {},
                FORMATTED_STATION_NAMES: {},
                PUT_INS: [
                    {
                        NAME: 'McGinnis Ferry',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: ['NO_TUBES']
                    },
                    {
                        NAME: 'Rogers Bridge',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    },
                    {
                        NAME: 'Abbotts Bridge',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: []
                    }
                ],
                RESTRICTIONS: []
            },
            BUFORD: {
                NAME: 'Buford',
                COORD: {
                    LON: '',
                    LAT: ''
                },
                RIVER_STATIONS: '',
                STATION_NAMES: {},
                FORMATTED_STATION_NAMES: {},
                PUT_INS: [{
                    NAME: 'Buford Dam',
                    COORD: {
                        LON: '',
                        LAT: ''
                    },
                    RESTRICTIONS: ['NO_TUBES']
                    },
                    {
                        NAME: 'Ga. 20 Bridge',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: ['NO_TUBES']
                    },
                    {
                        NAME: 'Settles Bridge',
                        COORD: {
                            LON: '',
                            LAT: ''
                        },
                        RESTRICTIONS: ['NO_TUBES']
                    }
                ]
            }
        }
    }
  
}
