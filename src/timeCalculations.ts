import { daysNumberOnTimeGrid, hoursInDay, daysInWeek, minutesInHour } from "./constants.js";
import { parseTime } from "./utils.js";

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

const minutesToHour = (minutes: number | string): number => {
    let minutesInt: number;
    if (typeof minutes === "string") {
        minutesInt = parseInt(minutes, 10);
    } else minutesInt = minutes;

    return Math.round((minutesInt / minutesInHour) * 100) / 100;
};

const hoursToMinutes = (hours: number | string): number => {
    let hoursInt: number;
    if (typeof hours === "string") {
        hoursInt = parseInt(hours, 10);
    } else hoursInt = hours;

    return Math.round(hoursInt * 60);
};

const formatHours = (hour: number): string => (hour < 10 ? `0${hour}` : `${hour}`);

const formatMinutes = (minutes: number): string => (minutes < 10 ? `0${minutes}` : `${minutes}`);

const getDisplayableTime = (hour: number | string, minutes: number | string): string => {
    const time = parseTime(hour, minutes);

    return `${formatHours(time.hour)}:${formatMinutes(time.minutes)}`;
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
