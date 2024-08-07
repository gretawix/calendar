import { timeStepInMinutes, minutesInHour } from "./constants.js";
import { MonthNamesLong, MonthNamesShort, WeekDayNamesLong, WeekDayNamesShort } from "./types/main.js";

const setSameWidth = (baseElementId: string, targetElementId: string): void => {
    const baseElement: HTMLElement = document.querySelector(baseElementId);
    const targetElement: HTMLElement = document.querySelector(targetElementId);
    const width: string = `${Math.ceil(baseElement.getBoundingClientRect().width)}px`;
    targetElement.style.width = width;
    baseElement.style.width = width;
};

const createDomElement = (domEl: string = "div", classToAssign: string = "", idToAssign: string = ""): HTMLElement => {
    const div = document.createElement(domEl);
    if (classToAssign) div.className = classToAssign;
    if (idToAssign) div.id = idToAssign;

    return div;
};

const getLongWeekDayName = (shortName: WeekDayNamesShort): WeekDayNamesLong => {
    const weekDaysNames: Record<WeekDayNamesShort, WeekDayNamesLong> = {
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
        Sun: "Sunday",
    };

    return weekDaysNames[shortName];
};

const getLongMonthName = (shortName: MonthNamesShort): MonthNamesLong => {
    const monthNames: Record<MonthNamesShort, MonthNamesLong> = {
        Jan: "January",
        Feb: "February",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        Jul: "July",
        Aug: "August",
        Sep: "September",
        Oct: "October",
        Nov: "November",
        Dec: "December",
    };
    return monthNames[shortName];
};

const appendChildren = (parent: HTMLElement, childrenToAppedn: HTMLElement[]): HTMLElement => {
    childrenToAppedn.forEach((child) => parent.appendChild(child));

    return parent;
};

const setElementDisplay = (element: HTMLElement, displayStyle: "block" | "flex" | "none"): void => {
    element.style.display = displayStyle;
};

const getMinutesIncrements = (): number[] => {
    const minutesIncrements: number[] = [];
    for (let i = 0; i < minutesInHour / timeStepInMinutes; i++) minutesIncrements.push(i * timeStepInMinutes);

    return minutesIncrements;
};

const parseTime = (hours: string | number, minutes: string | number): { hour: number; minutes: number } => {
    let hourInt: number;
    let minutesInt: number;
    if (typeof hours === "string" && typeof minutes === "string") {
        hourInt = parseInt(hours, 10);
        minutesInt = parseInt(minutes, 10);
    } else if (typeof hours === "string") {
        hourInt = parseInt(hours, 10);
    } else if (typeof minutes === "string") {
        minutesInt = parseInt(minutes, 10);
    } else {
        hourInt = hours;
        minutesInt = minutes;
    }

    return { hour: hourInt, minutes: minutesInt };
};

export {
    setSameWidth,
    createDomElement,
    getLongWeekDayName,
    getLongMonthName,
    appendChildren,
    setElementDisplay,
    getMinutesIncrements,
    parseTime,
};
