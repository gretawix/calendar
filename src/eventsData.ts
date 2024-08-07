import { getLongWeekDayName, getLongMonthName } from "./utils.js";
import { cellHeightInPx, currentEventTileId, defaultEventLengthInHours, emptyEventTitle } from "./constants.js";
import { placeNewEventTile, createEventTile } from "./eventTile.js";
import { getModalInputs, getGridDays } from "./selectors.js";
import { closeModal } from "./modal.js";
import {
    minutesToHour,
    hoursToMinutes,
    formatMinutes,
    formatHours,
    hourIsValid,
    minutesAreValid,
} from "./timeCalculations.js";
import {
    currentEventDataKey,
    getDataFromLocalStorage,
    savedEventsKey,
    storeDataInLocalStorage,
} from "./handleLocalStorage.js";
import { EventData, Time } from "./types/main.js";

const adjustEventTopPosition = (event: MouseEvent): number => {
    const clickedElement = event.target as HTMLElement;
    const distanceFromTop = clickedElement.getBoundingClientRect().top;
    const clickPosition = event.clientY - distanceFromTop;
    const increment = cellHeightInPx / 2;

    return Math.floor(clickPosition / increment) * increment;
};

const getEventLength = (eventData: EventData): number => {
    const startHour = parseInt(eventData.startTime.hour, 10);
    const startMin = minutesToHour(parseInt(eventData.startTime.minutes, 10));
    const endHour = parseInt(eventData.endTime.hour, 10);
    const endMin = minutesToHour(parseInt(eventData.endTime.minutes, 10));

    return endHour + endMin - startHour - startMin;
};

const getTime = (hour: number, minutes: number): Time => {
    if (!hourIsValid(hour) || !minutesAreValid(minutes)) throw new Error("invalid time");

    return {
        hour: `${formatHours(hour)}`,
        minutes: `${formatMinutes(minutes)}`,
    };
};

const getEndTime = (startHour: number, minutes: number, eventLength = defaultEventLengthInHours): Time => {
    const endTime = startHour + minutesToHour(minutes) + eventLength;
    const endHour = Math.floor(endTime);
    const endMinutes = hoursToMinutes(endTime - endHour);

    return getTime(endHour, endMinutes);
};

const constructNewEvent = (event: MouseEvent): EventData => {
    const clickedColumn = event.target as HTMLElement;
    const clickPosition = adjustEventTopPosition(event);
    const startHour = Math.floor(clickPosition / cellHeightInPx);
    const weekdayShort = clickedColumn.getAttribute("data-weekday");
    const monthNameShort = clickedColumn.getAttribute("data-month");

    let minutes = 0;
    if (clickPosition % cellHeightInPx === cellHeightInPx / 2) minutes = 30;

    return {
        title: emptyEventTitle,
        startTime: getTime(startHour, minutes),
        endTime: getEndTime(startHour, minutes),
        weekday: weekdayShort,
        weekdayLong: getLongWeekDayName(weekdayShort),
        day: clickedColumn.getAttribute("data-day"),
        month: monthNameShort,
        monthLong: getLongMonthName(monthNameShort),
        year: clickedColumn.getAttribute("data-year"),
    };
};

const saveEventToStorage = (eventData: EventData): void => {
    const allSavedEvents: EventData[] = getDataFromLocalStorage(savedEventsKey) || [];
    const currentEventTile: HTMLElement = document.querySelector(`#${currentEventTileId}`);

    placeNewEventTile(currentEventTile, eventData);
    allSavedEvents.push(eventData);
    storeDataInLocalStorage(savedEventsKey, allSavedEvents);
};

const updateEventData = (
    eventData: EventData,
    title: string,
    dateInput: string,
    startTime: string,
    endTime: string
): EventData => {
    const [weekDayLong, date] = dateInput.split(", ");
    const [starHour, startMinutes] = startTime.split(":");
    const [endHour, sendMinutes] = endTime.split(":");

    eventData.weekday = weekDayLong.slice(0, 3);
    eventData.weekdayLong = weekDayLong;
    [eventData.monthLong, eventData.day] = date.split(" ");
    eventData.month = eventData.monthLong.slice(0, 3);

    eventData.title = title;
    eventData.startTime = getTime(parseInt(starHour, 10), parseInt(startMinutes, 10));
    eventData.endTime = getTime(parseInt(endHour, 10), parseInt(sendMinutes, 10));

    return eventData;
};

const saveEvent = (): void => {
    const [title, dateInput, startTime, endTime] = getModalInputs();
    let eventData: EventData = getDataFromLocalStorage(currentEventDataKey);
    let eventLength = getEventLength(eventData);

    if (!title.value) {
        title.classList.add("error");
        title.focus();
    } else if (eventLength <= 0) {
        endTime.classList.add("error");
        endTime.focus();
    }
    if (title.value && eventLength > 0) {
        try {
            eventData = updateEventData(eventData, title.value, dateInput.value, startTime.value, endTime.value);
            saveEventToStorage(eventData);
            closeModal();
        } catch {
            console.log(eventData);
        }
    }
};

const displayAllSavedEvents = (): void => {
    const allSavedEvents: EventData[] = getDataFromLocalStorage(savedEventsKey) || [];
    const gridDays = getGridDays();

    allSavedEvents.forEach((oneEvent) => {
        const eventTile = createEventTile(oneEvent);
        const eventParentDiv = Array.from(gridDays).find(
            (day) =>
                day.dataset.day === oneEvent.day &&
                day.dataset.month === oneEvent.month &&
                day.dataset.year === oneEvent.year
        );

        if (eventParentDiv) eventParentDiv.appendChild(eventTile);
    });
};

export { saveEvent, constructNewEvent, getEventLength, displayAllSavedEvents, getTime, getEndTime };
