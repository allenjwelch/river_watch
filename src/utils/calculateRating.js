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

    //! should look into flow rate suggestions are other rivers and 
    //! add method for applting calcs based on different locations

    let riverScore = {
        ratings: {
            eColiScore: null,
            flowScore: null,
        },
        variables: {
            avgEColi: 'N/A',
            avgFlowRate: 'N/A'
        }
    };

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
        if (eColiCount.length > 0) {
            const { ratings, variables } = riverScore;

            const avgEColi = eColiCount.reduce((a, b) => parseInt(a) + parseInt(b)) / eColiCount.length;
            const eColiScore = ((470 - avgEColi) / 470) * 100;
            console.log('AW eColiScore - ', eColiScore);

            variables.avgEColi = avgEColi;
            ratings.eColiScore = eColiScore;
        }


        // Height
        // const gageHeights = getValues('height');
        // if (gageHeights.length > 0) {
        //     console.log('AW gageHeights - ', gageHeights);
        // }

        // Flow
        const flowRates = getValues('Discharge');
        if (flowRates.length > 0) {
            const { ratings, variables } = riverScore;

            
            const avgFlowRate = flowRates.reduce((a, b) => parseInt(a) + parseInt(b)) / flowRates.length;

            const idealFlow = 2000;
            const fromZero = Math.abs(idealFlow - avgFlowRate);
            if (fromZero === 0) {
                ratings.flowScore = 100;
            } else {
                ratings.flowScore = (1 - (fromZero / 7500)) * 100;
            }

            variables.avgFlowRate = avgFlowRate;
            console.log('AW avgFlowRate - ', avgFlowRate);
            console.log('AW flowScore - ', ratings.flowScore);
        }        
    }

    return riverScore;
};

export const calculateWeatherRating = (weatherData) => {
    const weatherScore = {
        ratings: {
            tempScore: null,
            conditionsScore: null,
            percipitation: null,
            windScore: null,
            dayLightScore: null
        },
        variables: {
            highTemp: 'N/A',
            lowTemp: 'N/A',
            conditions: 'N/A',
            percipitation: 'N/A',
            windSpeed: 'N/A',
            dayLight: 'N/A'
        }
    };

    return weatherScore;
};

const checkSevereWeather = (weatherData) => {

    return false;
}

export const calculateOverallRating = (riverData, weatherData) => {
    const percent = 72; // testing

    const waterRatings = calculateWaterRating(riverData);
    const weatherRatings = calculateWeatherRating(weatherData);

    const variables = { ...waterRatings.variables, ...weatherRatings.variables };
    const ratings = { ...waterRatings.ratings, ...weatherRatings.ratings };

    const scores = Object.values(ratings).filter(score => score !== null);
    const isMissingData = Object.values(ratings).some(key => key === null);
    const isSevereWeather = checkSevereWeather(weatherData);

    const avgScore = scores.reduce((a, b) => a + b) / scores.length;
    // Object.entries(overallRatings).map(([key, value]) => {

    // })

    console.log('AXW ratings - ', ratings);
    console.log('AXW scores - ', scores);
    console.log('AXW isMissingData - ', isMissingData);
    console.log('AXW avgScore - ', avgScore);
    
    const rating = {
        percent: avgScore,
        variables,
        isMissingData,
        isSevereWeather,
        formatted: formatRating(percent)
       
    };

    return rating;
};