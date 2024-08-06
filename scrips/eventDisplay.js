import { createDomElement, formatHours, displayTime } from "./utils.js";
import { cellHeight, currentEventTileId } from "./calendarVars.js";
import { emptyEventTitle } from "./calendarVars.js";

const getEventInfo = (title, clickPosition) => {
    const hour = formatHours(Math.floor(clickPosition / cellHeight));
    let minutes = "00";
    if (clickPosition % cellHeight === cellHeight / 2) minutes = "30";

    return {
        eventTitle: title,
        eventStartTime: displayTime(hour, minutes),
        eventEndTime: displayTime(formatHours(parseInt(hour, 10) + 1), minutes),
    };
};

const getEventTileTopPosition = (event) => {
    const clickedElement = event.target;
    const distanceFromTop = clickedElement.getBoundingClientRect().top;
    const clickPosition = event.clientY - distanceFromTop;
    const increment = cellHeight / 2;

    return Math.floor(clickPosition / increment) * increment;
};

const populateEventTile = (eventInfo) => {
    const eventTile = createDomElement("div", "event-tile regular placeholder", currentEventTileId);
    const titleElement = createDomElement("p", "event-tile-title");
    const timeSpanTextElement = createDomElement("p", "event-tile-time");

    titleElement.innerText = eventInfo.eventTitle;
    timeSpanTextElement.innerText = `${eventInfo.eventStartTime} - ${eventInfo.eventEndTime}`;
    eventTile.appendChild(titleElement);
    eventTile.appendChild(timeSpanTextElement);

    return eventTile;
};

const createNewEventTile = (event) => {
    const tileTopPosition = getEventTileTopPosition(event);
    const eventInfo = getEventInfo(emptyEventTitle, tileTopPosition);
    const eventTile = populateEventTile(eventInfo);

    eventTile.style.top = `${tileTopPosition}px`;

    return eventTile;
};

const removeUnsavedEventTile = () => {
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);
    if (currentEventTile) currentEventTile.parentElement.removeChild(currentEventTile);
};
export { createNewEventTile, removeUnsavedEventTile };
