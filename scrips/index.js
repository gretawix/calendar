import initWeekView from "./weekView.js";
import { initModal } from "./modal.js";
import { displayAllSavedEvents } from "./displaySavedEvents.js";

document.addEventListener("DOMContentLoaded", () => {
    initWeekView();
    initModal();
    displayAllSavedEvents();
});
