import { setSameWidth } from "./utils.js";
import { toggleDropdown } from "./inputFuntionality.js";

const modalfunctionality = () => {
    setSameWidth("#date-btn", "#date");
    setSameWidth("#time-start-btn", "#time-start");
    setSameWidth("#time-end-btn", "#time-end");

    const selectionBtns = document.querySelectorAll(".to-select");
    selectionBtns.forEach((item) => {
        item.addEventListener("click", (event) => {
            const settingsDiv = item.parentElement.querySelector(".settings");
            settingsDiv.style.display = "block";
            item.style.display = "none";
            const inputs = settingsDiv.querySelectorAll("input");
            if (!Array.from(inputs).some((item) => item === document.activeElement)) {
                settingsDiv.querySelector("input").focus();
            }
        });
    });

    const inputActivationBtns = document.querySelectorAll(".event-settings-selection .clickable");
    inputActivationBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const inputDataId = btn.getAttribute("data-clickable-id");
            const inputParent = btn.closest(".selection-content");
            const targetInput = inputParent.querySelector(`[data-clickable-input="${inputDataId}"]`);
            targetInput.focus();
        });
    });

    toggleDropdown();
};

export default modalfunctionality;
