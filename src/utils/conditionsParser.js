import React from 'react';
import { LOCATION_DATA } from '../constants';

// Low risk: E. coli ≤ 235 High risk: E. coli > 235

export const conditionsParser = (conditions, location) => {
    const getDateTime = () => {
        let dateTime;
        conditions.value.queryInfo.note.forEach(item => {
            if (item.title.includes('requestDT')) {
                console.log(item.value);
                dateTime = item.value;
            }
        })
    
        // TODO format dateTime
        return dateTime;
    }

    const formatDateTime = (dateTime) => {
        const [month, date, year] = new Date(dateTime).toLocaleDateString("en-US").split("/");
        const [hour, minute] = new Date(dateTime).toLocaleDateString("en-US").split("/");
        return `${month}/${date}/${year}`;

        // TODO finish formatting date and add time
    };

    const riverLocation = LOCATION_DATA[location];
    
    // const siteMap = new Map();
    const siteObj = {
        dateTime: formatDateTime(Date.now()),
        sites: []
    };
    
    conditions.value.timeSeries.forEach(series => {
        const { sourceInfo, variable, values } = series;
    
        const stationCode = riverLocation.STATION_NAMES[sourceInfo.siteName];

        const data = {
            description: variable.variableDescription,
            unit: variable.unit.unitCode,
            value: values[0].value[0].value,
            dateTime: values[0].value[0].dateTime,
        };
    
        // if (siteMap.has(LOCATIONS[sourceInfo.siteName])) {
        //     const siteData = siteMap.get(LOCATIONS[sourceInfo.siteName])
        //     siteData.push(data);
        //     siteMap.set(LOCATIONS[sourceInfo.siteName], siteData);
        // } else {
        //     siteMap.set(LOCATIONS[sourceInfo.siteName], [data]);
        // }
    
        if (siteObj.sites.some(site => site.name === riverLocation.FORMATTED_STATION_NAMES[stationCode])) {
            siteObj.sites.find(site => site.name === riverLocation.FORMATTED_STATION_NAMES[stationCode]).variables.push(data);
        } else {
            siteObj.sites.push({
                name: riverLocation.FORMATTED_STATION_NAMES[stationCode],
                variables: [data]
            })
        }
    });
        
    console.log(siteObj);
};
