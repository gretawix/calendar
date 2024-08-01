import { createDomElement } from "./utils.js";
import { cellHeight, currentEventTileId } from "./calendarVars.js";
import { openModal } from "./modal.js";
import { constructEventData } from "./eventsData.js";

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

const createNewEventTile = (event, newEventData) => {
    const tileTopPosition = getEventTileTopPosition(event);
    const eventTile = populateEventTile(newEventData);
    eventTile.style.top = `${tileTopPosition}px`;

    return eventTile;
};

const removeUnsavedEventTile = () => {
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);
    if (currentEventTile) currentEventTile.parentElement.removeChild(currentEventTile);
};

const handleEventCreationClick = (event) => {
    const clickedWeekDayCol = event.target;

    if (clickedWeekDayCol.hasAttribute("data-year")) {
        const newEventData = constructEventData(event);
        const eventTile = createNewEventTile(event, newEventData);
        openModal(event, newEventData);
        clickedWeekDayCol.appendChild(eventTile);
    }
};

export { removeUnsavedEventTile, getEventTileTopPosition, handleEventCreationClick };
