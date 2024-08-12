import { setSameWidth, setElementDisplay } from "./utils";
import { resetDropdownItem, initDropdownSelect, generateTimeDropdown, populateTimeDropdowns } from "./inputs";
import { getModal, getModalInputById, getModalInputs } from "./selectors";
import { removeUnsavedEventTile, updateEventTile } from "./eventTile";
import { saveEvent, getTime, getEventLength, getEndTime } from "./eventsData";
import { currentEventTileId, emptyEventTitle, modalInputsIds, modalTitleId } from "./constants";
import { getDisplayableTime, hourIsValid, minutesAreValid } from "./timeCalculations";
import type { EventData } from "./types/main";
import eventsServiceFactory from "./dataService";

const setTimeDateInputWidths = (modal: HTMLElement) => {
    Object.entries(modalInputsIds).forEach(([key, inputId]) => {
        const btn: HTMLElement | null = modal.querySelector(`#${inputId}-btn`);
        if (btn) {
            btn.style.width = "fit-content";
            setSameWidth(`#${inputId}-btn`, `#${inputId}`);
        }
    });
};

const removeSeparators = (modal: HTMLElement) => {
    const separatedElements: NodeListOf<HTMLElement> = modal.querySelectorAll(".with-separator");
    separatedElements.forEach((item) => item.classList.remove("separated-top", "separated-bottom"));
};

const resetModal = (modal: HTMLElement) => {
    const previewSettings: NodeListOf<HTMLElement> = modal.querySelectorAll(".preview-settings");
    const fullSettings: NodeListOf<HTMLElement> = modal.querySelectorAll(".full-settings");
    const selectInputs: NodeListOf<HTMLElement> = modal.querySelectorAll(".select-input");

    previewSettings.forEach((item) => setElementDisplay(item, "flex"));
    fullSettings.forEach((item) => item.classList.remove("active"));
    selectInputs.forEach((dropdownItem) => resetDropdownItem(dropdownItem));

    removeUnsavedEventTile();
    setTimeDateInputWidths(modal);
    removeSeparators(modal);
};

const addSeparators = (parent: HTMLElement) => {
    const parentClasses = parent.classList;
    const [prevDiv, nextDiv] = [parent.previousElementSibling, parent.nextElementSibling];
    const [separatorTop, separatorBottom] = ["separated-top", "separated-bottom"];
    const prevHasBottom = prevDiv?.classList.contains(separatorBottom);
    const nextHasTop = nextDiv?.classList.contains(separatorTop);

    if (parentClasses.contains("with-separator")) {
        if (prevHasBottom && nextHasTop) {
            prevDiv?.classList.remove(separatorBottom);
            parentClasses.add(separatorTop);
        } else if (nextHasTop) {
            parentClasses.add(separatorTop);
        } else if (prevHasBottom) {
            parentClasses.add(separatorBottom);
        } else {
            parentClasses.add(separatorTop, separatorBottom);
        }
    }
};

const handleSettingsClick = (item: HTMLElement) => {
    const parent: HTMLElement | null = item.closest(".single-setting-section");
    const settingsDiv: HTMLElement | null | undefined = parent?.querySelector(".full-settings");
    const previewSettings: HTMLElement | null | undefined = parent?.querySelector(".preview-settings");
    settingsDiv?.classList.add("active");

    if (previewSettings) {
        setElementDisplay(previewSettings, "none");
    }
    if (parent) {
        addSeparators(parent);
    }
};

const positionModalX = (modal: HTMLElement, event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement | null;
    const clickedElementBox = clickedElement?.getBoundingClientRect();
    const modalWidth = modal.getBoundingClientRect().width;

    if (clickedElementBox) {
        modal.style.left = `${
            clickedElementBox.left < modalWidth
                ? clickedElementBox.left + clickedElementBox.width + 8
                : clickedElementBox.left - modalWidth - 12
        }px`;
    }
};

const positionModalY = (modal: HTMLElement, event: MouseEvent) => {
    const modalHeight = modal.getBoundingClientRect().height;
    const bottomSpacing = 50;
    const distanceFromClickToTop = event.clientY;
    const distanceFromClickToBottom = window.innerHeight - distanceFromClickToTop;

    modal.style.bottom = "unset";
    modal.style.top = "unset";

    if (distanceFromClickToTop < 130) {
        modal.style.top = `${distanceFromClickToTop}px`;
    } else if (modalHeight + bottomSpacing > distanceFromClickToBottom) {
        modal.style.bottom = `${bottomSpacing}px`;
    } else {
        modal.style.top = `${distanceFromClickToTop - bottomSpacing}px`;
    }
};

