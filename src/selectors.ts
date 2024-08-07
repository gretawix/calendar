import { modalInputsIds, modalTitleId } from "./constants.js";
import { ModalInputs } from "./types/main.js";

const getModal = (): HTMLElement => document.querySelector("#event-modal");

const getSaveBtn = (modal: HTMLElement): HTMLElement => modal.querySelector("#save-event-btn");

const getCloseBtn = (modal: HTMLElement): HTMLElement => modal.querySelector("#close-modal");

const getSettingsToggleElements = (modal: HTMLElement): NodeListOf<HTMLElement> => modal.querySelectorAll(".to-select");

const getModalInputById = (inputId: string): HTMLInputElement => getModal().querySelector(`#${inputId}`);

const getGrid = (): HTMLElement => document.querySelector("#days-hours-grid");

const getGridDays = (): NodeListOf<HTMLElement> => getGrid().querySelectorAll(".hours-cells-column");

const getModalInputs = (): ModalInputs => {
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
