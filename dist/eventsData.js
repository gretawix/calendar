import { getLongWeekDayName, getLongMonthName, parseTime } from "./utils.js";
import { cellHeightInPx, currentEventTileId, defaultEventLengthInHours, emptyEventTitle } from "./constants.js";
import { placeNewEventTile, createEventTile } from "./eventTile.js";
import { getModalInputs, getGridDays } from "./selectors.js";
import { closeModal } from "./modal.js";
import { minutesToHour, hoursToMinutes, formatMinutes, formatHours, hourIsValid, minutesAreValid, } from "./timeCalculations.js";
import { currentEventDataKey, getDataFromLocalStorage, savedEventsKey, storeDataInLocalStorage, } from "./handleLocalStorage.js";
const adjustEventTopPosition = (event) => {
    const clickedElement = event.target;
    const distanceFromTop = clickedElement.getBoundingClientRect().top;
    const clickPosition = event.clientY - distanceFromTop;
    const increment = cellHeightInPx / 2;
    return Math.floor(clickPosition / increment) * increment;
};
const getEventLength = (eventData) => {
    const startHour = parseInt(eventData.startTime.hour, 10);
    const startMin = minutesToHour(eventData.startTime.minutes);
    const endHour = parseInt(eventData.endTime.hour, 10);
    const endMin = minutesToHour(eventData.endTime.minutes);
    return endHour + endMin - startHour - startMin;
};
const getTime = (hour, minutes) => {
    const time = parseTime(hour, minutes);
    if (!hourIsValid(time.hour) || !minutesAreValid(time.minutes))
        throw new Error("invalid time");
    return {
        hour: `${formatHours(time.hour)}`,
        minutes: `${formatMinutes(time.minutes)}`,
    };
};
const getEndTime = (startHour, minutes, eventLength = defaultEventLengthInHours) => {
    const endTime = startHour + minutesToHour(minutes) + eventLength;
    const endHour = Math.floor(endTime);
    const endMinutes = hoursToMinutes(endTime - endHour);
    return getTime(endHour, endMinutes);
};
const constructNewEvent = (event) => {
    const clickedColumn = event.target;
    const clickPosition = adjustEventTopPosition(event);
    const startHour = Math.floor(clickPosition / cellHeightInPx);
    const weekdayShort = clickedColumn.getAttribute("data-weekday");
    const monthNameShort = clickedColumn.getAttribute("data-month");
    let minutes = 0;
    if (clickPosition % cellHeightInPx === cellHeightInPx / 2)
        minutes = 30;
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
const saveEventToStorage = (eventData) => {
    const allSavedEvents = getDataFromLocalStorage(savedEventsKey) || [];
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);
    placeNewEventTile(currentEventTile, eventData);
    allSavedEvents.push(eventData);
    storeDataInLocalStorage(savedEventsKey, allSavedEvents);
};
const updateEventData = (eventData, title, dateInput, startTime, endTime) => {
    const [weekDayLong, date] = dateInput.split(", ");
    const [starHour, startMinutes] = startTime.split(":");
    const [endHour, sendMinutes] = endTime.split(":");
    eventData.weekday = weekDayLong.slice(0, 3);
    eventData.weekdayLong = weekDayLong;
    [eventData.monthLong, eventData.day] = date.split(" ");
    eventData.month = eventData.monthLong.slice(0, 3);
    eventData.title = title;
    eventData.startTime = getTime(starHour, startMinutes);
    eventData.endTime = getTime(endHour, sendMinutes);
    return eventData;
};
const saveEvent = () => {
    const [title, dateInput, startTime, endTime] = getModalInputs();
    let eventData = getDataFromLocalStorage(currentEventDataKey);
    let eventLength = getEventLength(eventData);
    if (!title.value) {
        title.classList.add("error");
        title.focus();
    }
    else if (eventLength <= 0) {
        endTime.classList.add("error");
        endTime.focus();
    }
    if (title.value && eventLength > 0) {
        try {
            eventData = updateEventData(eventData, title.value, dateInput.value, startTime.value, endTime.value);
            saveEventToStorage(eventData);
            closeModal();
        }
        catch {
            console.log(eventData);
        }
    }
};
const displayAllSavedEvents = () => {
    const allSavedEvents = getDataFromLocalStorage(savedEventsKey) || [];
    const gridDays = getGridDays();
    allSavedEvents.forEach((oneEvent) => {
        const eventTile = createEventTile(oneEvent);
        const eventParentDiv = Array.from(gridDays).find((day) => day.dataset.day === oneEvent.day &&
            day.dataset.month === oneEvent.month &&
            day.dataset.year === oneEvent.year);
        if (eventParentDiv)
            eventParentDiv.appendChild(eventTile);
    });
};
export { saveEvent, constructNewEvent, getEventLength, displayAllSavedEvents, getTime, getEndTime };
//# sourceMappingURL=eventsData.js.map