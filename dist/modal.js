import { setSameWidth, setElementDisplay } from "./utils.js";
import { resetDropdownItem, initDropdownSelect, generateTimeDropdown, populateTimeDropdowns } from "./inputs.js";
import { getModal, getModalInputById, getModalInputs } from "./selectors.js";
import { removeUnsavedEventTile, styleEventTile, updateTileTime } from "./eventTile.js";
import { saveEvent, getTime, getEventLength, getEndTime } from "./eventsData.js";
import { currentEventTileId, emptyEventTitle, modalInputsIds, modalTitleId } from "./constants.js";
import { currentEventDataKey, storeDataInLocalStorage, getDataFromLocalStorage } from "./handleLocalStorage.js";
import { getDisplayableTime, hourIsValid, minutesAreValid } from "./timeCalculations.js";
const setTimeDateInputWidths = (modal) => {
    Object.entries(modalInputsIds).forEach(([key, inputId]) => {
        const btn = modal.querySelector(`#${inputId}-btn`);
        if (btn) {
            btn.style.width = "fit-content";
            setSameWidth(`#${inputId}-btn`, `#${inputId}`);
        }
    });
};
const removeSeparators = (modal) => {
    modal
        .querySelectorAll(".with-separator")
        .forEach((item) => item.classList.remove("separated-top", "separated-bottom"));
};
const resetModal = (modal) => {
    modal.querySelectorAll(".preview-settings").forEach((item) => setElementDisplay(item, "flex"));
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
    const prevHasBottom = prevDiv?.classList.contains(separatorBottom);
    const nextHasTop = nextDiv?.classList.contains(separatorTop);
    if (parentClasses.contains("with-separator")) {
        if (prevHasBottom && nextHasTop) {
            prevDiv.classList.remove(separatorBottom);
            parentClasses.add(separatorTop);
        }
        else if (nextHasTop) {
            parentClasses.add(separatorTop);
        }
        else if (prevHasBottom) {
            parentClasses.add(separatorBottom);
        }
        else {
            parentClasses.add(separatorTop, separatorBottom);
        }
    }
};
const handleSettingsClick = (item) => {
    const parent = item.closest(".single-setting-section");
    const settingsDiv = parent.querySelector(".full-settings");
    settingsDiv.classList.add("active");
    setElementDisplay(parent.querySelector(".preview-settings"), "none");
    addSeparators(parent);
};
const positionModalX = (modal, event) => {
    const clickedElement = event.target;
    const clickedElementBox = clickedElement.getBoundingClientRect();
    const modalWidth = modal.getBoundingClientRect().width;
    modal.style.left = `${clickedElementBox.left < modalWidth
        ? clickedElementBox.left + clickedElementBox.width + 8
        : clickedElementBox.left - modalWidth - 12}px`;
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
    }
    else if (modalHeight + bottomSpacing > distanceFromClickToBottom) {
        modal.style.bottom = `${bottomSpacing}px`;
    }
    else {
        modal.style.top = `${distanceFromClickToTop - bottomSpacing}px`;
    }
};
const setTimeDateInputs = (modal, newEventData) => {
    const values = {
        [modalInputsIds.date]: `${newEventData.weekdayLong}, ${newEventData.monthLong} ${newEventData.day}`,
        [modalInputsIds.timeStart]: getDisplayableTime(parseInt(newEventData.startTime.hour, 10), parseInt(newEventData.startTime.minutes, 10)),
        [modalInputsIds.timeEnd]: getDisplayableTime(parseInt(newEventData.endTime.hour, 10), parseInt(newEventData.endTime.minutes, 10)),
    };
    Object.entries(modalInputsIds).forEach(([key, inputId]) => {
        const btn = modal.querySelector(`#${inputId}-btn span`);
        const input = modal.querySelector(`#${inputId}`);
        btn.innerText = values[inputId];
        input.value = values[inputId];
    });
    populateTimeDropdowns(newEventData);
};
const handleTitleChange = (event) => {
    const input = event.target;
    const inputValue = input.value;
    if (inputValue)
        input.classList.remove("error");
    try {
        const title = document
            .querySelector(`#${currentEventTileId}`)
            .querySelector(".event-tile-title");
        if (event.type === "blur")
            title.innerText = inputValue || emptyEventTitle;
    }
    catch { }
};
// const handleDateChange = (event) => {
//     console.log(event.target.value);
// };
const handleTimeChange = (event, timeKey, modal, endTimeInput) => {
    const currentEventTile = document.querySelector(`#${currentEventTileId}`);
    const timeText = currentEventTile.querySelector(".event-tile-time");
    const eventData = getDataFromLocalStorage(currentEventDataKey);
    const clickedInput = event.target;
    let [hours, minutes] = clickedInput.value.split(":");
    [hours, minutes] = [parseInt(hours, 10), parseInt(minutes, 10)];
    let eventLength = getEventLength(eventData);
    eventData[timeKey] = getTime(hours, minutes);
    if (timeKey === "startTime") {
        eventData.endTime = getEndTime(hours, minutes, eventLength);
        setTimeDateInputs(modal, eventData);
    }
    if (getEventLength(eventData) <= 0 || !hourIsValid(hours) || !minutesAreValid(minutes)) {
        if (endTimeInput)
            endTimeInput.classList.add("error");
        storeDataInLocalStorage(currentEventDataKey, eventData);
        throw new Error("end time cannot be earlier than start time");
    }
    else {
        if (endTimeInput)
            endTimeInput.classList.remove("error");
        styleEventTile(currentEventTile, eventData);
        updateTileTime(timeText, eventData);
        storeDataInLocalStorage(currentEventDataKey, eventData);
    }
};
const closeModal = () => {
    const modal = getModal();
    getModalInputById(modalTitleId).value = "";
    removeUnsavedEventTile();
    setElementDisplay(modal, "none");
};
const openModal = (event, newEventData) => {
    const modal = getModal();
    setElementDisplay(modal, "block");
    setTimeDateInputs(modal, newEventData);
    resetModal(modal);
    positionModalX(modal, event);
    positionModalY(modal, event);
    getModalInputById(modalTitleId).focus();
};
const initModal = () => {
    const modal = getModal();
    const [title, dateInput, startTime, endTime, saveBtn, closeBtn, modalSettings] = getModalInputs();
    [startTime, endTime].forEach(generateTimeDropdown);
    initDropdownSelect(modal);
    closeBtn.addEventListener("click", closeModal);
    saveBtn.addEventListener("click", saveEvent);
    title.addEventListener("input", handleTitleChange);
    title.addEventListener("blur", handleTitleChange);
    startTime.addEventListener("blur", (event) => handleTimeChange(event, "startTime", modal));
    endTime.addEventListener("blur", (event) => handleTimeChange(event, "endTime", modal, endTime));
    modal.addEventListener("keydown", (event) => {
        if (event.key === "Enter")
            saveEvent();
        if (event.key === "Escape")
            closeModal();
    });
    modalSettings.forEach((item) => item.addEventListener("click", () => handleSettingsClick(item)));
};
export { openModal, closeModal, initModal };
//# sourceMappingURL=modal.js.map