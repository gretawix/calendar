import { daysNumberOnTimeGrid, hoursInDay, daysInWeek, minutesInHour } from "./constants.js";

const getFirstDayInTimeGrid = (date: Date): Date => {
    let currentDate = new Date(date);
    let currentWeekDay = currentDate.getDay();
    let difference = (currentWeekDay === 0 ? -6 : 1) - currentWeekDay;
    let monday = new Date();

    monday.setDate(monday.getDate() + difference);

    return daysNumberOnTimeGrid === daysInWeek ? monday : currentDate;
};

const getTimeZone = (today: Date): string => {
    const offsetInMinutes = today.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
    const sign = offsetInMinutes > 0 ? "-" : "+";
    const formattedTimeZone = offsetHours < 10 ? `0${offsetHours}` : `${offsetHours}`;

    return `GMT${sign}${formattedTimeZone}`;
};

const hourIsValid = (hour: number): boolean => hour < hoursInDay;

const minutesAreValid = (minutes: number): boolean => minutes < minutesInHour;

const minutesToHour = (minutes: number): number => {
    return Math.round((minutes / minutesInHour) * 100) / 100;
};

const hoursToMinutes = (hours: number): number => {
    return Math.round(hours * 60);
};

const formatHours = (hour: number): string => (hour < 10 ? `0${hour}` : `${hour}`);

const formatMinutes = (minutes: number): string => (minutes < 10 ? `0${minutes}` : `${minutes}`);

const getDisplayableTime = (hour: number, minutes: number): string => {
    return `${formatHours(hour)}:${formatMinutes(minutes)}`;
};

const formatTime = (hourFraction: number): string => {
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
