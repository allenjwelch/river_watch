import React, { useState, useEffect } from 'react';
import { Card, Col, Collapse, Row } from 'antd';
import { getWeather } from '../../utils/axios';
import { timeFormat, timeRemaining } from '../../utils/dateTimeFormat';
import { ERROR_MESSAGES } from '../../constants';

import Current from './Current/Current';
import DayHour from './DayHour/DayHour';

import './Weather.scss';

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
            const { current, hourly, daily }= forcast;

            return (
                <Card 
                    size="small" 
                    title='Weather Conditions'
                    className='conditions'
                    extra={<a href="#">More</a>} 
                    bordered={false}
                    style={{ width: '90%' }}
                >
                    <Collapse 
                        defaultActiveKey={['current']} 
                        ghost
                    >
                        <Panel header="Current" key='current'>
                            <Current currentForcast={current} />
                        </Panel>
                        <Panel header="Daily" key='daily'>
                            <DayHour 
                                classname='daily-forcast' 
                                forcast={daily} 
                                isHourly={false}
                            />
                        </Panel>
                        <Panel header="Hourly" key='hourly'>
                            <DayHour 
                                classname='hourly-forcast' 
                                forcast={hourly} 
                                isHourly
                            />
                        </Panel>
                        
                        
                    </Collapse>
                </Card>
                // <div className='forcast'>
                //     <Card 
                //         size="small" 
                //         title='Weather Conditions'
                //         extra={<a href="#">More</a>} 
                //         bordered={false}
                //         style={{ width: '90%' }}
                //     >
                //         <Collapse defaultActiveKey={['forcast']} ghost>
                //             <Panel header="Forcast" key="forcast">
                //                 <p><strong>Sunrise:</strong> {sys.sunrise}</p>
                //             </Panel>
                //             <Panel header="Temperature" key="temp">
                //                 <p><strong>Sunrise:</strong> {sys.sunrise}</p>
                //             </Panel>
                //             <Panel header="Wind" key="wind">
                //                 <p><strong>Speed:</strong> {wind.speed}</p>
                //                 <p><strong>Gusts:</strong> {wind.gust}</p>
                //             </Panel>
                //             <Panel header="Daylight" key="daylight">
                //                 <p><strong>Sunrise:</strong> {sys.sunrise}</p>
                //                 <p><strong>Sundown:</strong> {sys.sunset}</p>
                //                 <p><strong>Hours Remaining: </strong> placeholder</p>
                //             </Panel>
                //         </Collapse>
                //     </Card>
                // </div>
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