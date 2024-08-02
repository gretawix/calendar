const getModal = () => document.querySelector("#event-modal");

const getSaveBtn = (modal) => modal.querySelector("#save-event-btn");

const getCloseBtn = (modal) => modal.querySelector("#close-modal");

const getSettingsToggleElements = (modal) => modal.querySelectorAll(".to-select");

const getModalInput = (inputId) => getModal().querySelector(`#${inputId}`);

const getGrid = () => document.querySelector("#days-hours-grid");

const getGridDays = () => getGrid().querySelectorAll(".hours-cells-column");

export { getModal, getSaveBtn, getCloseBtn, getSettingsToggleElements, getModalInput, getGrid, getGridDays };
