import { setSameWidth } from "./utils.js";
import { toggleDropdown, separateInputs } from "./inputFuntionality.js";

const initModalView = () => {
    setSameWidth("#date-btn", "#date");
    setSameWidth("#time-start-btn", "#time-start");
    setSameWidth("#time-end-btn", "#time-end");

    const selectionBtns = document.querySelectorAll(".to-select");
    selectionBtns.forEach((item, index) => {
        item.addEventListener("click", (event) => {
            const parent = item.closest(".single-setting-section");
            const parentClasses = parent.classList;
            const settingsDiv = parent.querySelector(".full-settings");
            settingsDiv.classList.add("active");
            parent.querySelector(".preview-settings").style.display = "none";

            separateInputs(parent);
        });
    });

    toggleDropdown();
};

export default initModalView;
