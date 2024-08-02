const getModal = () => document.querySelector("#event-modal");

const getSaveBtn = (modal) => modal.querySelector("#save-event-btn");

const getCloseBtn = (modal) => modal.querySelector("#close-modal");

const getSettingsToggleElements = (modal) => modal.querySelectorAll(".to-select");

const getModalInputById = (inputId) => getModal().querySelector(`#${inputId}`);

const getGrid = () => document.querySelector("#days-hours-grid");

const getGridDays = () => getGrid().querySelectorAll(".hours-cells-column");

const getModalInputs = () => {
    const modal = getModal();
    const title = getModalInputById("title");
    const dateInput = getModalInputById("date");
    const startTime = getModalInputById("time-start");
    const endTime = getModalInputById("time-end");
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
