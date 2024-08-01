import { createDomElement } from "./utils.js";
import { cellHeight } from "./calendarVars.js";

const updateEventInfo = (title, startTime, endTime = null) => {
    const eventInfo = {
        eventTitle: title,
        eventStartTime: startTime,
    };
    eventInfo.eventEndTime = endTime ? endTime : eventInfo.eventStartTime + 1;

    return eventInfo;
};

const getEventTilePosition = (event) => {
    const clickedElement = event.target;
    const distanceFromTop = clickedElement.getBoundingClientRect().top;
    const clickPosition = event.clientY - distanceFromTop;
    const increment = cellHeight / 2;

    return Math.floor(clickPosition / increment) * increment;
};

const createEventTile = (event) => {
    const eventTile = createDomElement("div", "event-tile regular placeholder");
    const eventTilePosition = getEventTilePosition(event);
    const eventInfo = updateEventInfo("(no title)", eventTilePosition);
    const titleElement = createDomElement("p", "event-tile-title");
    const timeSpanTextElement = createDomElement("p", "event-tile-time");

    titleElement.innerText = eventInfo.eventTitle;
    timeSpanTextElement.innerText = `${eventInfo.eventStartTime} - ${eventInfo.eventEndTime}`;
    eventTile.appendChild(titleElement);
    eventTile.appendChild(timeSpanTextElement);
    eventTile.style.top = `${eventTilePosition}px`;

    return eventTile;
};

const placeEventTile = (event) => {
    let clickedElement = event.target;

    const eventTile = createEventTile(event);

    clickedElement.appendChild(eventTile);

    return eventTile;
};

export { placeEventTile };
