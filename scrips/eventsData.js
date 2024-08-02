import { formatHours, getLongWeekDayName, getLongMonthName, formatMinutes } from "./utils.js";
import { cellHeight, currentEventTileId, defaultEventLength } from "./calendarVars.js";
import { placeNewEventTile, createEventTile } from "./eventTile.js";
import { getModalInput, getGridDays } from "./selectors.js";
import { closeModal } from "./modal.js";
import { minutesToHour, hoursToMinutes } from "./timeCalculations.js";
import {
    currentEventDataKey,
    getDataFromLocalStorage,
    savedEventsKey,
    storeDataInLocalStorage,
} from "./handleLocalStorage.js";

const adjustEventPosition = (event) => {
    const distanceFromTop = event.target.getBoundingClientRect().top;
    const clickPosition = event.clientY - distanceFromTop;
    const increment = cellHeight / 2;

    return Math.floor(clickPosition / increment) * increment;
};

const getEventLength = (eventData) => {
    const startHour = parseInt(eventData.startTime.hour, 10);
    const startMin = minutesToHour(eventData.startTime.minutes);
    const endHour = parseInt(eventData.endTime.hour, 10);
    const endMin = minutesToHour(eventData.endTime.minutes);

    return endHour + endMin - startHour - startMin;
};

const setStartTime = (startHour, minutes) => {
    return {
        hour: `${formatHours(startHour)}`,
        minutes: `${formatMinutes(minutes)}`,
    };
};

const setDefaultEndTime = (startHour, minutes) => {
    const endTime = startHour + minutesToHour(minutes) + defaultEventLength;
    const endHour = Math.floor(endTime);
    const endMinutes = hoursToMinutes(endTime - endHour);

    return {
        hour: `${formatHours(endHour)}`,
        minutes: `${formatMinutes(endMinutes)}`,
    };
};

const constructNewEvent = (event) => {
    const clickedColumn = event.target;
    const clickPosition = adjustEventPosition(event);
    const startHour = Math.floor(clickPosition / cellHeight);
    const weekdayShort = clickedColumn.getAttribute("data-weekday");
    const monthNameShort = clickedColumn.getAttribute("data-month");

    let minutes = 0;
    if (clickPosition % cellHeight === cellHeight / 2) minutes = 30;

    return {
        title: "(no title)",
        startTime: setStartTime(startHour, minutes),
        endTime: setDefaultEndTime(startHour, minutes),
        weekday: weekdayShort,
        weekdayLong: getLongWeekDayName(weekdayShort),
        day: clickedColumn.getAttribute("data-day"),
        month: monthNameShort,
        monthLong: getLongMonthName(monthNameShort),
        year: clickedColumn.getAttribute("data-year"),
    };
};

const recordNewEvent = (newEventData, currentEventTile) => {
    const allSavedEvents = getDataFromLocalStorage(savedEventsKey) || [];

    placeNewEventTile(currentEventTile, newEventData);
    allSavedEvents.push(newEventData);
    storeDataInLocalStorage(savedEventsKey, allSavedEvents);
};

const saveEvent = () => {
    const title = getModalInput("title");
    const dateInput = getModalInput("date");
    const timeStart = getModalInput("time-start");
    const timeEnd = getModalInput("time-end");
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);
    const eventData = getDataFromLocalStorage(currentEventDataKey);

    if (title.value) {
        eventData.title = title.value;
        recordNewEvent(eventData, currentEventTile);
        closeModal();
    } else {
        title.classList.add("error");
        title.focus();
    }
};

const displayAllSavedEvents = () => {
    const allSavedEvents = getDataFromLocalStorage(savedEventsKey) || [];
    const gridDays = getGridDays();

    allSavedEvents.forEach((oneEvent) => {
        const eventTile = createEventTile(oneEvent);
        const eventParentDiv = Array.from(gridDays).find(
            (day) =>
                day.dataset.day === oneEvent.day &&
                day.dataset.month === oneEvent.month &&
                day.dataset.year === oneEvent.year
        );

        eventParentDiv.appendChild(eventTile);
    });
};

export { saveEvent, constructNewEvent, getEventLength, displayAllSavedEvents };
