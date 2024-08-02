import { createDomElement, appendChildren } from "./utils.js";
import { cellHeight, currentEventTileId } from "./calendarVars.js";
import { openModal } from "./modal.js";
import { constructEventData } from "./eventsData.js";
import { currentEventDataKey, storeDataInLocalStorage } from "./handleLocalStorage.js";

const eventPositionFromClick = (event) => {
    const distanceFromTop = event.target.getBoundingClientRect().top;
    const clickPosition = event.clientY - distanceFromTop;
    const increment = cellHeight / 2;

    return Math.floor(clickPosition / increment) * increment;
};

const eventPositionFromTime = (eventData) => {
    return "100px";
};

const createEventTile = (eventData, topPosition) => {
    const eventTile = createDomElement("div", "event-tile regular placeholder");
    const title = createDomElement("p", "event-tile-title");
    const timeText = createDomElement("p", "event-tile-time");

    title.innerText = eventData.title;
    timeText.innerText = `${eventData.startTime} - ${eventData.endTime}`;
    eventTile.style.top = `${topPosition}px`;

    return appendChildren(eventTile, [title, timeText]);
};

const removeUnsavedEventTile = () => {
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);
    if (currentEventTile) currentEventTile.parentElement.removeChild(currentEventTile);
};

const handleEventCreationClick = (event) => {
    const clickedWeekDayCol = event.target;

    if (clickedWeekDayCol.hasAttribute("data-year")) {
        const newEventData = constructEventData(event);
        const topPosition = eventPositionFromClick(event);
        const eventTile = createEventTile(newEventData, topPosition);

        eventTile.id = currentEventTileId;
        storeDataInLocalStorage(currentEventDataKey, newEventData);
        openModal(event, newEventData);
        clickedWeekDayCol.appendChild(eventTile);
    }
};

const placeNewEventTile = (currentEventTile, eventData) => {
    currentEventTile.querySelector(".event-tile-title").innerText = eventData.title;
    currentEventTile.classList.remove("placeholder");
    currentEventTile.removeAttribute("id");
};

export { removeUnsavedEventTile, eventPositionFromClick, handleEventCreationClick, placeNewEventTile };
