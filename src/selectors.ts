import { modalInputsIds, modalTitleId } from "./constants";
import type { ModalInputs } from "./types/main";

const getModal = (): HTMLElement | null => document.querySelector("#event-modal");

const getSaveBtn = (modal: HTMLElement | null): HTMLElement | null | undefined =>
    modal?.querySelector("#save-event-btn");

const getCloseBtn = (modal: HTMLElement | null): HTMLElement | null | undefined => modal?.querySelector("#close-modal");

const getSettingsToggleElements = (modal: HTMLElement | null): NodeListOf<HTMLElement> | undefined =>
    modal?.querySelectorAll(".to-select");

const getModalInputById = (inputId: string): HTMLInputElement | null | undefined =>
    getModal()?.querySelector(`#${inputId}`);

const getGrid = (): HTMLElement | null => document.querySelector("#days-hours-grid");

const getGridDays = (): NodeListOf<HTMLElement> | undefined => getGrid()?.querySelectorAll(".hours-cells-column");

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
