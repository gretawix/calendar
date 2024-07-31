import { weekDaysNumber } from "./calendarVars.js";

const getStartOfWeek = (date) => {
    let currentDate = new Date(date);
    let currentWeekDay = currentDate.getDay();
    let difference = (currentWeekDay === 0 ? -6 : 1) - currentWeekDay;
    let monday = new Date();

    monday.setDate(monday.getDate() + difference);

    return monday;
};

const createWeek = (today) => {
    const week = [];
    const monday = getStartOfWeek(today);

    for (let i = 0; i < weekDaysNumber; i++) {
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
