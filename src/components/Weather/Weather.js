import React, { useState, useEffect } from 'react';
import { Card, Collapse } from 'antd';
import { getWeather } from '../../utils/axios';
import { ERROR_MESSAGES } from '../../constants';

const { Panel } = Collapse;

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


    const renderForcast = () => {
        if (forcast) {
            const { name, main, sys, weather, wind } = forcast;

            return (
                <div className='forcast'>
                    <Card 
                        size="small" 
                        title='Weather Conditions'
                        extra={<a href="#">More</a>} 
                        bordered={false}
                        style={{ width: '90%' }}
                    >
                        <Collapse defaultActiveKey={['forcast']} ghost>
                            <Panel header="Forcast" key="forcast">
                                <p><strong>Sunrise:</strong> {sys.sunrise}</p>
                            </Panel>
                            <Panel header="Temperature" key="temp">
                                <p><strong>Sunrise:</strong> {sys.sunrise}</p>
                            </Panel>
                            <Panel header="Wind" key="wind">
                                <p><strong>Speed:</strong> {wind.speed}</p>
                                <p><strong>Gusts:</strong> {wind.gust}</p>
                            </Panel>
                            <Panel header="Daylight" key="daylight">
                                <p><strong>Sunrise:</strong> {sys.sunrise}</p>
                                <p><strong>Sundown:</strong> {sys.sunset}</p>
                                <p><strong>Hours Remaining: </strong> placeholder</p>
                            </Panel>
                        </Collapse>
                    </Card>
                </div>
            );
        }
        return <p className='error'>{ERROR_MESSAGES.NO_WEATHER}</p>;
    };

    return (
        <div className={CN}>
            { renderForcast() }
        </div>
    )
};

export default Weather;