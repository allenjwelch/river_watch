import { CONDITION_RANGES, RATINGS, SCORE_KEY } from '../constants';
import { timeFormat, dateFormat, timeRemaining } from './dateTimeFormat';
const scoreKey = SCORE_KEY.r2;

/**
 * Ideal Score: x
 * Sub Score: y
 * Danger Score: z
 */



const formatRating = (percent) => {
    // success exception normal active
    const label = (percent / 10).toFixed(1, 10);
    let status;
    let strokeColor;

    if (percent >= 80) {
        status = 'success';
        strokeColor = '#87d068';
    } else if (percent >= 60) {
        status = 'normal';
        strokeColor = '#108ee9';
    } else {
        status = 'exception';
        strokeColor = '#FF4D4F';
    }
    return {
        label,
        status,
        strokeColor
    }
};

export const getRatingIcon = (score) => { //!!!! FIX
    if (score >= 10) {
        return RATINGS.GOOD
    } else if (score > 0) {
        return RATINGS.FAIR;
    } else {
        return RATINGS.POOR
    }
};

export const getConditionScoreFromRange = (condition, value) => {
    const ranges = CONDITION_RANGES[condition];
    const flowValue = 'KAYAK'; // setting constant for now, change later
    const isFlow = condition === 'flow';

    const isLessThan = (rangeIndex) => rangeIndex === '<';
    const isGreaterThan = (rangeIndex) => rangeIndex === '>';

    let isIdeal = false;
    let isSub = false;
    let isWarning = false;

    const getRangePlacement = (min, max, range) => {
        if (isLessThan(min)) {
            range = value < max
        } else if (isGreaterThan(min)) {
            range = value > max
        } else {
            range = value >= min && value <= max;
        }
        return range;
    }

    if (isFlow) { // flow specific setting
        isIdeal = getRangePlacement(ranges[flowValue].IDEAL[0], ranges[flowValue].IDEAL[1], isIdeal);
        isSub = getRangePlacement(ranges[flowValue].SUB[0], ranges[flowValue].SUB[1], isSub);
        isWarning = getRangePlacement(ranges[flowValue].WARNING[0], ranges[flowValue].WARNING[1], isWarning);
    } else {
        isIdeal = getRangePlacement(ranges.IDEAL[0], ranges.IDEAL[1], isIdeal);
        isSub = getRangePlacement(ranges.SUB[0], ranges.SUB[1], isSub);
        isWarning = getRangePlacement(ranges.WARNING[0], ranges.WARNING[1], isWarning);
    }


    // set Scores - change with score key
    if (isIdeal) {
        return scoreKey.IDEAL;
    } 
    
    if (isSub) {
        return scoreKey.SUB;
    }

    if (isWarning) {
        return scoreKey.WARNING;
    }

    return 0;
}

// export const getScoresFromRanges = (condition, value) => {
//     const ranges = CONDITION_RANGES[condition];

//     let indivScore = 0;
//     let ideal = 0;

//     const isByZero = (lowLowerRange, highUpperRange) => lowLowerRange > highUpperRange; 
//     const getMedian = (low, high) => (high - low) / 2 + low;
//     const getDistanceToTarget = (target, value) => Math.abs(target - value);
//     const getRange = (lowValue, highValue) => Math.abs(highValue - lowValue);
//     const getScore = (distanceToTarget, range) => 10 - ((distanceToTarget / range) * 10);
    

//     let median;
//     let distanceToTarget;
//     let range;

//     if (value >= ranges.IDEAL[0] && value <= ranges.IDEAL[1]) {
//         ideal = 10;

//         if (ranges.IDEAL[0] === 0) {
//             distanceToTarget = getDistanceToTarget(ranges.IDEAL[0], value);
//             range = getRange(ranges.IDEAL[0], ranges.IDEAL[1]);
//         } else {
//             median = getMedian(ranges.IDEAL[0], ranges.IDEAL[1]);
//             distanceToTarget = getDistanceToTarget(median, value);
//             range = getRange(median, ranges.IDEAL[1]);
//         }

//         indivScore = getScore(distanceToTarget, range);

//     } else if (value >= ranges.SUB[0] && value <= ranges.SUB[1]) {
//         ideal = 0;
//         if (isByZero(ranges.SUB[0], ranges.IDEAL[1])) {
//             // is by zero so no upper or lower range
//             distanceToTarget = getDistanceToTarget(ranges.SUB[0], value);
//             range = getRange(ranges.SUB[0], ranges.SUB[1]);
//         } else {
//             // is by range
//             const lowRange = [ranges.SUB[0], ranges.IDEAL[0]];
//             const highRange = [ranges.SUB[1], ranges.IDEAL[1]];

