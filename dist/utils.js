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
    if (classToAssign)
        div.className = classToAssign;
    if (idToAssign)
        div.id = idToAssign;
    return div;
};
const getLongWeekDayName = (shortName) => {
    const weekDaysNames = {
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
const getLongMonthName = (shortName) => {
    const monthNames = {
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
const appendChildren = (parent, childrenToAppedn) => {
    childrenToAppedn.forEach((child) => parent.appendChild(child));
    return parent;
};
const setElementDisplay = (element, displayStyle) => {
    element.style.display = displayStyle;
};
const getMinutesIncrements = () => {
    const minutesIncrements = [];
    for (let i = 0; i < minutesInHour / timeStepInMinutes; i++)
        minutesIncrements.push(i * timeStepInMinutes);
    return minutesIncrements;
};
export { setSameWidth, createDomElement, getLongWeekDayName, getLongMonthName, appendChildren, setElementDisplay, getMinutesIncrements, };
//# sourceMappingURL=utils.js.map