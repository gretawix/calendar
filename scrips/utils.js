import { timeStepInMinutes, minutesInHour } from "./constants.js";

const setSameWidth = (baseElementId, targetElementId) => {
    const baseElement = document.querySelector(baseElementId);
    const targetElement = document.querySelector(targetElementId);
    const width = `${Math.ceil(baseElement.getBoundingClientRect().width)}px`;
    targetElement.style.width = width;
    baseElement.style.width = width;
};

const createDomElement = (domEl = "div", classToAssign = "", idToAssign = "") => {
    const div = document.createElement(domEl);
    if (classToAssign) div.className = classToAssign;
    if (idToAssign) div.id = idToAssign;

    return div;
};

const getLongWeekDayName = (shortName) => {
    const weekDaysNames = [
        { short: "Mon", long: "Monday" },
        { short: "Tue", long: "Tuesday" },
        { short: "Wed", long: "Wednesday" },
        { short: "Thu", long: "Thursday" },
        { short: "Fri", long: "Friday" },
        { short: "Sat", long: "Saturday" },
        { short: "Sun", long: "Sunday" },
    ];

    return weekDaysNames.find((name) => name.short === shortName).long;
};

const getLongMonthName = (shortName) => {
    const monthNames = [
        { short: "Jan", long: "January" },
        { short: "Feb", long: "February" },
        { short: "Mar", long: "March" },
        { short: "Apr", long: "April" },
        { short: "May", long: "May" },
        { short: "Jun", long: "June" },
        { short: "Jul", long: "July" },
        { short: "Aug", long: "August" },
        { short: "Sep", long: "September" },
        { short: "Oct", long: "October" },
        { short: "Nov", long: "November" },
        { short: "Dec", long: "December" },
    ];

    return monthNames.find((name) => name.short === shortName).long;
};

const appendChildren = (parent, childrenToAppedn) => {
    childrenToAppedn.forEach((child) => parent.appendChild(child));

    return parent;
};

const setElementDisplay = (element, displayStyle) => {
    element.style.display = displayStyle;
};

const getMinutesIncrements = () => {
    const minutesIncrements = [];
    for (let i = 0; i < minutesInHour / timeStepInMinutes; i++) minutesIncrements.push(i * timeStepInMinutes);

    return minutesIncrements;
};

export {
    setSameWidth,
    createDomElement,
    getLongWeekDayName,
    getLongMonthName,
    appendChildren,
    setElementDisplay,
    getMinutesIncrements,
};
