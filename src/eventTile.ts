import { createDomElement, appendChildren } from "./utils.js";
import { cellHeightInPx, currentEventTileId } from "./constants.js";
import { minutesToHour, getDisplayableTime } from "./timeCalculations.js";
import { openModal } from "./modal.js";
import { constructNewEvent, getEventLength } from "./eventsData.js";
import { currentEventDataKey, storeDataInLocalStorage } from "./handleLocalStorage.js";
import { EventData } from "./types/main.js";

const calculateTopPosition = (eventData: EventData): number => {
    const startHour = parseInt(eventData.startTime.hour, 10);
    const startMin = minutesToHour(parseInt(eventData.startTime.minutes, 10));

    return (startHour + startMin) * cellHeightInPx;
};

const styleEventTile = (eventTile: HTMLElement, eventData: EventData): void => {
    const eventLength = getEventLength(eventData);
    const tileMargin: number = 4;

    eventTile.style.top = `${calculateTopPosition(eventData)}px`;
    eventTile.style.height = `${eventLength * cellHeightInPx - tileMargin}px`;
    eventTile.classList.remove("short", "long", "regular");

    if (eventLength < 0.7) {
        eventTile.classList.add("short");
    } else if (eventLength > 1) {
        eventTile.classList.add("long");
    } else {
        eventTile.classList.add("regular");
    }
};

const updateTileTime = (timeText: HTMLElement, eventData: EventData): void => {
    timeText.innerText = `${getDisplayableTime(
        parseInt(eventData.startTime.hour, 10),
        parseInt(eventData.startTime.minutes, 10)
    )} - ${getDisplayableTime(parseInt(eventData.endTime.hour, 10), parseInt(eventData.endTime.minutes, 10))}`;
};

const createEventTile = (eventData: EventData): HTMLElement => {
    const eventTile = createDomElement("div", "event-tile");
    const title = createDomElement("p", "event-tile-title");
    const timeText = createDomElement("p", "event-tile-time");

    styleEventTile(eventTile, eventData);
    title.innerText = eventData.title;
    updateTileTime(timeText, eventData);

    return appendChildren(eventTile, [title, timeText]);
};

const removeUnsavedEventTile = (): void => {
    const currentEventTile: HTMLElement = document.querySelector(`#${currentEventTileId}`);
    if (currentEventTile) currentEventTile.parentElement.removeChild(currentEventTile);
};

const handleEventCreationClick = (event: MouseEvent): void => {
    const clickedWeekDayCol = event.target as HTMLElement;

    if (clickedWeekDayCol.hasAttribute("data-year")) {
        const newEventData: EventData = constructNewEvent(event);
        const eventTile = createEventTile(newEventData);

        eventTile.classList.add("placeholder");
        eventTile.id = currentEventTileId;
        storeDataInLocalStorage(currentEventDataKey, newEventData);
        openModal(event, newEventData);
        clickedWeekDayCol.appendChild(eventTile);
    }
};

const placeNewEventTile = (currentEventTile: HTMLElement, eventData: EventData): void => {
    const eventTileTitle: HTMLElement = currentEventTile.querySelector(".event-tile-title");

    eventTileTitle.innerText = eventData.title;
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
