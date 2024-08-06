import { createDomElement, appendChildren } from "./utils.js";
import { cellHeight, currentEventTileId } from "./calendarVars.js";
import { openModal } from "./modal.js";
import { constructNewEvent, getEventLength } from "./eventsData.js";
import { currentEventDataKey, storeDataInLocalStorage } from "./handleLocalStorage.js";
import { minutesToHour, displayTime } from "./timeCalculations.js";

const calculateTopPosition = (eventData) => {
    const startHour = parseInt(eventData.startTime.hour, 10);
    const startMin = minutesToHour(eventData.startTime.minutes);

    return (startHour + startMin) * cellHeight;
};

const styleEventTile = (eventTile, eventData) => {
    const eventLength = getEventLength(eventData);

    eventTile.style.top = `${calculateTopPosition(eventData)}px`;
    eventTile.style.height = `${eventLength * cellHeight - 4}px`;
    eventTile.classList.remove("short", "long", "regular");

    if (eventLength < 0.7) {
        eventTile.classList.add("short");
    } else if (eventLength > 1) {
        eventTile.classList.add("long");
    } else {
        eventTile.classList.add("regular");
    }
};

const updateTileTime = (timeText, eventData) => {
    timeText.innerText = `${displayTime(eventData.startTime.hour, eventData.startTime.minutes)} - ${displayTime(
        eventData.endTime.hour,
        eventData.endTime.minutes
    )}`;
};

const createEventTile = (eventData) => {
    const eventTile = createDomElement("div", "event-tile");
    const title = createDomElement("p", "event-tile-title");
    const timeText = createDomElement("p", "event-tile-time");

    styleEventTile(eventTile, eventData);
    title.innerText = eventData.title;
    updateTileTime(timeText, eventData);

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

export {
    removeUnsavedEventTile,
    handleEventCreationClick,
    placeNewEventTile,
    createEventTile,
    styleEventTile,
    updateTileTime,
};
