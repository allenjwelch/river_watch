const data = require('../sampleData/sample_water_GA.json');
const fs = require('fs')
   
const siteMap = new Map();

data.value.timeSeries.forEach(series => {
    const { sourceInfo } = series;
    const { siteCode, geoLocation } = sourceInfo;
    const { geogLocation } = geoLocation;

    const data = {
        siteCode: siteCode[0].value,
        lon: geogLocation.longitude,
        lat: geogLocation.latitude
    };

    if (!siteMap.has(sourceInfo.siteName)) {
        siteMap.set(sourceInfo.siteName, data);
    } 
});

const obj = JSON.stringify(Object.fromEntries(siteMap));
    
// console.log(siteMap);

fs.writeFile('../sampleData/ga-water-stations.json', obj, err => {
    if (err) {
        console.error(err)
        return
    } else {
        console.log('file written successfully');
    }
});
