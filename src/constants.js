const { REACT_APP_WEATHER_KEY } = process.env;

export const WATER_SERVICE_URL =  'https://waterservices.usgs.gov/nwis/iv/?format=json&sites={SITES}&parameterCd=00060,00065,99407,00011&siteStatus=all';
export const WEATHER_SERVICE_URL = `https://api.openweathermap.org/data/2.5/weather?zip={ZIP},us&units=imperial&appid=${REACT_APP_WEATHER_KEY}`;

export const RIVER_LOCATIONS = {
    CHATT_ATL: 'CHATT_ATL'
}

export const LOCATION_DATA = {
    CHATT_ATL: {
        ZIP: '30328',
        RIVER_STATIONS: '02335000,02335880,02336000',
        STATION_NAMES: {
            'CHATTAHOOCHEE RIVER NEAR NORCROSS, GA': 'MEDLOCK_BRIDGE',
            'CHATT R AT POWERS FY & I-285 NR ATLANTA, GA': 'POWERS_FERRY',
            'CHATTAHOOCHEE RIVER AT ATLANTA, GA' : 'PACES_FERRY'
        },
        FORMATTED_STATION_NAMES: {
            MEDLOCK_BRIDGE: 'Medlock Bridge',
            POWERS_FERRY: 'Powers Ferry',
            PACES_FERRY: 'Paces Ferry'
        }
    }
}
