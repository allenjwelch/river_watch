import React, { useState, useEffect } from 'react';
import Station from '../Station/Station';
import Weather from '../Weather/Weather';
import { getConditions } from '../../utils/axios';
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

    return (
        <main className={CN}>
            <section className='title'>
                <h2>River Watch</h2>
                <h4>{LOCATION_NAMES[riverLocation]}</h4>
                <Weather location={riverLocation} />
                { 
                    conditions && conditions.sites.map(site => (
                        <Station key={site.name} siteData={site} />
                    ))
                }
            </section>
        </main>
    )
};

export default Home;