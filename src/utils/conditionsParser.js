import { dateTimeFormat } from './dateTimeFormat';
import { LOCATION_DATA } from '../constants';

// Low risk: E. coli ≤ 235 High risk: E. coli > 235

export const conditionsParser = (conditions, location) => {
    const getReportDateTime = () => {
        let dateTime;
        conditions.value.queryInfo.note.forEach(item => {
            if (item.title.includes('requestDT')) {
                dateTime = item.value;
            }
        })
    
        // TODO format dateTime
        return dateTime;
    }

    // const formatDateTime = (dateTime) => {
    //     const isoDateToLocalDate = (ISOTimeString, offsetInMinutes) => {
    //         var newTime = new Date(ISOTimeString);
    //         return new Date(newTime.getTime() - (offsetInMinutes * 60000));
    //     }

    //     const convertLocalDateToString = (local) => {
    //         const localDate = local.toLocaleString();
    //         const dateArray = localDate.replace(',', '').split(' ');
    //         const date = dateArray[0];
    //         let time = dateArray[1];
    //         time = local.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}).toLowerCase();
            
    //         // let o = new Intl.DateTimeFormat('en' , {
    //         //     dateStyle: 'long',
    //         //     timeStyle: 'short'
    //         // });
    //         // console.log('test - ', o.format(local)); // "13:31 AM"

    //         const period = dateArray[2].toLowerCase();

    //         console.log(local);
    //         console.log(date, time, period);
    //         return dateArray;
    //     };

    //     // const time = dateTime.split('T')[1];
    //     // const localDate = isoDateToLocalDate(dateTime, 0);
    //     // const formattedDate = convertLocalDateToString(localDate.toLocalString());

        
    //     const local = isoDateToLocalDate(dateTime, 0);
    //     let intlFormat = new Intl.DateTimeFormat('en' , {
    //         dateStyle: 'long',
    //         timeStyle: 'short'
    //     });
    //     // console.log('test - ', o.format(local)); // "13:31 AM"
    //     // const formatted = convertLocalDateToString(local);
    //     const formattedDate = intlFormat.format(local).replace('at ', '');
    //     // const formattedDate = convertLocalDateToString(localDate.toLocalString());

    //     // console.log(local.toLocaleString());
    //     // console.log(new Date(dateTime).toDateString());
    //     // console.log(new Date(dateTime).toLocaleDateString('en-US'));

    //     return formattedDate;

    //     // TODO finish formatting date and add time
    // };

    const riverLocation = LOCATION_DATA[location.river].SECTION_DATA[location.section];
    
    // const siteMap = new Map();
    const siteObj = {
        dateTime: dateTimeFormat(getReportDateTime()),
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
        
    return siteObj;
};
