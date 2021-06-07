import React, { useState, useEffect } from 'react';
import { getConditions, getWeather } from '../../utils/axios';
import { conditionsParser } from '../../utils/conditionsParser';
import { RIVER_LOCATIONS, LOCATION_NAMES } from '../../constants';

const CN = 'home-page';

const Home = () => {

    const [riverLocation, setRiverLocation] = useState(RIVER_LOCATIONS.CHATT_ATL);
    const [conditions, setConditions] = useState(null);

    useEffect(() => {
        const getCurrentConditions = async () => {

            try {
                const response = await getConditions(riverLocation);
                if (response && response.status === 200) {
                    setConditions(conditionsParser(response.data, riverLocation))
                }
            } catch (err) {
                console.warn(err);
            }
        }

        getCurrentConditions();
    }, []);


    // console.log(conditions);
    // console.log(getWeather(RIVER_LOCATIONS.CHATT_ATL));

    return (
        <main className={CN}>
            <section className='title'>
                <h2>River Watch</h2>
                <h4>{LOCATION_NAMES[riverLocation]}</h4>
            </section>
        </main>
    )
};

export default Home;