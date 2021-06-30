import React from 'react';
import { Card, Collapse } from 'antd';
import { ERROR_MESSAGES } from '../../constants';

import Current from './Current/Current';
import DayHour from './DayHour/DayHour';

import './Weather.scss';

const { Panel } = Collapse;

const CN = 'weather-info';

const Weather = ({ weatherData }) => {

    const renderForcast = () => {
        if (weatherData) {
            const { current, hourly, daily }= weatherData;

            return (
                <Card 
                    size="small" 
                    title='Weather Conditions'
                    className='conditions'
                    // extra={<a href="#">More</a>} 
                    bordered={false}
                    style={{ padding: '0 5%' }}
                    headStyle={{ textAlign: 'center', fontWeight: '700' }}
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