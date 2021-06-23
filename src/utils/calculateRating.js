import { STATION_VARIABLES } from '../constants';

const formatRating = (percent) => {
    // success exception normal active
    if (percent > 60) {
        if (percent >= 90) {
            return {
                grade: 'A',
                status: 'success',
                strokeColor: '#87d068'
            };
        } else if (percent >= 80) {
            return {
                grade: 'B',
                status: 'success',
                strokeColor: '#108ee9'
            };
        } else if (percent >= 70) {
            return {
                grade: 'C',
                status: 'normal',
                strokeColor: '#108ee9'
            };
        } else {
            return {
                grade: 'D',
                status: 'exception',
                strokeColor: '#FF4D4F'
            };
        }
    }
    return {
        grade: 'F',
        status: 'exception',
        strokeColor: '#FF4D4F'
    };
};

export const calculateWaterRating = (riverData) => {
    console.log('AW riverData - ', riverData);

    let rating = 0;

    const getValues = (value) => {
        return riverData.sites
            .map(site => site.variables)
            .map(variables => variables
                .filter(variable => variable.description.includes(value))
                .map(variable => variable.value))
            .filter(variables => !!variables.length)
            .map(variables => variables[0])
    };

    if (riverData) {

        // E Coli.
        // Low risk: E. coli ≤ 235 High risk: E. coli > 235

        // 0 - 470
        const eColiCount = getValues('Escherichia coli');
        const avgEColi = eColiCount.reduce((a, b) => parseInt(a) + parseInt(b)) / eColiCount.length;
        const eColiScore = ((470 - avgEColi) / 470) * 100;
        console.log('AW eColiCount - ', eColiCount);
        console.log('AW avgEColi - ', avgEColi);
        console.log('AW eColiScore - ', eColiScore);


        // Height
        const gageHeights = getValues('height');
        console.log('AW gageHeights - ', gageHeights);

        // Flow
        const flowRates = getValues('Discharge');
        console.log('AW flowRates - ', flowRates);
    }

    return rating;
};

export const calculateWeatherRating = (weatherData) => {

};

export const calculateOverallRating = (riverData, weatherData) => {
    const percent = 72; // testing

    const waterRating = calculateWaterRating(riverData);
    
    const rating = {
        overall: {
            percent,
            ...formatRating(percent)
        }
        
    };

    return rating;
};