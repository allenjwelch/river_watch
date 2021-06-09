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
                        <Col offset={2} className='key'>
                            <p>Weather:</p>
                        </Col>
                        <Col className='value'>
                            <p>{weather[0].main}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>
                            <p>Current Temp:</p>
                        </Col>
                        <Col className='value'>
                            <p>{temp} &#176;F</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>
                            <p>Cloud Coverage:</p>
                        </Col>
                        <Col className='value'>
                            <p>{clouds}%</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>
                            <p>Wind Speed:</p>
                        </Col>
                        <Col className='value'>
                            <p>{wind_speed} mph</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>
                            <p>Wind Gusts:</p>
                        </Col>
                        <Col className='value'>
                            <p>{wind_gust} mph</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>
                            <p>Sunset:</p>
                        </Col>
                        <Col className='value'>
                            <p>{timeFormat(sunset)}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>
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