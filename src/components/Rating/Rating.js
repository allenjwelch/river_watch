import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';

const Rating = ({ rating, setRating }) => {

    if (rating) {
        const { overall: { percent, grade, status, strokeColor } } = rating;
        return (
            <Progress 
                type="circle" 
                percent={percent} 
                format={() => grade}
                strokeColor={strokeColor}
                strokeWidth={8}
            />
        )
    }
    return <></>;
};

export default Rating;