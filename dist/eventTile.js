import { createDomElement, appendChildren } from "./utils.js";
import { cellHeightInPx, currentEventTileId } from "./constants.js";
import { minutesToHour, getDisplayableTime } from "./timeCalculations.js";
import { openModal } from "./modal.js";
import { constructNewEvent, getEventLength } from "./eventsData.js";
import { currentEventDataKey, storeDataInLocalStorage } from "./handleLocalStorage.js";
const calculateTopPosition = (eventData) => {
    const startHour = parseInt(eventData.startTime.hour, 10);
    const startMin = minutesToHour(eventData.startTime.minutes);
    return (startHour + startMin) * cellHeightInPx;
};
const styleEventTile = (eventTile, eventData) => {
    const eventLength = getEventLength(eventData);
    const tileMargin = 4;
    eventTile.style.top = `${calculateTopPosition(eventData)}px`;
    eventTile.style.height = `${eventLength * cellHeightInPx - tileMargin}px`;
    eventTile.classList.remove("short", "long", "regular");
    if (eventLength < 0.7) {
        eventTile.classList.add("short");
    }
    else if (eventLength > 1) {
        eventTile.classList.add("long");
    }
    else {
        eventTile.classList.add("regular");
    }
};
const updateTileTime = (timeText, eventData) => {
    timeText.innerText = `${getDisplayableTime(parseInt(eventData.startTime.hour, 10), parseInt(eventData.startTime.minutes, 10))} - ${getDisplayableTime(eventData.endTime.hour, eventData.endTime.minutes)}`;
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
    if (currentEventTile)
        currentEventTile.parentElement.removeChild(currentEventTile);
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
    const eventTileTitle = currentEventTile.querySelector(".event-tile-title");
    eventTileTitle.innerText = eventData.title;
    currentEventTile.classList.remove("placeholder");
    currentEventTile.removeAttribute("id");
};
export { removeUnsavedEventTile, handleEventCreationClick, placeNewEventTile, createEventTile, styleEventTile, updateTileTime, };
//# sourceMappingURL=eventTile.js.map