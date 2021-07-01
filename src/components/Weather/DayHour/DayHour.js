import React, { useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { RATINGS, OWM_ICON_MAP } from '../../../constants';
import { timeFormat, dateFormat } from '../../../utils/dateTimeFormat';
import { WiCloud, WiHumidity, WiStrongWind } from 'weather-icons-react';
import CloudRainWind from '../CloudRainWind';

import './DayHour.scss';

const DayHour = ({ classname, forcast, isHourly }) => {
    console.log(forcast);
    useEffect(() => {

    }, []);
    const renderForcast = () => {
        if (forcast.length > 0) {
            let forcastArray = forcast;

            if (isHourly) {
                forcastArray = forcast.filter(({dt}) => {
                    const today = Math.floor(Date.now() / 1000);
                    if (dateFormat(dt, 'short') === dateFormat(today, 'short')) {
                        return true;
                    }
                    return false;
                })
            }
            forcastArray = forcastArray.map(period => {
                const { dt, temp, feels_like, clouds, pop, wind_speed, weather }  = period;
                const { icon: weatherIcon } = weather && weather[0];

                return (
                    <Card
                        key={dt + temp}
                        // size="small" 
                        title={isHourly ? timeFormat(dt) : dateFormat(dt, 'medium')}
                        // extra={<a href="#">More</a>} 
                        bordered={false}
                        style={{ width: 'auto' }}
                        headStyle={{ textAlign: 'center' }}
                    >
                        <Row className="weather-row">
                            <Col span={24}>{OWM_ICON_MAP[weatherIcon]}</Col>
                            {/* <Col className='label'>
                                <p>Weather:</p>
                            </Col>
                            <Col className='value'>
                                <p>{weather[0].main}</p>
                            </Col> */}
                        </Row>
                        {
                            isHourly ? (
                                <Row>
                                    <Col span={24} className='value'><p>{temp.toFixed(1)}&#176;F</p></Col>
                                    {/* <Col className='label'>
                                        <p>Temp:</p>
                                        <p>Feels Like:</p>
                                    </Col>
                                    <Col className='value'>
                                        <p>{temp}&#176;F</p>
                                        <p>{feels_like}&#176;F</p>
                                    </Col> */}
                                </Row>
                            ) : (
                                <Row>
                                    <Col span={24}>
                                        <p>{temp.max.toFixed(1)}&#176;F | {temp.min.toFixed(1)}&#176;F</p>
                                    </Col>
                                    {/* <Col className='label'>
                                        <p>Avg Temp:</p>
                                        <p>High Temp:</p>
                                        <p>Feels Like:</p>
                                    </Col>
                                    <Col className='value'>
                                        <p>{temp.day}&#176;F</p>
                                        <p>{temp.max}&#176;F</p>
                                        <p>{feels_like.day}&#176;F</p>
                                    </Col> */}
                                </Row>
                            )
                        }

                        {/* <CloudRainWind cloud={clouds} rain={pop} wind={wind_speed} /> */}
                        <div className="cloud-rain-wind">
                            <Row justify="center">
                                <Col className='label'>
                                    <WiCloud size={28} color='#000' />
                                </Col>
                                <Col className='value' style={{ paddingTop: '8px' }}>
                                    <p>{clouds}%</p>
                                </Col>
                            </Row>
                            <Row justify="center" style={{ marginTop: '-8px' }}>
                                <Col className='label'>
                                    <WiHumidity size={28} color='#000' />
                                </Col>
                                <Col className='value' style={{ paddingTop: '8px' }}>
                                    <p>{Math.floor(pop * 100)}%</p>
                                </Col>
                            </Row>
                            <Row justify="center" style={{ marginTop: '-8px' }}>
                                <Col className='label'>
                                    <WiStrongWind size={28} color='#000' />

                                </Col>
                                <Col className='value' style={{ paddingTop: '8px' }}>
                                    <p>{wind_speed.toFixed(0)} mph</p>
                                </Col>
                            </Row>
                        </div>
                        {/* <Row>
                            <Col className='label'>
                                <p>Cloud Coverage:</p>
                            </Col>
                            <Col className='value'>
                                <p>{clouds}%</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='label'>
                                <p>Precipitation</p>
                            </Col>
                            <Col className='value'>
                                <p>{Math.floor(pop * 100)}%</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='label'>
                                <p>Wind Speed:</p>
                            </Col>
                            <Col className='value'>
                                <p>{wind_speed} mph</p>
                            </Col>
                        </Row>                        */}
                    </Card>
                );
            })

            return forcastArray;

        }
    
        
        return <p>{isHourly ? 'Hourly': 'Daily'} weather data not available</p>;
    };

    return (
        <div className={classname}>
            { renderForcast() } 
        </div>
    );
    
};

export default DayHour;