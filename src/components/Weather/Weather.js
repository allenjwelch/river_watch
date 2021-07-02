import React from 'react';
import { Card, Tabs } from 'antd';
import { ERROR_MESSAGES } from '../../constants';

import Current from './Current/Current';
import DayHour from './DayHour/DayHour';

import './Weather.scss';

const { TabPane } = Tabs;

const CN = 'weather-info';

const Weather = ({ weatherData }) => {

    const renderForcast = () => {
        if (weatherData) {
            const { current, hourly, daily }= weatherData;

            return (
                <Card 
                    // size="small" 
                    title='Weather Conditions'
                    className='conditions'
                    // extra={<a href="#">More</a>} 
                    bordered={false}
                    style={{ padding: '0 5%' }}
                    headStyle={{ textAlign: 'center', fontWeight: '700' }}
                >

                    <Tabs tabPosition="top">
                        <TabPane tab="Current" key="current">
                            <Current currentForcast={current} />
                        </TabPane>
                        <TabPane tab="Hourly" key="hourly">
                            <DayHour 
                                classname='hourly-forcast' 
                                forcast={hourly} 
                                isHourly
                            />
                        </TabPane>
                        <TabPane tab="Daily" key="daily">
                            <DayHour 
                                classname='daily-forcast' 
                                forcast={daily} 
                                isHourly={false}
                            />
                        </TabPane>
                    </Tabs>
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