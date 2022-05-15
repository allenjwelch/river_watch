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

export const calculateFlowRate = (flowRates, riverScore) => {
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
};