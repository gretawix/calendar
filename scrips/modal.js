import { setSameWidth } from "./utils.js";

const modalfunctionality = () => {
    setSameWidth("#date-btn", "#date");
    setSameWidth("#time-start-btn", "#time-start");
    setSameWidth("#time-end-btn", "#time-end");

    const selectionBtns = document.querySelectorAll(".to-select");
    selectionBtns.forEach((item) => {
        item.addEventListener("click", (event) => {
            const settingsDiv = item.parentElement.querySelector(".settings");
            console.log(settingsDiv);
            settingsDiv.style.display = "block";
            item.style.display = "none";
        });
    });
};

export default modalfunctionality;
