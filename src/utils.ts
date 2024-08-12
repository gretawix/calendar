import { timeStepInMinutes, minutesInHour } from "./constants";

const setSameWidth = (baseElementId: string, targetElementId: string) => {
    let width: string = "";
    const baseElement: HTMLElement | null = document.querySelector(baseElementId);
    const targetElement: HTMLElement | null = document.querySelector(targetElementId);

    if (baseElement) width = `${Math.ceil(baseElement.getBoundingClientRect().width)}px`;
    if (targetElement) targetElement.style.width = width;
    if (baseElement) baseElement.style.width = width;
};

const createDomElement = (domEl: string = "div", classToAssign: string = "", idToAssign: string = "") => {
    const div = document.createElement(domEl);
    if (classToAssign) div.className = classToAssign;
    if (idToAssign) div.id = idToAssign;

    return div;
};

const appendChildren = (parent: HTMLElement, childrenToAppedn: HTMLElement[]) => {
    childrenToAppedn.forEach((child) => parent.appendChild(child));

    return parent;
};

const setElementDisplay = (element: HTMLElement, displayStyle: "block" | "flex" | "none") => {
    element.style.display = displayStyle;
};

const getMinutesIncrements = () => {
    const minutesIncrements = [];
    for (let i = 0; i < minutesInHour / timeStepInMinutes; i++) minutesIncrements.push(i * timeStepInMinutes);

    return minutesIncrements;
};

const parseTime = (hours: string | number, minutes: string | number): { hour: number; minutes: number } => {
    let hourInt: number = 0;
    let minutesInt: number = 0;
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

export { setSameWidth, createDomElement, appendChildren, setElementDisplay, getMinutesIncrements, parseTime };
