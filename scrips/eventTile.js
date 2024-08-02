import { createDomElement, appendChildren } from "./utils.js";
import { cellHeight, currentEventTileId } from "./calendarVars.js";
import { openModal } from "./modal.js";
import { constructNewEvent, getEventLength } from "./eventsData.js";
import { currentEventDataKey, storeDataInLocalStorage } from "./handleLocalStorage.js";
import { minutesToHour } from "./timeCalculations.js";

const calculateTopPosition = (eventData) => {
    let [startHour, startMin] = eventData.startTime.split(":");
    startHour = parseInt(startHour, 10);
    startMin = minutesToHour(startMin);

    return (startHour + startMin) * cellHeight;
};

const assignTileClass = (eventTile, eventLength) => {
    eventTile.classList.remove("short", "long", "regular");
    if (eventLength < 1) {
        eventTile.classList.add("short");
    } else if (eventLength > 1) {
        eventTile.classList.add("long");
    } else {
        eventTile.classList.add("regular");
    }
};

const createEventTile = (eventData) => {
    const eventTile = createDomElement("div", "event-tile");
    const title = createDomElement("p", "event-tile-title");
    const timeText = createDomElement("p", "event-tile-time");
    const eventLength = getEventLength(eventData);

    assignTileClass(eventTile, eventLength);
    title.innerText = eventData.title;
    timeText.innerText = `${eventData.startTime} - ${eventData.endTime}`;
    eventTile.style.top = `${calculateTopPosition(eventData)}px`;
    eventTile.style.height = `${eventLength * cellHeight - 4}px`;

    return appendChildren(eventTile, [title, timeText]);
};

const removeUnsavedEventTile = () => {
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);
    if (currentEventTile) currentEventTile.parentElement.removeChild(currentEventTile);
};

const handleEventCreationClick = (event) => {
    const clickedWeekDayCol = event.target;

    if (clickedWeekDayCol.hasAttribute("data-year")) {
        const newEventData = constructNewEvent(event);
        const eventTile = createEventTile(newEventData);

        eventTile.classList.add("placeholder");
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

export { removeUnsavedEventTile, handleEventCreationClick, placeNewEventTile, createEventTile };
