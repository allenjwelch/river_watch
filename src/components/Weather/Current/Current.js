import React from 'react';
import { Col, Row } from 'antd';
import { timeFormat, timeRemaining } from '../../../utils/dateTimeFormat';

const CN = 'current-forcast';

const Current = ({ currentForcast }) => {
    const renderCurrentForcast = () => {
        if (currentForcast) {
            const { temp, sunset, clouds, wind_speed, wind_gust, weather }  = currentForcast;
    
            return (
                <>
                    <Row>
                        <Col className='label'>
                            <p>Weather:</p>
                        </Col>
                        <Col className='value'>
                            <p>{weather[0].main}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='label'>
                            <p>Current Temp:</p>
                        </Col>
                        <Col className='value'>
                            <p>{temp} &#176;F</p>
                        </Col>
                    </Row>
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
                            <p>Wind Speed:</p>
                        </Col>
                        <Col className='value'>
                            <p>{wind_speed} mph</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='label'>
                            <p>Sunset:</p>
                        </Col>
                        <Col className='value'>
                            <p>{timeFormat(sunset)}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='label'>
                            <p>Daylight Remaining:</p>
                        </Col>
                        <Col className='value'>
                            <p>{timeRemaining(Date.now(), sunset * 1000)}</p>
                        </Col>
                    </Row>
                </>
            );
        }
    
        return <p>Current weather data not available</p>;
    };

    return (
        <div className={CN}>
            { renderCurrentForcast() } 
        </div>
    );
    
};

export default Current;