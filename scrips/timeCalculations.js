import { daysNumberOnTimeGrid, hoursInDay, daysInWeek, minutesInHour } from "./constants.js";

const getFirstDayInTimeGrid = (date) => {
    let currentDate = new Date(date);
    let currentWeekDay = currentDate.getDay();
    let difference = (currentWeekDay === 0 ? -6 : 1) - currentWeekDay;
    let monday = new Date();

    monday.setDate(monday.getDate() + difference);

    return daysNumberOnTimeGrid === daysInWeek ? monday : currentDate;
};

const getTimeZone = (today) => {
    const offsetInMinutes = today.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
    const sign = offsetInMinutes > 0 ? "-" : "+";
    const formattedTimeZone = offsetHours < 10 ? `0${offsetHours}` : `${offsetHours}`;

    return `GMT${sign}${formattedTimeZone}`;
};

const hourIsValid = (hour) => parseInt(hour) < hoursInDay;

const minutesAreValid = (minutes) => parseInt(minutes) < minutesInHour;

const minutesToHour = (minutes) => {
    return Math.round((minutes / minutesInHour) * 100) / 100;
};

const hoursToMinutes = (hours) => {
    return Math.round(hours * 60);
};

const formatHours = (hour) => (hour < 10 ? `0${hour}` : hour);

const formatMinutes = (minutes) => (minutes < 10 ? `0${minutes}` : minutes);

const getDisplayableTime = (hour, minutes) => {
    return `${formatHours(parseInt(hour, 10))}:${formatMinutes(parseInt(minutes, 10))}`;
};

const formatTime = (hourFraction) => {
    let hour = Math.floor(hourFraction);
    let minutes = hourFraction - hour;

    if (hour >= hoursInDay) hour = hour - hoursInDay;

    return getDisplayableTime(hour, hoursToMinutes(minutes));
};

export {
    getFirstDayInTimeGrid,
    getTimeZone,
    minutesToHour,
    hoursToMinutes,
    formatHours,
    formatMinutes,
    getDisplayableTime,
    formatTime,
    hourIsValid,
    minutesAreValid,
};
