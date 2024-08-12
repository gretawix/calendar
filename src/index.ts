import initWeekView from "./weekView";
import { initModal } from "./modal";
import { displayAllSavedEvents } from "./eventsData";

document.addEventListener("DOMContentLoaded", () => {
    initWeekView();
    initModal();
    displayAllSavedEvents();
});
