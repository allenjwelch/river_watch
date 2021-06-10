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

export const RIVER_LOCATIONS = {
    CHATT_ATL: 'CHATT_ATL'
}

export const LOCATION_NAMES = {
    CHATT_ATL: 'Chattahoochee River - Atlanta Area'
}

export const LOCATION_DATA = {
    CHATT_ATL: {
        COORD: {
            LON: '-84.3958',
            LAT: '33.9335'
        },
        RIVER_STATIONS: '02335000,02335815,02335880,02336000',
        STATION_NAMES: {
            'CHATTAHOOCHEE RIVER NEAR NORCROSS, GA': 'MEDLOCK_BRIDGE',
            'CHATTAHOOCHEE RIVER BELOW MORGAN FALLS DAM, GA': 'MORGAN_FALLS',
            'CHATT R AT POWERS FY & I-285 NR ATLANTA, GA': 'POWERS_FERRY',
            'CHATTAHOOCHEE RIVER AT ATLANTA, GA' : 'PACES_FERRY'
        },
        FORMATTED_STATION_NAMES: {
            MEDLOCK_BRIDGE: 'Medlock Bridge',
            MORGAN_FALLS: 'Morgan Falls Dam',
            POWERS_FERRY: 'Powers Ferry',
            PACES_FERRY: 'Paces Ferry'
        }
    }
}
