import { setSameWidth } from "./utils.js";
import { toggleDropdown } from "./inputFuntionality.js";

const modalfunctionality = () => {
    setSameWidth("#date-btn", "#date");
    setSameWidth("#time-start-btn", "#time-start");
    setSameWidth("#time-end-btn", "#time-end");

    const selectionBtns = document.querySelectorAll(".to-select");
    selectionBtns.forEach((item) => {
        item.addEventListener("click", (event) => {
            const parent = item.closest(".single-setting-section");
            const settingsDiv = parent.querySelector(".full-settings");
            settingsDiv.style.display = "flex";
            parent.querySelector(".preview-settings").style.display = "none";
        });
    });

    toggleDropdown();
};

export default modalfunctionality;
