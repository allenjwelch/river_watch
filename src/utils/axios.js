import axios from 'axios';
import { 
    WATER_SERVICE_URL,
    WEATHER_SERVICE_URL,
    LOCATION_DATA
} from '../constants';

export const getConditions = async (location) => {
    const stations = LOCATION_DATA[location.river].SECTION_DATA[location.section].RIVER_STATIONS

    const url = WATER_SERVICE_URL.replace('{SITES}', stations)
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getWeather = async (location) => {
    const coord = LOCATION_DATA[location.river].SECTION_DATA[location.section].COORD;

    const url = WEATHER_SERVICE_URL
        .replace('{LON}', coord.LON)
        .replace('{LAT}', coord.LAT);

    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
}
