import React, { useState, useEffect } from 'react';
import { Card, Collapse } from 'antd';
import Station from '../Station/Station';
import Weather from '../Weather/Weather';
import { getConditions } from '../../utils/axios';
import { conditionsParser } from '../../utils/conditionsParser';
import { RIVER_LOCATIONS, LOCATION_NAMES, ERROR_MESSAGES } from '../../constants';

const { Panel } = Collapse;

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

    const renderStationInfo = () => {
        if (conditions) {
            return (
                <Card 
                    size="small" 
                    title='Water Stations'
                    className='water-stations'
                    extra={<a href="#">More</a>} 
                    bordered={false}
                    style={{ width: '90%' }}
                >
                    <Collapse 
                        defaultActiveKey={['']} 
                        ghost
                    >
                        {
                            conditions.sites.map(site => (
                                <Panel header={site.name} key={site.name}>
                                    <Station name={site.name} siteData={site} />
                                </Panel>
                            ))
                        }
                       
                    </Collapse>
                </Card>
                
            );
        }
        return <p className='error'>{ERROR_MESSAGES.NO_WATER}</p>;
    };

    return (
        <main className={CN}>
            <section className='title'>
                <h2>River Watch</h2>
                <h4>{LOCATION_NAMES[riverLocation]}</h4>
            </section>
            <section className='info'>
                <Weather location={riverLocation} />
                { renderStationInfo() }
            </section>
        </main>
    )
};

export default Home;