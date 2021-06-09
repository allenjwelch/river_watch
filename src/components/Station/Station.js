import React from 'react';
import { dateTimeFormat } from '../../utils/dateTimeFormat';

const CN = 'site-info';

const Station = ({ siteData }) => {

    // console.log(siteData);

    // <Card 
    //     size="small" 
    //     title='Weather Conditions'
    //     extra={<a href="#">More</a>} 
    //     bordered={false}
    //     style={{ width: '90%' }}
    // >
    //     <Collapse defaultActiveKey={['forcast']} ghost>
    //         <Panel header="Forcast" key="forcast">
    //             <p><strong>Sunrise:</strong> {sys.sunrise}</p>
    //         </Panel>
    //         <Panel header="Temperature" key="temp">
    //             <p><strong>Sunrise:</strong> {sys.sunrise}</p>
    //         </Panel>
    //         <Panel header="Wind" key="wind">
    //             <p><strong>Speed:</strong> {wind.speed}</p>
    //             <p><strong>Gusts:</strong> {wind.gust}</p>
    //         </Panel>
    //         <Panel header="Daylight" key="daylight">
    //             <p><strong>Sunrise:</strong> {sys.sunrise}</p>
    //             <p><strong>Sundown:</strong> {sys.sunset}</p>
    //             <p><strong>Hours Remaining: </strong> placeholder</p>
    //         </Panel>
    //     </Collapse>
    // </Card>

    return (
        <div className={CN}>
            <h3>{siteData.name}</h3>
            {
                siteData.variables.map(variable => (
                    <div>
                        <p>{variable.description}</p>
                        <p>{dateTimeFormat(variable.dateTime)}</p>
                        <p>{variable.unit}</p>
                        <p>{variable.value}</p>
                    </div>
                ))
            }
            <p></p>
        </div>
    )
};

export default Station;