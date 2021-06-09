import React, { useState, useEffect } from 'react';
import { Card, Col, Collapse, Row } from 'antd';
import { getWeather } from '../../utils/axios';
import { timeFormat, timeRemaining } from '../../utils/dateTimeFormat';
import { ERROR_MESSAGES } from '../../constants';

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

    const renderCurrentWeather = () => {
        if (forcast.current) {
            const { temp, sunset, clouds, wind_speed, wind_gust, weather }  = forcast.current;

            return (
                <Panel header="Current" key='current'>
                    <Row>
                        <Col offset={2} className='key'>Weather: </Col>
                        <Col className='value'>{weather[0].main}</Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>Current Temp:</Col>
                        <Col className='value'>{temp} &#176;F</Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>Cloud Coverage </Col>
                        <Col className='value'>{clouds}%</Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>Wind Speed:</Col>
                        <Col className='value'>{wind_speed} mph</Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>Wind Gusts:</Col>
                        <Col className='value'>{wind_gust} mph</Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>Sunset:</Col>
                        <Col className='value'>{timeFormat(sunset)}</Col>
                    </Row>
                    <Row>
                        <Col offset={2} className='key'>Daylight Remaining:</Col>
                        <Col className='value'>{timeRemaining(Date.now(), sunset * 1000)}</Col>
                    </Row>
                </Panel>
            );
        }

        return 'Current weather data not available';
    }


    const renderForcast = () => {
        if (forcast) {

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
                        className='current'
                        defaultActiveKey={['current']} 
                        ghost
                    >
                        { renderCurrentWeather() }
                        
                        
                        
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