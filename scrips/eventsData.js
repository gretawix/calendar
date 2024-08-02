import { formatHours, getLongWeekDayName, getLongMonthName } from "./utils.js";
import { cellHeight, currentEventTileId } from "./calendarVars.js";
import { getEventTileTopPosition, placeNewEventTile } from "./currentEventTile.js";
import { getTitleInput, getModal } from "./selectors.js";
import { closeModal } from "./modal.js";
import {
    eventsDataKey,
    getDataFromLocalStorage,
    savedEventsKey,
    storeDataInLocalStorage,
} from "./handleLocalStorage.js";

const constructEventData = (event, title = "(no title)") => {
    const clickedColumn = event.target;
    const clickPosition = getEventTileTopPosition(event);
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

const saveEvent = () => {
    const modal = getModal();
    const titleInput = getTitleInput(modal);
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);
    const eventData = getDataFromLocalStorage(eventsDataKey);

    if (titleInput.value) {
        eventData.title = titleInput.value;
        recordNewEvent(eventData, currentEventTile);
        closeModal(modal);
    } else {
        titleInput.classList.add("error");
        titleInput.focus();
    }
};

export { saveEvent, constructEventData };
