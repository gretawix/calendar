import { weekDaysNumber, hoursNumber } from "./calendarVars.js";

const getStartOfWeek = (date) => {
    let currentDate = new Date(date);
    let currentWeekDay = currentDate.getDay();
    let difference = (currentWeekDay === 0 ? -6 : 1) - currentWeekDay;
    let monday = new Date();

    monday.setDate(monday.getDate() + difference);

    return weekDaysNumber === 7 ? monday : currentDate;
};

const getTimeZone = (today) => {
    const offsetInMinutes = today.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
    const sign = offsetInMinutes > 0 ? "-" : "+";
    const formattedTimeZone = offsetHours < 10 ? `0${offsetHours}` : `${offsetHours}`;

    return `GMT${sign}${formattedTimeZone}`;
};

const minutesToHour = (minutes) => {
    return Math.round((parseInt(minutes, 10) / 60) * 100) / 100;
};

const hoursToMinutes = (hours) => {
    return Math.round(hours * 60);
};

const formatHours = (hour) => (parseInt(hour, 10) < 10 ? `0${parseInt(hour, 10)}` : hour);

const formatMinutes = (minutes) => (parseInt(minutes, 10) < 10 ? `0${parseInt(minutes, 10)}` : minutes);

const displayTime = (hour, minutes) => {
    return `${formatHours(hour)}:${formatMinutes(minutes)}`;
};

const formatTime = (hourFraction) => {
    let hour = Math.floor(hourFraction);
    let minutes = hourFraction - hour;

    if (hour >= hoursNumber) hour = hour - hoursNumber;

    return displayTime(hour, hoursToMinutes(minutes));
};

export {
    getStartOfWeek,
    getTimeZone,
    minutesToHour,
    hoursToMinutes,
    formatHours,
    formatMinutes,
    displayTime,
    formatTime,
};
