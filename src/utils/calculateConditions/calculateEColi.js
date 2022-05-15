/**
 *  E Coli.
 *  Low risk: E. coli ≤ 235
 *  High risk: E. coli > 235
 *  0 - 470
 */

export const calculateEColi = (eColiCount, riverScore) => {
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
};
