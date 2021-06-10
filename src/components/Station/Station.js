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

            const variablesArrary = variables.map(variable => {
                const { description, dateTime, unit, value } = variable;
     
                return (
                    <Row className='variables'>
                        <Col offset={2}>
                            <p>
                                <span className='label'>{STATION_VARIABLES[description]}</span>
                                <span className='value'>{value} {unit}</span>
                            </p>
                            <p>@ {dateTimeFormat(dateTime)}</p>
                        </Col>
                        {/* <Col className='value'>
                            <p></p>
                        </Col> */}
                    </Row>
                )
            })

            return variablesArrary;
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