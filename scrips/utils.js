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

const formatHours = (hour) => (hour < 10 ? `0${hour}` : `${hour}`);

export { setSameWidth, createDomElement, formatHours };
