import { setSameWidth } from "./utils.js";
import { toggleDropdown } from "./inputFuntionality.js";

const initModal = () => {
    const selectionBtns = document.querySelectorAll(".to-select");
    resetModal();

    const handleInputClick = (item) => {
        const parent = item.closest(".single-setting-section");
        const settingsDiv = parent.querySelector(".full-settings");
        settingsDiv.classList.add("active");
        parent.querySelector(".preview-settings").style.display = "none";
        separateInputs(parent);
    };

    const closeBtn = document.querySelector("#close-modal");
    closeBtn.addEventListener("click", () => {
        closeModal();
        closeBtn.removeEventListener("click", closeModal);
        selectionBtns.forEach((item) => {
            item.removeEventListener("click", () => handleInputClick(item));
        });
    });

    selectionBtns.forEach((item) => {
        item.addEventListener("click", () => handleInputClick(item));
    });

    toggleDropdown();
};

const resetModal = () => {
    const modal = getModalElement();
    modal.querySelectorAll(".preview-settings").forEach((item) => (item.style.display = "flex"));
    modal.querySelectorAll(".full-settings").forEach((item) => item.classList.remove("active"));
    setInputWidths();
    removeSeparators();
};

const setInputWidths = () => {
    setSameWidth("#date-btn", "#date");
    setSameWidth("#time-start-btn", "#time-start");
    setSameWidth("#time-end-btn", "#time-end");
};

const separateInputs = (parent) => {
    const parentClasses = parent.classList;
    if (parentClasses.contains("with-separator")) {
        const prevDiv = parent.previousElementSibling;
        const nextDiv = parent.nextElementSibling;
        if (
            prevDiv &&
            nextDiv &&
            prevDiv.classList.contains("separated-bottom") &&
            nextDiv.classList.contains("separated-top")
        ) {
            prevDiv.classList.remove("separated-bottom");
            parentClasses.add("separated-top");
        } else if (nextDiv && nextDiv.classList.contains("separated-top")) {
            parentClasses.add("separated-top");
        } else if (prevDiv && prevDiv.classList.contains("separated-bottom")) {
            parentClasses.add("separated-bottom");
        } else {
            parentClasses.add("separated-top");
            parentClasses.add("separated-bottom");
        }
    }
};

const removeSeparators = () => {
    const modal = getModalElement();
    modal.querySelectorAll(".with-separator").forEach((item) => {
        item.classList.remove("separated-top", "separated-bottom");
    });
};

const getModalElement = () => document.querySelector("#event-modal");

const toggleModal = (isOpen) => {
    const modal = getModalElement();
    if (isOpen) {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
    }
};

const openModal = (event) => {
    toggleModal(false);
    const modal = getModalElement();
    const modalWidth = modal.getBoundingClientRect().width;
    const clickedElement = event.target.getBoundingClientRect();

    modal.style.left = `${
        clickedElement.left < modalWidth
            ? clickedElement.left + clickedElement.width + 8
            : clickedElement.left - modalWidth - 12
    }px`;
    modal.style.top = `${event.clientY - 100}px`;

    const titleInput = document.querySelector("#title");
    initModal();
    titleInput.focus();
};

const closeModal = () => toggleModal(true);

export { initModal, openModal, getModalElement };
