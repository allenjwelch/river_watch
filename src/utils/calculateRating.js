import { RATINGS } from '../constants';
import { timeFormat, dateFormat, timeRemaining } from './dateTimeFormat';


const formatRating = (percent) => {
    // success exception normal active
    if (percent >= 90) {
        return {
            label: 'Great',
            status: 'success',
            strokeColor: '#87d068'
        };
    } else if (percent >= 85) {
        return {
            label: 'Good',
            status: 'success',
            strokeColor: '#87d068'
        };
    } else if (percent >= 70) {
        return {
            label: 'Ok..',
            status: 'normal',
            strokeColor: '#108ee9'
        };
    } else if (percent >= 60) {
        return {
            label: 'Bad',
            status: 'exception',
            strokeColor: '#FF4D4F'
        };
    } else {
        return {
            label: 'DONT GO',
            status: 'exception',
            strokeColor: '#FF4D4F'
        };
    }
};

export const getRatingIcon = (score) => {
    if (score >= 85) {
        return RATINGS.GOOD
    } else if (score >= 70) {
        return RATINGS.FAIR;
    } else {
        return RATINGS.POOR
    }
};

export const calculateWaterRating = (riverData) => {
    // console.log('AW riverData - ', riverData);

    //! should look into flow rate suggestions are other rivers and 
    //! add method for applying calcs based on different locations

    let riverScore = {
        ratings: {
            eColiScore: null,
            flowScore: null,
        },
        variables: {
            avgEColi: null,
            avgFlowRate: null
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
            // const eColiScore = ((470 - avgEColi) / 470) * 100;
            const eColiScore = (1 - (avgEColi / 800)) * 100;

            // console.log('AW avgEColi - ', avgEColi);
            // console.log('AW eColiScore - ', eColiScore);

            variables.avgEColi = avgEColi;
            ratings.eColiScore = eColiScore;
        }

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
            // console.log('AW avgFlowRate - ', avgFlowRate);
            // console.log('AW flowScore - ', ratings.flowScore);
        }        
    }

    return riverScore;
};

export const getConditionsScore = (iconId) => {
    switch (iconId) {
        case '01d':
            return 100;
        case '02d':
            return 90;
        case '03d':
            return 85;
        case '04d':
            return 75;
        case '50d':
            return 70;
        case '09d':
            return 60;
        case '10d':
            return 50;
        case '11d':
            return 20;
        default: 
            return 20;
    }
};

export const calculateWeatherRating = (weatherData) => {
    const weatherScore = {
        ratings: {
            weatherScore: null,
            tempScore: null,
            conditionsScore: null,
            precipitationScore: null,
            // windScore: null,
            dayLightScore: null
        },
        variables: {
            highTemp: null,
            lowTemp: null,
            conditions: null,
            precipitation: null,
            dayLight: null
        }
    };

    if (weatherData) {
        const { daily }= weatherData;

        const today = Math.floor(Date.now() / 1000);
        const currentDay = daily.filter(day => dateFormat(day.dt, 'short') === dateFormat(today, 'short'));

        if (currentDay.length === 1) {
            const { ratings, variables } = weatherScore;
            const { temp: { min, max }, sunset, weather, pop } = currentDay[0];
            
            // weatherScore
            const tempScore = max;
            const conditionsScore = getConditionsScore(weather[0].icon); 
            ratings.tempScore = tempScore;
            ratings.conditionsScore = conditionsScore;           
            ratings.weatherScore = (tempScore + conditionsScore) / 2;

            // precipitationScore
            ratings.precipitationScore = (1 - pop) * 100;

            // dayLightScore
            const timeRemainingVar = timeRemaining(Date.now(), sunset * 1000);
            if (timeRemainingVar.includes('hrs')) {
                const timeSplit = timeRemainingVar.split('hrs');
                if (timeSplit.length > 0) {
                const hoursRemaining = parseInt(timeSplit[0]);

                    if (hoursRemaining >= 5) {
                        ratings.dayLightScore = 100
                    } else {
                        ratings.dayLightScore = (hoursRemaining / 5) * 100;
                    }
                }
            }

            variables.currentDay = dateFormat(currentDay[0].dt, 'full')
            variables.highTemp = max.toFixed(0);
            variables.lowTemp = min.toFixed(0);
            variables.conditions = weather[0];
            variables.precipitation = (pop * 100).toFixed(0);
            variables.dayLight = timeFormat(sunset);
        }
    }

    return weatherScore;
};

const checkSevereWeather = (weatherData) => {
    return false;
}

export const calculateOverallRating = (riverData, weatherData) => {

    const waterRatings = calculateWaterRating(riverData);
    const weatherRatings = calculateWeatherRating(weatherData);

    const variables = { ...waterRatings.variables, ...weatherRatings.variables };
    const ratings = { ...waterRatings.ratings, ...weatherRatings.ratings };

    const scores = Object.values(ratings).filter(score => score !== null);
    const isMissingData = Object.values(ratings).some(key => key === null);
    const isSevereWeather = checkSevereWeather(weatherData);

    // const avgScore = 80;
    const avgScore = scores.reduce((a, b) => a + b) / scores.length;

    // console.log('AW ratings - ', ratings);
    // console.log('AW scores - ', scores);
    
    const rating = {
        percent: avgScore,
        ratings,
        variables,
        isMissingData,
        isSevereWeather,
        formatted: formatRating(avgScore)
       
    };

    return rating;
};