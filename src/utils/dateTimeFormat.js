export const dateTimeFormat = (dateTime) => {
    let formattedDate = '0/0/00';
    const isoDateToLocalDate = (ISOTimeString, offsetInMinutes) => {
        var newTime = new Date(ISOTimeString);
        return new Date(newTime.getTime() - (offsetInMinutes * 60000));
    }
    
    let intlFormat = new Intl.DateTimeFormat('en' , {
        dateStyle: 'long',
        timeStyle: 'short'
    });

    try {
        const local = isoDateToLocalDate(dateTime, 0);
        formattedDate = intlFormat.format(local).replace('at ', '');
    } catch (error) {
        console.warn('Error converting date/time');
    }

    return formattedDate;
};

export const timeFormat = (unixTime) => {
    try{
        const date = new Date(unixTime * 1000);
        let hours = date.getHours();
        let period = hours >= 12 ? 'pm' : 'am';
        if (hours > 12) {
            hours -= 12;
        }
        const minutes = "0" + date.getMinutes();
        return `${hours}:${minutes.substr(-2)} ${period}`;
    } catch (error) {
        return unixTime;
    }
};

export const dateFormat = (unixTime) => {
    let formattedDate = '0/0/00';
    
    let intlFormat = new Intl.DateTimeFormat('en' , {
        dateStyle: 'full',
    });

    try {
        const date = new Date(unixTime * 1000);
        formattedDate = intlFormat.format(date);
    } catch (error) {
        console.warn('Error converting date');
    }

    return formattedDate;
};

export const timeRemaining = (fromUnix, toUnix) => {

    try {
        let diff = Math.floor((toUnix - fromUnix) / 1000)
        const units = [
            { duration: 60, label: "seconds" },
            { duration: 60, label: "minutes" },
            { duration: 24, label: "hours" },
            { duration: 7, label: "days" }
        ];
        
        const results = {};
        for (let i = 0; i < units.length; ++i) {
            results[units[i].label] = diff % units[i].duration
            // s = (diff % units[i].duration) + " " + units[i].label + " " + s;
            diff = Math.floor(diff / units[i].duration);
        }
        console.log(results)

        const hoursRemaining = (results.hours + (results.minutes / 60)).toFixed(2);
        const timeRemaining = `${results.hours}hrs ${results.minutes}min`;

        // return `${hoursRemaining} hour(s)`;
        return timeRemaining;
    } catch (error) {
        return 'Unavailable';
    }
};
