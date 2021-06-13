import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';

const Rating = ({ rating, setRating }) => {

    if (rating) {
        const { overall: { percent, grade, status, strokeColor } } = rating;
        console.log(percent, grade, strokeColor);
        return (
            <Progress 
                type="circle" 
                // percent={percent} 
                format={() => grade}
                // status='exception'
                // strokeColor={{
                //     '0%': '#108ee9',
                //     '100%': '#87d068',
                //   }}
                success={{
                    percent: percent,
                    strokeColor: '#ccc'
                }}
            />
        )
    }
    return <></>;
};

export default Rating;