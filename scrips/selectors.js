import { modalInputsIds, modalTitleId } from "./constants.js";

const getModal = () => document.querySelector("#event-modal");

const getSaveBtn = (modal) => modal.querySelector("#save-event-btn");

const getCloseBtn = (modal) => modal.querySelector("#close-modal");

const getSettingsToggleElements = (modal) => modal.querySelectorAll(".to-select");

const getModalInputById = (inputId) => getModal().querySelector(`#${inputId}`);

const getGrid = () => document.querySelector("#days-hours-grid");

const getGridDays = () => getGrid().querySelectorAll(".hours-cells-column");

const getModalInputs = () => {
    const modal = getModal();
    const title = getModalInputById(modalTitleId);
    const [dateInput, startTime, endTime] = Object.entries(modalInputsIds).map(([key, inputId]) =>
        getModalInputById(inputId)
    );
    const saveBtn = getSaveBtn(modal);
    const closeBtn = getCloseBtn(modal);
    const modalSettings = getSettingsToggleElements(modal);

    return [title, dateInput, startTime, endTime, saveBtn, closeBtn, modalSettings];
};

export {
    getModal,
    getSaveBtn,
    getCloseBtn,
    getSettingsToggleElements,
    getModalInputs,
    getGrid,
    getGridDays,
    getModalInputById,
};