//             let targetValue;

//             if (value >= lowRange[0] && value <= lowRange[1]) {
//                 // value is in lower range
//                 targetValue = lowRange[1];
//                 range = getRange(lowRange[0], lowRange[1]);

//             } else {
//                 targetValue = highRange[0];
//                 range = getRange(highRange[0], highRange[1]);
//             }

//             distanceToTarget = getDistanceToTarget(targetValue, value);
//         }

//         indivScore = getScore(distanceToTarget, range);

//     } else if (value >= ranges.WARNING[0] && value <= ranges.WARNING[1]) {
//         ideal = -10;
//         if (isByZero(ranges.WARNING[0], ranges.SUB[1])) {
//             // is by zero so no upper or lower range
//             distanceToTarget = getDistanceToTarget(ranges.WARNING[0], value);
//             range = getRange(ranges.WARNING[0], ranges.WARNING[1]);
//         } else {
//             // is by range
//             const lowRange = [ranges.WARNING[0], ranges.SUB[0]];
//             const highRange = [ranges.WARNING[1], ranges.SUB[1]];

//             let targetValue;

//             if (value >= lowRange[0] && value <= lowRange[1]) {
//                 // value is in lower range
//                 targetValue = lowRange[1];
//                 range = getRange(lowRange[0], lowRange[1]);

//             } else {
//                 targetValue = highRange[0];
//                 range = getRange(highRange[0], highRange[1]);
//             }

//             distanceToTarget = getDistanceToTarget(targetValue, value);
//         }

//         indivScore = getScore(distanceToTarget, range);
//     }

//     return {
//         indivScore,
//         ideal
//     };
// };

export const calculateWaterRating = (riverData) => {
    // console.log('AW riverData - ', riverData);

    //! should look into flow rate suggestions are other rivers and 
    //! add method for applying calcs based on different locations

    let riverScore = {
        ratings: {
            eColiScore: null,
            flowScore: null,
        },
        // idealRange: {
        //     eColiScore: null,
        //     flowScore: null,
        // },
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
            // const eColiScore = (1 - (avgEColi / 800)) * 100;
    
            // const calcEColiScores = getScoresFromRanges('eColi', avgEColi);

            variables.avgEColi = avgEColi;
            // ratings.eColiScore = calcEColiScores.indivScore;
            // idealRange.eColiScore = calcEColiScores.ideal;

            const calcEColiScore = getConditionScoreFromRange('eColi', avgEColi);
            ratings.eColiScore = calcEColiScore;

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
         */

        const flowRates = getValues('Discharge');
        if (flowRates.length > 0) {
            const { ratings, variables, idealRange } = riverScore;

            
            const avgFlowRate = flowRates.reduce((a, b) => parseInt(a) + parseInt(b)) / flowRates.length;
            // const calcFlowScores = getScoresFromRanges('flow', avgFlowRate);

            variables.avgFlowRate = avgFlowRate;
            // ratings.flowScore = calcFlowScores.indivScore;
            // idealRange.flowScore = calcFlowScores.ideal;

            const calcFlowScore = getConditionScoreFromRange('flow', avgFlowRate);
            ratings.flowScore = calcFlowScore;

            
        }  
    }

    return riverScore;
};

