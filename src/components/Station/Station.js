import React from 'react';
import { dateTimeFormat } from '../../utils/dateTimeFormat';

const CN = 'site-info';

const Station = ({ siteData }) => {

    // console.log(siteData);

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