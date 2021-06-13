
const formatRating = (percent) => {
    if (percent > 60) {
        if (percent >= 90) {
            return {
                grade: 'A',
                strokeColor: '#87d068'
            };
        } else if (percent >= 80) {
            return {
                grade: 'B',
                strokeColor: '#108ee9'
            };
        } else if (percent >= 70) {
            return {
                grade: 'C',
                strokeColor: '#108ee9'
            };
        } else {
            return {
                grade: 'D',
                strokeColor: '#FF4D4F'
            };
        }
    }
    return {
        grade: 'F',
        strokeColor: '#FF4D4F'
    };
};

export const calculateRating = (riverData, weatherData) => {
    const percent = 20; // testing
    
    const rating = {
        overall: {
            percent,
            ...formatRating(percent)
        }
        
    };

    return rating;
};