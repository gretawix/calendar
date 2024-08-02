import { formatHours, getLongWeekDayName, getLongMonthName } from "./utils.js";
import { cellHeight, currentEventTileId } from "./calendarVars.js";
import { placeNewEventTile, createEventTile } from "./eventTile.js";
import { getModalInput, getModal, getGridDays } from "./selectors.js";
import { closeModal } from "./modal.js";
import { minutesToHour } from "./timeCalculations.js";
import {
    currentEventDataKey,
    getDataFromLocalStorage,
    savedEventsKey,
    storeDataInLocalStorage,
} from "./handleLocalStorage.js";

const createEventPosition = (event) => {
    const distanceFromTop = event.target.getBoundingClientRect().top;
    const clickPosition = event.clientY - distanceFromTop;
    const increment = cellHeight / 2;

    return Math.floor(clickPosition / increment) * increment;
};

const constructEventData = (event, title = "(no title)") => {
    const clickedColumn = event.target;
    const clickPosition = createEventPosition(event);
    const hour = formatHours(Math.floor(clickPosition / cellHeight));
    const weekdayShort = clickedColumn.getAttribute("data-weekday");
    const monthNameShort = clickedColumn.getAttribute("data-month");

    let minutes = "00";
    if (clickPosition % cellHeight === cellHeight / 2) minutes = "30";

    const eventData = {
        title,
        startTime: `${hour}:${minutes}`,
        endTime: `${formatHours(parseInt(hour, 10) + 1)}:${minutes}`,
        weekday: weekdayShort,
        weekdayLong: getLongWeekDayName(weekdayShort),
        day: clickedColumn.getAttribute("data-day"),
        month: monthNameShort,
        monthLong: getLongMonthName(monthNameShort),
        year: clickedColumn.getAttribute("data-year"),
    };

    return eventData;
};

const recordNewEvent = (newEventData, currentEventTile) => {
    const allSavedEvents = getDataFromLocalStorage(savedEventsKey) || [];

    placeNewEventTile(currentEventTile, newEventData);
    allSavedEvents.push(newEventData);
    storeDataInLocalStorage(savedEventsKey, allSavedEvents);
};

const getEventLength = (eventData) => {
    let [startHour, startMin] = eventData.startTime.split(":");
    let [endHour, endMin] = eventData.endTime.split(":");

    startHour = parseInt(startHour, 10);
    startMin = minutesToHour(startMin);
    endHour = parseInt(endHour, 10);
    endMin = minutesToHour(endMin);

    return endHour + endMin - startHour - startMin;
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

export { saveEvent, constructEventData, getEventLength, displayAllSavedEvents };
