import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { dateTimeFormat, timeFormat, dateFormat, timeRemaining } from '../../../utils/dateTimeFormat';

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
                    if (dateFormat(dt) === dateFormat(today)) {
                        return true;
                    }
                })
            }
            forcastArray = forcastArray.map(period => {
                const { dt, temp, feels_like, clouds, pop, wind_speed, wind_gust, weather }  = period;

                return (
                    <Card 
                        size="small" 
                        title={isHourly ? timeFormat(dt) : dateFormat(dt)}
                        extra={<a href="#">More</a>} 
                        bordered={false}
                        style={{ width: 'auto' }}
                    >
                        <Row>
                            <Col className='label'>
                                <p>Weather:</p>
                            </Col>
                            <Col className='value'>
                                <p>{weather[0].main}</p>
                            </Col>
                        </Row>
                        {
                            isHourly ? (
                                <Row>
                                    <Col className='label'>
                                        <p>Temp:</p>
                                        <p>Feels Like:</p>
                                    </Col>
                                    <Col className='value'>
                                        <p>{temp} &#176;F</p>
                                        <p>{feels_like} &#176;F</p>
                                    </Col>
                                </Row>
                            ) : (
                                <Row>
                                    <Col className='label'>
                                        <p>Avg Temp:</p>
                                        <p>High Temp:</p>
                                        <p>Feels Like:</p>
                                    </Col>
                                    <Col className='value'>
                                        <p>{temp.day} &#176;F</p>
                                        <p>{temp.max} &#176;F</p>
                                        <p>{feels_like.day} &#176;F</p>
                                    </Col>
                                </Row>
                            )
                        }
                        <Row>
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
                                <p>Wind Gusts:</p>
                            </Col>
                            <Col className='value'>
                                <p>{wind_speed} mph</p>
                                <p>{wind_gust} mph</p>
                            </Col>
                        </Row>                       
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