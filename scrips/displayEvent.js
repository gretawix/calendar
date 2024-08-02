import { createDomElement, appendChildren } from "./utils.js";
import { cellHeight, currentEventTileId } from "./calendarVars.js";
import { openModal } from "./modal.js";
import { constructEventData } from "./eventsData.js";

const getEventTileTopPosition = (event) => {
    const distanceFromTop = event.target.getBoundingClientRect().top;
    const clickPosition = event.clientY - distanceFromTop;
    const increment = cellHeight / 2;

    return Math.floor(clickPosition / increment) * increment;
};

const populateEventTile = (eventData) => {
    const eventTile = createDomElement("div", "event-tile regular placeholder", currentEventTileId);
    const title = createDomElement("p", "event-tile-title");
    const timeText = createDomElement("p", "event-tile-time");

    title.innerText = eventData.title;
    timeText.innerText = `${eventData.startTime} - ${eventData.endTime}`;

    return appendChildren(eventTile, [title, timeText]);
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
