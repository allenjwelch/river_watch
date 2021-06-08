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