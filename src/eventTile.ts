import { createDomElement, appendChildren } from "./utils";
import { cellHeightInPx, currentEventTileId } from "./constants";
import { minutesToHour, getDisplayableTime } from "./timeCalculations";
import { openModal } from "./modal";
import { constructNewEvent, getEventLength } from "./eventsData";
import type { EventData } from "./types/main";
import eventsServiceFactory from "./dataService";

const eventsService = eventsServiceFactory();

const calculateTopPosition = (eventData: EventData) => {
    const startHour = parseInt(eventData.startTime.hour, 10);
    const startMin = minutesToHour(eventData.startTime.minutes);

    return (startHour + startMin) * cellHeightInPx;
};

const styleEventTile = (eventTile: HTMLElement, eventData: EventData) => {
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

const updateTileTime = (timeText: HTMLElement, eventData: EventData) => {
    const timeTodisplay = `${getDisplayableTime(
        eventData.startTime.hour,
        eventData.startTime.minutes
    )} - ${getDisplayableTime(eventData.endTime.hour, eventData.endTime.minutes)}`;

    timeText.innerText = timeTodisplay;
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

const removeUnsavedEventTile = () => {
    const currentEventTile: HTMLElement | null = document.querySelector(`#${currentEventTileId}`);
    if (currentEventTile && currentEventTile.parentElement)
        currentEventTile.parentElement.removeChild(currentEventTile);
};

const handleEventCreationClick = async (event: MouseEvent) => {
    const clickedWeekDayCol = event.target as HTMLElement | null;

    if (clickedWeekDayCol && clickedWeekDayCol.hasAttribute("data-year")) {
        const newEventData: EventData = constructNewEvent(event);
        const eventTile = createEventTile(newEventData);

        eventTile.classList.add("placeholder");
        eventTile.id = currentEventTileId;
        await eventsService.create(newEventData, "current");
        openModal(event, newEventData);
        clickedWeekDayCol.appendChild(eventTile);
    }
};

const placeNewEventTile = (currentEventTile: HTMLElement, eventData: EventData) => {
    const eventTileTitle: HTMLElement | null = currentEventTile.querySelector(".event-tile-title");

    if (eventTileTitle) eventTileTitle.innerText = eventData.title;
    currentEventTile.classList.remove("placeholder");
    currentEventTile.removeAttribute("id");
};

const updateEventTile = (eventData: EventData, currentEventTile: HTMLElement, endTimeInput?: HTMLInputElement) => {
    const timeText: HTMLElement | null = currentEventTile.querySelector(".event-tile-time");
    if (getEventLength(eventData) > 0) {
        if (endTimeInput) endTimeInput.classList.remove("error");
        styleEventTile(currentEventTile, eventData);
        if (timeText) updateTileTime(timeText, eventData);
        eventsService.create(eventData, "current");
    } else {
        if (endTimeInput) endTimeInput.classList.add("error");
        eventsService.create(eventData, "current");
        throw new Error("end time cannot be earlier than start time");
    }
};

export {
    removeUnsavedEventTile,
    handleEventCreationClick,
    placeNewEventTile,
    createEventTile,
    styleEventTile,
    updateTileTime,
    updateEventTile,
};
