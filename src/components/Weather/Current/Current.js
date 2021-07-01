import React from 'react';
import { Col, Row } from 'antd';
import { OWM_ICON_MAP } from '../../../constants';
import { timeFormat, timeRemaining } from '../../../utils/dateTimeFormat';
import CloudRainWind from '../CloudRainWind';
import { WiCloud, WiHumidity, WiStrongWind } from 'weather-icons-react';


import './Current.scss';

const CN = 'current-forcast';

const Current = ({ currentForcast }) => {
    const renderCurrentForcast = () => {
        if (currentForcast) {
            const { temp, feels_like, sunset, clouds, pop, wind_speed, weather }  = currentForcast;
            const { icon: weatherIcon } = weather && weather[0];

            console.log('currentForcast - ', currentForcast);
            const getDaylight = `${timeRemaining(Date.now(), sunset * 1000)} daylight remaining`
            // const getTemp = `${temp.toFixed(1)}\u00B0F (feels ${feels_like.toFixed(1)}\u00B0F)`;

            return (
                <>
                    <Row className="weather-row">
                        <Col span={24}>{OWM_ICON_MAP[weatherIcon]}</Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <h2>
                                {temp.toFixed(1)}&#176;F
                                {' '}
                                <span>(feels {feels_like.toFixed(1)}&#176;F)</span>
                            </h2>
                        </Col>
                    </Row>
                
                
                    {/* <CloudRainWind cloud={clouds} rain={pop} wind={wind_speed} /> */}

                    {/* <Row justify="center" className="cloud-row">
                        <Col className='label'>
                            <WiCloud size={28} color='#000' />
                        </Col>
                        <Col className='value'>
                            <p>{clouds}%</p>
                        </Col>
                    </Row>
                    <Row justify="center" className="wind-row">
                        <Col className='label'>
                            <WiStrongWind size={28} color='#000' />
                        </Col>
                        <Col className='value'>
                            <p>{wind_speed.toFixed(0)} mph</p>
                        </Col>
                    </Row> */}
                    {/* <Row>
                        <Col className='label'>
                            <p>Sunset:</p>
                        </Col>
                        <Col className='value'>
                            <p>{timeFormat(sunset)}</p>
                        </Col>
                    </Row> */}
                    <Row>
                        <Col span={24}>
                            <em>{getDaylight}</em>
                        </Col>
                        {/* <Col className='label'>
                            <p>Daylight:</p>
                        </Col>
                        <Col className='value'>
                            <p>{timeRemaining(Date.now(), sunset * 1000)}</p>
                        </Col> */}
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