const setTimeDateInputs = (modal: HTMLElement, newEventData: EventData) => {
    const values = {
        [modalInputsIds.date]: `${newEventData.weekdayLong}, ${newEventData.monthLong} ${newEventData.day}`,
        [modalInputsIds.timeStart]: getDisplayableTime(newEventData.startTime.hour, newEventData.startTime.minutes),
        [modalInputsIds.timeEnd]: getDisplayableTime(newEventData.endTime.hour, newEventData.endTime.minutes),
    };
    Object.entries(modalInputsIds).forEach(([key, inputId]): void => {
        const btn: HTMLElement | null = modal.querySelector(`#${inputId}-btn span`);
        const input: HTMLInputElement | null = modal.querySelector(`#${inputId}`);

        if (btn) {
            btn.innerText = values[inputId];
        }
        if (input) {
            input.value = values[inputId];
        }
    });
    populateTimeDropdowns(newEventData);
};

const handleTitleChange = (event: Event) => {
    const input = event.target as HTMLInputElement | null;
    const inputValue = input?.value;
    if (inputValue) {
        input.classList.remove("error");
    }
    try {
        const title: HTMLInputElement | null = document.querySelector(`#${currentEventTileId} .event-tile-title`);
        if (event.type === "blur" && title) {
            title.innerText = inputValue || emptyEventTitle;
        }
    } catch {}
};

const handleTimeChange = async (
    event: FocusEvent,
    timeKey: "startTime" | "endTime",
    modal: HTMLElement,
    endTimeInput?: HTMLInputElement
) => {
    const currentEventTile: HTMLElement | null = document.querySelector(`#${currentEventTileId}`);
    const eventsService = eventsServiceFactory();
    const events = await eventsService.getAll();
    const eventData = events.current;
    const clickedInput = event.target as HTMLInputElement | null;
    let [hours, minutes] = clickedInput?.value.split(":") as (string | undefined)[];
    let eventLength = getEventLength(eventData);

    if (hours && minutes && currentEventTile && hourIsValid(hours) && minutesAreValid(minutes)) {
        eventData[timeKey] = getTime(hours, minutes);
        if (timeKey === "startTime") {
            eventData.endTime = getEndTime(hours, minutes, eventLength);
        }
        setTimeDateInputs(modal, eventData);
        updateEventTile(eventData, currentEventTile, endTimeInput);
    }
};

const closeModal = (): void => {
    const modal = getModal();
    const titleInput = getModalInputById(modalTitleId);

    if (titleInput) {
        titleInput.value = "";
    }
    removeUnsavedEventTile();
    if (modal) {
        setElementDisplay(modal, "none");
    }
};

const openModal = (event: MouseEvent, newEventData: EventData) => {
    const modal = getModal();
    const titleInput = getModalInputById(modalTitleId);

    if (modal) {
        setElementDisplay(modal, "block");
        setTimeDateInputs(modal, newEventData);
        resetModal(modal);
        positionModalX(modal, event);
        positionModalY(modal, event);
    }
    if (titleInput) {
        titleInput.focus();
    }
};

const initModal = (): void => {
    const modal = getModal();
    const { title, startTime, endTime, saveBtn, closeBtn, modalSettings } = getModalInputs();

    if (startTime && endTime) {
        [startTime, endTime].forEach(generateTimeDropdown);
    }
    if (modal) {
        initDropdownSelect(modal);
        startTime?.addEventListener("blur", (event) => handleTimeChange(event, "startTime", modal));
        endTime?.addEventListener("blur", (event) => handleTimeChange(event, "endTime", modal, endTime));
    }

    closeBtn?.addEventListener("click", closeModal);
    saveBtn?.addEventListener("click", saveEvent);

    title?.addEventListener("input", handleTitleChange);
    title?.addEventListener("blur", handleTitleChange);

    modal?.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            saveEvent();
        }
        if (event.key === "Escape") {
            closeModal();
        }
    });
    modalSettings?.forEach((item) => item.addEventListener("click", () => handleSettingsClick(item)));
};

export { openModal, closeModal, initModal };
