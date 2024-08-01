import initWeekView from "./weekView.js";
import { getModal } from "./selectors.js";
import { initDropdownSelect } from "./inputs.js";

document.addEventListener("DOMContentLoaded", () => {
    initWeekView();
    initDropdownSelect(getModal());
});
