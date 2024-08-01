import { setSameWidth } from "./utils.js";
import { resetDropdownItem } from "./inputFuntionality.js";
import { getModal } from "./selectors.js";
import { removeUnsavedEventTile } from "./eventDisplay.js";

const setTimeDateInputWidths = () => {
    setSameWidth("#date-btn", "#date");
    setSameWidth("#time-start-btn", "#time-start");
    setSameWidth("#time-end-btn", "#time-end");
};

const removeSeparators = (modal) => {
    modal.querySelectorAll(".with-separator").forEach((item) => {
        item.classList.remove("separated-top", "separated-bottom");
    });
};

const resetModal = (modal) => {
    modal.querySelectorAll(".preview-settings").forEach((item) => (item.style.display = "flex"));
    modal.querySelectorAll(".full-settings").forEach((item) => item.classList.remove("active"));
    modal.querySelectorAll(".select-input").forEach((dropdownItem) => resetDropdownItem(dropdownItem));
    removeUnsavedEventTile();
    setTimeDateInputWidths();
    removeSeparators(modal);
};

const separateInputs = (parent) => {
    const parentClasses = parent.classList;
    const [prevDiv, nextDiv] = [parent.previousElementSibling, parent.nextElementSibling];
    const [separatorTop, separatorBottom] = ["separated-top", "separated-bottom"];

    if (parentClasses.contains("with-separator")) {
        if (prevDiv?.classList.contains(separatorBottom) && nextDiv?.classList.contains(separatorTop)) {
            prevDiv.classList.remove(separatorBottom);
            parentClasses.add(separatorTop);
        } else if (nextDiv?.classList.contains(separatorTop)) {
            parentClasses.add(separatorTop);
        } else if (prevDiv?.classList.contains(separatorBottom)) {
            parentClasses.add(separatorBottom);
        } else {
            parentClasses.add(separatorTop, separatorBottom);
        }
    }
};

const handleInputClick = (item) => {
    const parent = item.closest(".single-setting-section");
    const settingsDiv = parent.querySelector(".full-settings");
    settingsDiv.classList.add("active");
    parent.querySelector(".preview-settings").style.display = "none";
    separateInputs(parent);
    item.removeEventListener("click", () => handleInputClick(item));
};

const toggleModal = (isOpen, modal) => (modal.style.display = isOpen ? "none" : "block");

const closeModal = (closeBtn, selectionBtns) => {
    const isModalCurrentyOpen = true;

    removeUnsavedEventTile();
    toggleModal(isModalCurrentyOpen, getModal());
    closeBtn.removeEventListener("click", closeModal);
    selectionBtns.forEach((item) => item.removeEventListener("click", () => handleInputClick(item)));
};

const initModal = (modal) => {
    const selectionBtns = document.querySelectorAll(".to-select");
    const closeBtn = document.querySelector("#close-modal");
    const isModalCurrentlyOpen = false;

    toggleModal(isModalCurrentlyOpen, modal);
    resetModal(modal);
    closeBtn.addEventListener("click", () => closeModal(closeBtn, selectionBtns));
    selectionBtns.forEach((item) => item.addEventListener("click", () => handleInputClick(item)));
};

const positionModalX = (modal, event) => {
    const clickedElement = event.target.getBoundingClientRect();
    const modalWidth = modal.getBoundingClientRect().width;

    modal.style.left = `${
        clickedElement.left < modalWidth
            ? clickedElement.left + clickedElement.width + 8
            : clickedElement.left - modalWidth - 12
    }px`;
};

const positionModalY = (modal, event) => {
    const modalHeight = modal.getBoundingClientRect().height;
    const bottomSpacing = 50;
    const distanceFromClickToTop = event.clientY;
    const distanceFromClickToBottom = window.innerHeight - distanceFromClickToTop;

    modal.style.bottom = "unset";
    modal.style.top = "unset";
    if (distanceFromClickToTop < 130) {
        modal.style.top = `${distanceFromClickToTop}px`;
    } else {
        if (modalHeight + bottomSpacing > distanceFromClickToBottom) {
            modal.style.top = "unset";
            modal.style.bottom = `${bottomSpacing}px`;
        } else {
            modal.style.top = `${distanceFromClickToTop - bottomSpacing}px`;
        }
    }
};

const openModal = (event) => {
    const modal = getModal();

    initModal(modal);
    positionModalX(modal, event);
    positionModalY(modal, event);
    document.querySelector("#title").focus();
};

export { initModal, openModal, getModal };
