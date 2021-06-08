import React, { useState, useEffect } from 'react';
import { getWeather } from '../../utils/axios';

const CN = 'weather-info';

const Weather = ({ location }) => {
    const [forcast, setForcast] = useState(null);

    useEffect(() => {
        const getCurrentWeather = async () => {

            try {
                const response = await getWeather(location);
                if (response && response.status === 200) {
                    console.log(response.data);
                    setForcast(response.data)
                }
            } catch (err) {
                console.warn(err);
            }
        }
    
        getCurrentWeather();
    }, []);

    return (
        <div className={CN}>
            Weather
        </div>
    )
};

export default Weather;