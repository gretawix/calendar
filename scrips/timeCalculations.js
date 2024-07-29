const getStartOfWeek = (date) => {
    let currentDate = new Date(date);
    let dayOfWeek = currentDate.getDay();
    let difference = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    let monday = new Date();
    monday.setDate(monday.getDate() + difference);

    return monday;
};

const createWeek = (today) => {
    const week = [];
    const monday = getStartOfWeek(today);

    for (let i = 0; i < 7; i++) {
        const day = new Date();
        day.setDate(monday.getDate() + i);
        const [weekDay, month, dayNum, year] = day.toString().split(" ");
        week.push({
            weekDay: weekDay,
            month: month,
            day: dayNum,
            year: year,
        });
    }

    return week;
};

const getTimeZone = (today) => {
    const offsetInMinutes = today.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
    const sign = offsetInMinutes > 0 ? "-" : "+";
    const formattedTimeZone = offsetHours < 10 ? `0${offsetHours}` : `${offsetHours}`;

    return `GMT${sign}${formattedTimeZone}`;
};

export { createWeek, getTimeZone };
