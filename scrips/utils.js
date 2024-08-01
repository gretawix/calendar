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

export { setSameWidth, createDomElement };
