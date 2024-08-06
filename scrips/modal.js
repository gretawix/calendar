import { setSameWidth, displayTime } from "./utils.js";
import { resetDropdownItem, initDropdownSelect, generateTimeDropdown, populateTimeDropdowns } from "./inputs.js";
import { getModal, getModalInputById, getModalInputs } from "./selectors.js";
import { removeUnsavedEventTile, styleEventTile, updateTileTime } from "./eventTile.js";
import { saveEvent, setTime, getEventLength, setDefaultEndTime } from "./eventsData.js";
import { currentEventTileId, emptyEventTitle } from "./calendarVars.js";
import { currentEventDataKey, storeDataInLocalStorage, getDataFromLocalStorage } from "./handleLocalStorage.js";

const setTimeDateInputWidths = (modal) => {
    modal.querySelector("#date-btn").style.width = "fit-content";
    modal.querySelector("#time-start-btn").style.width = "fit-content";
    modal.querySelector("#time-end-btn").style.width = "fit-content";

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
    setTimeDateInputWidths(modal);
    removeSeparators(modal);
};

const addSeparators = (parent) => {
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

const handleSettingsClick = (item) => {
    const parent = item.closest(".single-setting-section");
    const settingsDiv = parent.querySelector(".full-settings");
    settingsDiv.classList.add("active");
    parent.querySelector(".preview-settings").style.display = "none";
    addSeparators(parent);
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

const setTimeDateInputs = (modal, newEventData) => {
    const dateText = `${newEventData.weekdayLong}, ${newEventData.monthLong} ${newEventData.day}`;
    const start = displayTime(newEventData.startTime.hour, newEventData.startTime.minutes);
    const end = displayTime(newEventData.endTime.hour, newEventData.endTime.minutes);

    modal.querySelector("#date-btn span").innerText = dateText;
    modal.querySelector("#time-start-btn span").innerText = start;
    modal.querySelector("#time-end-btn span").innerText = end;

    modal.querySelector("#date").value = dateText;
    modal.querySelector("#time-start").value = start;
    modal.querySelector("#time-end").value = end;

    populateTimeDropdowns(newEventData);
};

const handleTitleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue) event.target.classList.remove("error");
    try {
        const title = document.querySelector(`#${currentEventTileId}`).querySelector(".event-tile-title");
        if (event.type === "blur") title.innerText = inputValue || emptyEventTitle;
    } catch {}
};

const handleDateChange = (event) => {
    console.log(event.target.value);
};

const handleTimeChange = (event, timeKey, modal, endTimeInput) => {
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);
    const timeText = currentEventTile.querySelector(".event-tile-time");
    const eventData = getDataFromLocalStorage(currentEventDataKey);
    let eventLength = getEventLength(eventData);

    eventData[timeKey] = setTime(...event.target.value.split(":"));
    if (timeKey === "startTime") {
        eventData.endTime = setDefaultEndTime(...event.target.value.split(":"), eventLength);
        setTimeDateInputs(modal, eventData);
    }
    eventLength = getEventLength(eventData);
    if (eventLength <= 0) {
        if (endTimeInput) endTimeInput.classList.add("error");
        storeDataInLocalStorage(currentEventDataKey, eventData);
        throw new Error("end time cannot be earlier than start time");
    } else {
        if (endTimeInput) endTimeInput.classList.remove("error");
        styleEventTile(currentEventTile, eventData);
        updateTileTime(timeText, eventData);
        storeDataInLocalStorage(currentEventDataKey, eventData);
    }
};

const closeModal = () => {
    const modal = getModal();

    getModalInputById("title").value = "";
    removeUnsavedEventTile();
    modal.style.display = "none";
};

const openModal = (event, newEventData) => {
    const modal = getModal();

    modal.style.display = "block";
    setTimeDateInputs(modal, newEventData);
    resetModal(modal);
    positionModalX(modal, event);
    positionModalY(modal, event);
    document.querySelector("#title").focus();
};

const initModal = () => {
    const modal = getModal();
    const [title, dateInput, startTime, endTime, saveBtn, closeBtn, modalSettings] = getModalInputs();

    generateTimeDropdown(startTime);
    generateTimeDropdown(endTime);
    initDropdownSelect(modal);
    closeBtn.addEventListener("click", closeModal);
    saveBtn.addEventListener("click", saveEvent);
    title.addEventListener("input", handleTitleChange);
    title.addEventListener("blur", handleTitleChange);
    startTime.addEventListener("blur", (event) => handleTimeChange(event, "startTime", modal));
    endTime.addEventListener("blur", (event) => handleTimeChange(event, "endTime", modal, endTime));
    modal.addEventListener("keydown", (event) => {
        if (event.key === "Enter") saveEvent();
        if (event.key === "Escape") closeModal();
    });
    modalSettings.forEach((item) => item.addEventListener("click", () => handleSettingsClick(item)));
};

export { openModal, closeModal, initModal };
