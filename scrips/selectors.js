const getModal = () => document.querySelector("#event-modal");

const getSaveBtn = (modal) => modal.querySelector("#save-event-btn");

const getCloseBtn = (modal) => modal.querySelector("#close-modal");

const getSettingsToggleElements = (modal) => modal.querySelectorAll(".to-select");

const getTitleInput = (modal) => modal.querySelector("#title");

const getGrid = () => document.querySelector("#days-hours-grid");

const getGridDays = () => getGrid().querySelectorAll(".hours-cells-column");

export { getModal, getSaveBtn, getCloseBtn, getSettingsToggleElements, getTitleInput, getGrid, getGridDays };
