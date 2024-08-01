import { formatHours, getLongWeekDayName, getLongMonthName } from "./utils.js";
import { cellHeight, currentEventTileId } from "./calendarVars.js";
import { getEventTileTopPosition } from "./displayEvent.js";
import { getTitleInput } from "./selectors.js";
import { closeModal } from "./modal.js";

const handleTitleInputChange = (event, titleInput) => {
    if (event.target.value) titleInput.classList.remove("error");
};

const constructEventInfo = (event, title = "(no title)") => {
    const clickedColumn = event.target;

    const clickPosition = getEventTileTopPosition(event);
    const hour = formatHours(Math.floor(clickPosition / cellHeight));
    const weekdayShort = clickedColumn.getAttribute("data-weekday");
    const monthNameShort = clickedColumn.getAttribute("data-month");

    let minutes = "00";
    if (clickPosition % cellHeight === cellHeight / 2) minutes = "30";

    return {
        eventTitle: title,
        eventStartTime: `${hour}:${minutes}`,
        eventEndTime: `${formatHours(parseInt(hour, 10) + 1)}:${minutes}`,
        weekday: weekdayShort,
        weekdayLong: getLongWeekDayName(weekdayShort),
        day: clickedColumn.getAttribute("data-day"),
        month: monthNameShort,
        monthLong: getLongMonthName(monthNameShort),
        year: clickedColumn.getAttribute("data-year"),
    };
};

const saveEvent = (modal, saveBtn) => {
    const titleInput = getTitleInput(modal);
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);

    if (titleInput.value) {
        currentEventTile.querySelector(".event-tile-title").innerText = titleInput.value;
        currentEventTile.classList.remove("placeholder");
        currentEventTile.removeAttribute("id");
        saveBtn.removeEventListener("click", saveEvent);
        titleInput.removeEventListener("change", (event) => handleTitleInputChange(event, titleInput));
        closeModal(modal);
    } else {
        titleInput.classList.add("error");
        titleInput.addEventListener("change", (event) => handleTitleInputChange(event, titleInput));
    }
};

export { saveEvent, constructEventInfo };
