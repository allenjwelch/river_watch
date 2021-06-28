import React, { useState, useEffect } from 'react';
import { Col, Progress, Row } from 'antd';
import { getRatingIcon } from '../../utils/calculateRating';
import { RATINGS, OWM_ICON_MAP } from '../../constants';
import { 
    QuestionCircleOutlined,
    CheckCircleOutlined,
    CheckCircleTwoTone,
    MinusCircleOutlined,
    MinusCircleTwoTone,
    CloseCircleOutlined,
    CloseCircleTwoTone,
    WarningOutlined,
    WarningFilled
} from '@ant-design/icons'
import { WiSunset, WiRaindrops, WiHumidity } from 'weather-icons-react';
// import ecoliIcon from 'ecoli2.png'

import './Rating.scss';

const CN = 'rating';

const Rating = ({ rating, setRating }) => {

    if (rating) {
        const { percent, isMissingData, isSevereWeather, formatted, ratings, variables } = rating;
        const { label, status, strokeColor } = formatted;
        const { eColiScore, flowScore, weatherScore, precipitationScore, dayLightScore } = ratings;
        const { avgEColi, avgFlowRate, highTemp, lowTemp, conditions, precipitation, dayLight, currentDay } = variables;
        
        const VARIABLES = {
            WEATHER: 'WEATHER',
            PERCIP: 'PERCIP',
            DAY: 'DAY',
            FLOW: 'FLOW',
            ECOLI: 'ECOLI'
        };

        const renderWarning = () => (
            <Col span={24}>
                <p>
                    {/* <WarningOutlined /> */}
                    {RATINGS.WARNING}
                    <span className="warning-msg">
                        { isMissingData ? 'Incomplete Data!' : 'Severe Weather Warning!' }
                    </span>
                </p>
            </Col>
        );

        const renderVariableRow = (variable) => {
            let icon = null;
            let value = ``;
            let rating = null;

            switch (variable) {
                case VARIABLES.WEATHER: 
                    if (highTemp !== 'N/A' && lowTemp !== 'N/A' && conditions !== 'N/A' && weatherScore) {
                        const { main, description, icon: weatherIcon } = conditions; 

                        icon = OWM_ICON_MAP[weatherIcon]; // check conditions for icon
                        value = `${highTemp}\u00B0F | ${lowTemp}\u00B0F`;
                        rating = getRatingIcon(weatherScore);
                    } else {
                        icon = <QuestionCircleOutlined />;
                        value = 'N/A';
                    }
                    break;
                case VARIABLES.PERCIP: 
                    icon = <WiHumidity size={28} color='#000' />;

                    if (precipitation !== 'N/A' && precipitationScore) {
                        value = `${precipitation}%`;
                        rating = getRatingIcon(precipitationScore);
                    } else {
                        value = 'N/A';
                    }
                    break;
                case VARIABLES.DAY: 
                    icon = <WiSunset size={28} color='#000' />;

                    if (dayLight !== 'N/A' && dayLightScore) {
                        value = `${dayLight}`;
                        rating = getRatingIcon(dayLightScore);
                    } else {
                        value = 'N/A';
                    }
                    break;
                case VARIABLES.FLOW: 
                icon = <img className="river-img" src="./river2.png" alt="river flow" />

                    if (avgFlowRate !== 'N/A' && flowScore) {
                        value = `${avgFlowRate.toFixed(2)} ft\u00B3/s`;
                        rating = getRatingIcon(flowScore);
                    } else {
                        value = avgFlowRate;
                    }
                    break;
                case VARIABLES.ECOLI: 
                    icon = <img className="ecoli-img" src="./ecoli2.png" alt="ecoli" />

                    if (avgEColi !== 'N/A' && eColiScore) {
                        value = `${avgEColi} cfu/100ml`;
                        rating = getRatingIcon(eColiScore);
                    } else {
                        value = avgEColi;
                    }
                    break;
                default:
                    break;
            }

            return (
                <Row justify="space-between">
                    <Col>
                        {icon}
                        <span className="variable-label">{value}</span>
                    </Col>
                    <Col>
                        {rating}
                    </Col>
                </Row>
            );
        };
        
        return (
            <div className={CN}>
                <Row className="date-row">
                    <Col span={24}>
                        <h4>{currentDay}</h4>
                    </Col>
                </Row>
                <Row justify="space-between" className="main-row">
                    <Col span={12} className="progress-col">
                        <Progress 
                            type="circle" 
                            percent={percent} 
                            format={() => label}
                            strokeColor={strokeColor}
                            strokeWidth={8}
                        />
                    </Col>

                    <Col span={12} className="variables-col">
                        <div className="variables">
                            { Object.values(VARIABLES).map(value => (
                                renderVariableRow(value)
                            ))}
                        </div>
                        
                    </Col>
                </Row>

                <Row className="warning-row">
                    { (isMissingData || isSevereWeather) && renderWarning() }
                </Row>
            </div>
        )
    }
    return <></>;
};

export default Rating;