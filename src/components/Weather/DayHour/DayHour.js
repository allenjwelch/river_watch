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
                    const today = Date.now() / 1000;
                    console.log(dateFormat(dt), dateFormat(today));
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
                            <Col offset={2}>
                                <p>Weather:</p>
                            </Col>
                            <Col className='value'>
                                <p>{weather[0].main}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2}>
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
                        <Row>
                            <Col offset={2}>
                                <p>Cloud Coverage:</p>
                            </Col>
                            <Col className='value'>
                                <p>{clouds}%</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2}>
                                <p>Precipitation</p>
                            </Col>
                            <Col className='value'>
                                <p>{pop * 100}%</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={2}>
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