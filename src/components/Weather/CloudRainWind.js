import React from 'react';
import { Col, Row } from 'antd';
import { WiCloud, WiHumidity, WiStrongWind } from 'weather-icons-react';

const CloudRainWind = ({ cloud, rain, wind}) => (
    <div className="cloud-rain-wind">
        <Row justify="center">
            <Col className='label'>
                <WiCloud size={28} color='#000' />
            </Col>
            <Col className='value' style={{ paddingTop: '8px' }}>
                <p>{cloud}%</p>
            </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '-8px' }}>
            <Col className='label'>
                <WiHumidity size={28} color='#000' />
            </Col>
            <Col className='value' style={{ paddingTop: '8px' }}>
                <p>{Math.floor(rain * 100)}%</p>
            </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '-8px' }}>
            <Col className='label'>
                <WiStrongWind size={28} color='#000' />

            </Col>
            <Col className='value' style={{ paddingTop: '8px' }}>
                <p>{wind.toFixed(0)} mph</p>
            </Col>
        </Row>
    </div>
);

export default CloudRainWind;