export const getConditionsScore = (iconId) => {
    switch (iconId) {
        case '01d': // clear sky
            return 0;
        case '02d': // few clouds
            return 10;
        case '03d': // scattered clouds
            return 20;
        case '04d': // broken clouds
            return 30;
        case '50d': // mist
            return 40;
        case '09d': // shower rain
            return 50;
        case '10d': // rain
            return 60;
        case '11d': // thunderstorm
            return 70;
        default: 
            return 100;
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
        // idealRange: {
        //     // weatherScore: null,
        //     tempScore: null,
        //     conditionsScore: null,
        //     precipitationScore: null,
        //     // windScore: null,
        //     dayLightScore: null
        // },
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
            const { ratings, variables, idealRange } = weatherScore;
            const { temp: { min, max }, sunset, weather, pop } = currentDay[0];

            console.log('weather: ', weather);
            
            // hourlyRange (currentTime -> sunset)
            const hourlyRange = hourly
                .filter(hour => dateFormat(hour.dt, 'short') === dateFormat(today, 'short'))
                .filter(hour => {
                    const currentHour = new Date(Date.now()).getHours();
                    const weatherHour = new Date(hour.dt * 1000).getHours();
                    const sunsetHour = new Date(sunset * 1000).getHours();

                    return weatherHour > currentHour && weatherHour < sunsetHour;
                })

            
            // weatherScore
            const conditionsScore = getConditionsScore(weather[0].icon); // double check
            // const calcConditionScores = getScoresFromRanges('conditions', conditionsScore);
            // ratings.conditionsScore = calcConditionScores.indivScore;
            // idealRange.conditionsScore = calcConditionScores.ideal;

            const calcConditionScore = getConditionScoreFromRange('conditions', conditionsScore);
            ratings.conditionsScore = calcConditionScore;
            
            // const calcTempScores = getScoresFromRanges('temp', max);
            // ratings.tempScore = calcTempScores.indivScore;
            // idealRange.tempScore = calcTempScores.ideal;

            const calcTempScore = getConditionScoreFromRange('temp', max);
            ratings.tempScore = calcTempScore;

            // precipitationScore
            const highestPop = !!hourlyRange.length ? hourlyRange.reduce((a, b) => a.pop > b.pop ? a : b).pop : pop;
            // const calcPercipitationScores = getScoresFromRanges('precipitation', highestPop * 100);
            // ratings.precipitationScore = calcPercipitationScores.indivScore;
            // idealRange.precipitationScore = calcPercipitationScores.ideal;

            const calcPercipitationScore = getConditionScoreFromRange('precipitation', highestPop * 100);
            ratings.precipitationScore = calcPercipitationScore;

            // dayLightScore
            const timeRemainingVar = timeRemaining(Date.now(), sunset * 1000);
            if (timeRemainingVar.includes('hrs')) {
                const timeSplit = timeRemainingVar.split('hrs');
                if (timeSplit.length > 0) {
                    const hoursRemaining = parseInt(timeSplit[0]);

                    // const calcDaylightScores = getScoresFromRanges('dayLight', hoursRemaining);
                    // ratings.dayLightScore = calcDaylightScores.indivScore;
                    // idealRange.dayLightScore = calcDaylightScores.ideal;

                    const calcDaylightScore = getConditionScoreFromRange('dayLight', hoursRemaining);
                    ratings.dayLightScore = calcDaylightScore;
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
    // const idealRanges = { ...waterRatings.idealRange, ...weatherRatings.idealRange };

    const scores = Object.values(ratings).filter(score => score !== null);
    // const ideals = Object.values(idealRanges).filter(score => score !== null);
    const isMissingData = Object.values(ratings).some(key => key === null);
    const isWarning = Object.values(scores).some(score => score === scoreKey.WARNING);
    // const adjustedScores = {}
    
    // Object.entries(ratings).map(([rKey, rValue]) => {
    //     let adjustedValue;
    //     Object.entries(idealRanges).forEach(([iKey, iValue]) => {
    //         if (iKey === rKey && rValue !== null && iValue !== null) {
    //             adjustedValue = rValue + iValue
    //             return adjustedValue;
    //         }
    //     })
        
    //     if (rValue !== null) {
    //         adjustedScores[rKey] = adjustedValue;
    //     }
    // })

    const isSevereWeather = checkSevereWeather(weatherData);

    const avgScore = scores.reduce((a, b) => a + b) / scores.length;
    // const idealScores = ideals.reduce((a, b) => a + b);
    // const overallScore = (idealScores + avgScore) < 0 ? 1 : idealScores + avgScore;
    // const percent = (overallScore / ((scores.length + 1) * 10)) * 100;
    const percent = avgScore * 10;
    console.log('AW ratings - ', ratings);
    // console.log('AW idealRanges - ', idealRanges);
    // console.log('AW adjustedScores - ', adjustedScores);
    console.log('AW scores - ', scores);
    // console.log('AW scores.length - ', scores.length);
    // console.log('AW overallScore - ', overallScore < 0 ? 0 : overallScore);
    // console.log('AW percent - ', percent);
    
    const rating = {
        percent,
        ratings,
        // adjustedScores,
        variables,
        isMissingData,
        isWarning,
        isSevereWeather,
        formatted: formatRating(percent)
    };

    return rating;
};