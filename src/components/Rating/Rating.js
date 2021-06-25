import React, { useState, useEffect } from 'react';
import { Col, Progress, Row } from 'antd';

const CN = 'rating';

const Rating = ({ rating, setRating }) => {

    if (rating) {
        const { percent, isMissingData, isSevereWeather, formatted, variables } = rating;
        const { grade, status, strokeColor } = formatted;
        const { avgEColi, avgFlowRate, highTemp, lowTemp, conditions, percipitation, windSpeed, dayLight } = variables;
        
        const renderMissingDataWarning = () => (
            <p>Incomplete Data!</p>
        );

        const renderWeatherWarning = () => (
            <p>Severe Weather Warning!</p>
        );
        
        return (
            <div className={CN}>
                <Row justify="space-between">
                    <Col>
                        <Progress 
                            type="circle" 
                            percent={percent} 
                            format={() => grade}
                            strokeColor={strokeColor}
                            strokeWidth={8}
                        />
                    </Col>

                    <Col>
                        <div className="variables">
                            <Row justify="space-between">
                                <Col>Temp</Col>
                                <Col>{highTemp} || {lowTemp}</Col>
                            </Row>
                            <Row>
                                <Col>Conditions</Col>
                                <Col>{conditions}</Col>
                            </Row>
                            <Row>
                                <Col>Wind</Col>
                                <Col>{windSpeed}</Col>
                            </Row>
                            <Row>
                                <Col>percipitation</Col>
                                <Col>{percipitation}</Col>
                            </Row>
                            <Row>
                                <Col>avgFlowRate</Col>
                                <Col>{avgFlowRate}</Col>
                            </Row>
                            <Row>
                                <Col>avgEColi</Col>
                                <Col>{avgEColi}</Col>
                            </Row>
                            <Row>
                                <Col>dayLight</Col>
                                <Col>{dayLight}</Col>
                            </Row>
                        </div>
                        
                    </Col>
                </Row>

                <Row>
                    { isMissingData && renderMissingDataWarning() }
                    { isSevereWeather && renderWeatherWarning() }
                </Row>
            </div>
        )
    }
    return <></>;
};

export default Rating;