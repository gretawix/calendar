import { savedEventsKey, getDataFromLocalStorage } from "./handleLocalStorage.js";
import { createEventTile } from "./eventTile.js";
import { getGridDays } from "./selectors.js";

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

export { displayAllSavedEvents };
