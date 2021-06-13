import React, { useState, useEffect } from 'react';
import { Card, Collapse, Spin } from 'antd';
import Rating from '../Rating/Rating';
import Station from '../Station/Station';
import Weather from '../Weather/Weather';
import { getConditions, getWeather } from '../../utils/axios';
import { conditionsParser } from '../../utils/conditionsParser';
import { calculateRating } from '../../utils/calculateRating';
import { RIVER_LOCATIONS, LOCATION_NAMES, ERROR_MESSAGES } from '../../constants';

import './Home.scss';

const { Panel } = Collapse;

const CN = 'home-page';

const Home = () => {

    const [riverLocation, setRiverLocation] = useState(RIVER_LOCATIONS.CHATT_ATL);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(null);
    const [riverData, setRiverData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const getCurrentRiverData = async () => {

            try {
                const response = await getConditions(riverLocation);
                if (response && response.status === 200) {
                    setRiverData(conditionsParser(response.data, riverLocation))
                }
            } catch (err) {
                console.warn(err);
            }
        }

        const getCurrentWeather = async () => {

            try {
                const response = await getWeather(riverLocation);
                if (response && response.status === 200) {
                    setWeatherData(response.data)
                }
            } catch (err) {
                console.warn(err);
            }
        }
    
        getCurrentWeather();
        getCurrentRiverData();
        setLoading(false);
    }, []);

    useEffect(() => {
        if (riverData, weatherData) {
            const getRating = calculateRating(riverData, weatherData);
            setRating(getRating);
        }

    }, [riverData, weatherData]);

    const renderStationInfo = () => {
        if (riverData) {
            return (
                <div className='water-stations'>

                    <Card 
                        size="small" 
                        title='Water Stations'
                        className='stations'
                        extra={<a href="#">More</a>} 
                        bordered={false}
                        style={{ width: '90%' }}
                    >
                        <Collapse 
                            defaultActiveKey={['']} 
                            ghost
                        >
                            {
                                riverData.sites.map(site => (
                                    <Panel header={site.name} key={site.name}>
                                        <Station name={site.name} siteData={site} />
                                    </Panel>
                                ))
                            }
                        
                        </Collapse>
                    </Card>
                </div>
            );
        }
        return <p className='error'>{ERROR_MESSAGES.NO_WATER}</p>;
    };

    const renderInfoSection = () => (
        <>
            <Rating rating={rating} setRating={setRating} />
            <Weather weatherData={weatherData} />
            { renderStationInfo() }
        </>
    );


    return (
        <main className={CN}>
            <section className='title'>
                <h2>River Watch</h2>
                <h4>{LOCATION_NAMES[riverLocation]}</h4>
            </section>
            <section className='info'>
                {
                    loading
                        ? <Spin tip="Loading..." />
                        : renderInfoSection() 
                }
            </section>
        </main>
    )
};

export default Home;