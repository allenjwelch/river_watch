import { CONDITION_RANGES, RATINGS } from '../constants';
import { timeFormat, dateFormat, timeRemaining } from './dateTimeFormat';
import { calculateFlowRate, calculateEColi } from './calculateConditions';

/**
 * Ideal Range Score: [10, 0, -10]
 * Individual Score: 0 - 10
 * Final: (Average IndivScore) + Ideal Range Scores
 */

const formatRating = (percent) => {
    // success exception normal active
    if (percent >= 97) {
        return {
            label: 'A+',
            status: 'success',
            strokeColor: '#87d068'
        };
    } else if (percent >= 93) {
        return {
            label: 'A',
            status: 'success',
            strokeColor: '#87d068'
        };
    } else if (percent >= 90) {
        return {
            label: 'A-',
            status: 'success',
            strokeColor: '#87d068'
        };
    } else if (percent >= 87) {
        return {
            label: 'B+',
            status: 'success',
            strokeColor: '#87d068'
        };
    } else if (percent >= 83) {
        return {
            label: 'B',
            status: 'success',
            strokeColor: '#87d068'
        };
    } else if (percent >= 80) {
        return {
            label: 'B-',
            status: 'success',
            strokeColor: '#87d068'
        };
    } else if (percent >= 77) {
        return {
            label: 'C+',
            status: 'normal',
            strokeColor: '#108ee9'
        };
    } else if (percent >= 73) {
        return {
            label: 'C',
            status: 'normal',
            strokeColor: '#108ee9'
        };
    } else if (percent >= 70) {
        return {
            label: 'C-',
            status: 'normal',
            strokeColor: '#108ee9'
        };
    } else if (percent >= 60) {
        return {
            label: 'D',
            status: 'exception',
            strokeColor: '#FF4D4F'
        };
    } else if (percent >= 50) {
        return {
            label: 'F',
            status: 'exception',
            strokeColor: '#FF4D4F'
        };
    } else {
        return {
            label: '?',
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

const getIdealRangeScore = (condition, value) => {
    const ranges = CONDITION_RANGES[condition];

    if (value > ranges.IDEAL[0] && value < ranges.IDEAL[1]) {
        return 10;
    }

    if (value > ranges.SUB[0] && value < ranges.SUB[1]) {
        return 0;
    }

    if (value > ranges.WARNING[0] && value < ranges.WARNING[1]) {
        return -10;
    }
}

const getScoresFromRanges = (condition, value, fromZero) => {
    const ranges = CONDITION_RANGES[condition];

    let indivScore = 0;
    let ideal = 0;

    const getMedian = (low, high) => (high - low) / 2 + low;

    if (value > ranges.IDEAL[0] && value < ranges.IDEAL[1]) {
        ideal = 10;

        if (fromZero) {
            indivScore = Math.abs(ranges.IDEAL[0] - value)
        } else {
            const median = getMedian(ranges.IDEAL[0], ranges.IDEAL[1]);
            indivScore = Math.abs(median - value);
        }

        if (indivScore > 1000) {
            indivScore /= 1000;
        } else if (indivScore > 100) {
            indivScore /= 100;
        } else if (indivScore > 10) {
            indivScore /= 10;
        }

    }

    if (value > ranges.SUB[0] && value < ranges.SUB[1]) {
        ideal = 0;
    }

    if (value > ranges.WARNING[0] && value < ranges.WARNING[1]) {
        ideal = -10;
    }

    return {
        indivScore,
        ideal
    };
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
        idealRange: {
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
        /**
         *  E Coli.
         *  Low risk: E. coli ≤ 235
         *  High risk: E. coli > 235
         *  0 - 470
         */
        const eColiCount = getValues('Escherichia coli');
        if (eColiCount.length > 0) {
            const { ratings, variables, idealRange } = riverScore;
    
            const avgEColi = eColiCount.reduce((a, b) => parseInt(a) + parseInt(b)) / eColiCount.length;
            // const eColiScore = ((470 - avgEColi) / 470) * 100;


            const eColiScore = (1 - (avgEColi / 800)) * 100;
    
            console.log('AW avgEColi - ', avgEColi);
            console.log('AW eColiScore - ', eColiScore);
    
            const calcEColiScores = getScoresFromRanges('eColi', avgEColi, true);

            variables.avgEColi = avgEColi;
            ratings.eColiScore = eColiScore;
            idealRange.eColiScore = calcEColiScores.ideal;

            
        }


        /**
         * Tubes	Below 2,500 cfs
         * Canoes, Kayaks, Rowing, or Stand Up Paddleboards	Below 4,000 cfs
         * Rafts	Below 5,000 cfs
         * Guided Canoe, Kayak, or Stand Up Paddleboard Trip	Below 5,000 cfs
         * Guided Raft or Fishing Trips	Below 8,000 cfs
         * 
         * Tubes - Paddling - Rafting - Adv Padding - Adv Rafting
         * 
         * 
         */

        const flowRates = getValues('Discharge');
        if (flowRates.length > 0) {
            const { ratings, variables, idealRange } = riverScore;

            
            const avgFlowRate = flowRates.reduce((a, b) => parseInt(a) + parseInt(b)) / flowRates.length;

            // const idealFlow = 2000;
            // const fromZero = Math.abs(idealFlow - avgFlowRate);
            // if (fromZero === 0) {
            //     ratings.flowScore = 100;
            // } else {
            //     ratings.flowScore = (1 - (fromZero / 7500)) * 100;
            // }

            const calcFlowScores = getScoresFromRanges('flow', avgFlowRate, false);

            variables.avgFlowRate = avgFlowRate;
            ratings.flowScore = calcFlowScores.indivScore;
            idealRange.flowScore = calcFlowScores.ideal;


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
            // weatherScore: null,
            tempScore: null,
            conditionsScore: null,
            precipitationScore: null,
            // windScore: null,
            dayLightScore: null
        },
        idealRange: {
            // weatherScore: null,
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
        const { daily, hourly } = weatherData;

        const today = Math.floor(Date.now() / 1000);
        const currentDay = daily.filter(day => dateFormat(day.dt, 'short') === dateFormat(today, 'short'));

        if (currentDay.length === 1) {
            const { ratings, variables } = weatherScore;
            const { temp: { min, max }, sunset, weather, pop } = currentDay[0];
            
            // hourlyRange (currentTime -> sunset)
            const hourlyRange = hourly
                .filter(hour => dateFormat(hour.dt, 'short') === dateFormat(today, 'short'))
                .filter(hour => {
                    const currentHour = new Date(Date.now()).getHours();
                    const weatherHour = new Date(hour.dt * 1000).getHours();
                    const sunsetHour = new Date(sunset * 1000).getHours();

                    return weatherHour > currentHour && weatherHour < sunsetHour;
                })

            console.log(hourlyRange);
            
            // weatherScore
            const tempScore = max; //! add range
            const conditionsScore = getConditionsScore(weather[0].icon); // double check
            ratings.tempScore = tempScore;
            ratings.conditionsScore = conditionsScore;
            // ratings.weatherScore = (tempScore + conditionsScore) / 2;

            // precipitationScore
            const highestPop = hourlyRange.reduce((a, b) => a.pop > b.pop ? a : b).pop;
            ratings.precipitationScore = (1 - highestPop) * 100;

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
            variables.precipitation = (highestPop * 100).toFixed(0);
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
    const idealRanges = { ...waterRatings.idealRange, ...weatherRatings.idealRange };

    const scores = Object.values(ratings).filter(score => score !== null).map(score => score / 10); // changing to out of 10 instead of 100
    const isMissingData = Object.values(ratings).some(key => key === null);
    const isSevereWeather = checkSevereWeather(weatherData);

    // const avgScore = 80;
    const avgScore = scores.reduce((a, b) => a + b) / scores.length;

    console.log('AW ratings - ', ratings);
    console.log('AW scores - ', scores);
    console.log('AW idealRanges - ', idealRanges);
    
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