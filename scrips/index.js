import initWeekView from "./weekView.js";
import { getModal } from "./selectors.js";
import { initDropdownSelect } from "./inputFuntionality.js";

document.addEventListener("DOMContentLoaded", () => {
    initWeekView();
    initDropdownSelect(getModal());
});
