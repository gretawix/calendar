import initWeekView from "./weekView.js";
import { getModal, getSaveBtn, getTitleInput } from "./selectors.js";
import { saveEvent } from "./eventsData.js";

import { initDropdownSelect } from "./inputs.js";

document.addEventListener("DOMContentLoaded", () => {
    const modal = getModal();
    const saveBtn = getSaveBtn(modal);
    const titleInput = getTitleInput(modal);

    initWeekView();
    initDropdownSelect(modal);
    saveBtn.addEventListener("click", saveEvent);
    titleInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            saveEvent();
        }
    });
});
