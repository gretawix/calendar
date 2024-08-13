import initWeekView from "./weekView";
import { initModal } from "./modal";
import { displayAllSavedEvents } from "./eventsData";
import { globalAppState } from "./dataService/appState";
import eventsServiceFactory from "./dataService/factory";

document.addEventListener("DOMContentLoaded", () => {
    globalAppState.setEventsService(eventsServiceFactory("local-storage"));
    initWeekView();
    initModal();
    displayAllSavedEvents();
});
