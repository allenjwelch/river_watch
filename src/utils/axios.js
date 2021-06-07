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
    const zipcode = LOCATION_DATA[location].ZIP;

    switch (location) {
        case RIVER_LOCATIONS.CHATT_ATL: 
            const url = WEATHER_SERVICE_URL.replace('{zip}', zipcode);
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
