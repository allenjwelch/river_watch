import axios from 'axios';
import { 
    WATER_SERVICE_URL,
    WEATHER_SERVICE_URL,
    RIVER_LOCATIONS,
    LOCATION_DATA
} from '../constants';

export const getConditions = async (location) => {
    const stations = LOCATION_DATA[location].RIVER_STATIONS

    switch (location) {
        case RIVER_LOCATIONS.CHATT_ATL: 

            const url = WATER_SERVICE_URL.replace('{SITES}', stations)
            try {
                const response = await axios.get(url);
                return response;
            } catch (error) {
                console.error(error);
            }
            break;
        default:
            break;
    } 
}

export const getWeather = async (location) => {
    const coord = LOCATION_DATA[location].COORD;
    console.log(location);

    switch (location) {
        case RIVER_LOCATIONS.CHATT_ATL: 
            const url = WEATHER_SERVICE_URL
                .replace('{LON}', coord.LON)
                .replace('{LAT}', coord.LAT);

            try {
                const response = await axios.get(url);
                return response;
            } catch (error) {
                console.error(error);
            }
            break;
        default:
            break;
    } 
}
