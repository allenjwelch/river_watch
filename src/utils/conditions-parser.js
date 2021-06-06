const json = require('./river-conditions.json');

console.log('River Conditions');

// Low risk: E. coli ≤ 235 High risk: E. coli > 235

const LOCATIONS = {
    'CHATTAHOOCHEE RIVER NEAR NORCROSS, GA': 'MEDLOCK_BRIDGE',
    'CHATT R AT POWERS FY & I-285 NR ATLANTA, GA': 'POWERS_FERRY',
    'CHATTAHOOCHEE RIVER AT ATLANTA, GA' : 'PACES_FERRY'
}

const FORMATTED_LOCATIONS = {
    MEDLOCK_BRIDGE: 'Medlock Bridge',
    POWERS_FERRY: 'Powers Ferry',
    PACES_FERRY: 'Paces Ferry'
}

const getDateTime = () => {
    let dateTime;
    json.value.queryInfo.note.forEach(item => {
        if (item.title.includes('requestDT')) {
            console.log(item.value);
            dateTime = item.value;
        }
    })

    // TODO format dateTime
    return dateTime;
}

const siteMap = new Map();
const siteObj = {
    dateTime: getDateTime(),
    sites: []
};

json.value.timeSeries.forEach(series => {
    const { sourceInfo, variable, values } = series;

    const data = {
        description: variable.variableDescription,
        unit: variable.unit.unitCode,
        value: values[0].value[0].value,
        dateTime: values[0].value[0].dateTime,
    };

    if (siteMap.has(LOCATIONS[sourceInfo.siteName])) {
        const siteData = siteMap.get(LOCATIONS[sourceInfo.siteName])
        siteData.push(data);
        siteMap.set(LOCATIONS[sourceInfo.siteName], siteData);
    } else {
        siteMap.set(LOCATIONS[sourceInfo.siteName], [data]);
    }

    if (siteObj.sites.some(site => site.name === LOCATIONS[sourceInfo.siteName])) {
        siteObj.sites.find(site => site.name === LOCATIONS[sourceInfo.siteName]).variables.push(data);
    } else {
        siteObj.sites.push({
            name: LOCATIONS[sourceInfo.siteName],
            variables: [data]
        })
    }
});

 

// const formattedJson = json.value.timeSeries.map((series, index, array) => {

//     const { sourceInfo, variable, values } = series;

 

//     return {

//         name: sourceInfo.siteName,

//         variable: variable.variableDescription,

//         unit: variable.unit.unitCode,

//         value: values[0].value[0].value

//     };

// });

 

console.log(siteMap);

console.log(siteObj);

console.log(siteObj.sites[0].variables);
