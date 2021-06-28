import React from 'react';
import { Col, Row } from 'antd';
import { dateTimeFormat } from '../../utils/dateTimeFormat';
import { STATION_VARIABLES } from '../../constants';

import './Station.scss';

const CN = 'station-info';

const Station = ({ name, siteData }) => {

    console.log(siteData);

    const renderStationData = () => {
        if (siteData) {
            const { variables }  = siteData;
            let sampleTime = '0:00';
            let variablesArray = variables.map(variable => {
                const { description, dateTime, unit, value } = variable;
                sampleTime = dateTimeFormat(dateTime);

                return (
                    <Row className='variable'>
                        <Col>
                            <p>
                                <span className='label'>{STATION_VARIABLES[description]}</span>
                                <span className='value'>{value} {unit}</span>
                            </p>
                            {/* <p>@ {dateTimeFormat(dateTime)}</p> */}
                        </Col>
                    </Row>
                )
            })

            variablesArray = [
                <div className='variables'>
                    {variablesArray}
                    <h5>@ {sampleTime}</h5>
                </div>
            ];

            return variablesArray;
        }
    
        return <p>{name} data not available</p>;
    };

    return (
        <div className={CN}>
            { renderStationData() } 
        </div>
    );
};

export default Station;