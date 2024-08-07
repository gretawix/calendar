import { createDomElement, setElementDisplay, getMinutesIncrements } from "./utils.js";
import { hoursInDay, modalInputsIds } from "./constants.js";
import { getModalInputById } from "./selectors.js";
import { minutesToHour, getDisplayableTime, formatTime } from "./timeCalculations.js";
import { EventData, Time } from "./types/main.js";

const setInputLabel = (dropdownItem: HTMLElement, selectedOption: HTMLElement): void => {
    const inputLabelText = selectedOption.innerText.trim();
    const button: HTMLElement = dropdownItem.querySelector("button.dropdown .dropdown-label");
    const input: HTMLInputElement = dropdownItem.querySelector("input");

    if (input) input.value = inputLabelText;
    if (button) button.innerText = inputLabelText;
};

const handleDropdownItemSelect = (
    allOptions: NodeListOf<HTMLElement>,
    option: HTMLElement,
    dropdownItem: HTMLElement
): void => {
    allOptions.forEach((item) => item.classList.remove("selected"));
    option.classList.add("selected");
    setInputLabel(dropdownItem, option);
    if (dropdownItem.classList.contains("time-select")) {
        dropdownItem.classList.remove("open");
    }
};

const initDropdownItemSelect = (dropdownItem: HTMLElement): void => {
    const allOptions: NodeListOf<HTMLElement> = dropdownItem.querySelectorAll(".select-options li");
    allOptions.forEach((option) => {
        option.addEventListener("click", () => {
            handleDropdownItemSelect(allOptions, option, dropdownItem);
        });
    });
};

const openDropdownClick = (dropdownItem: HTMLElement): void => {
    dropdownItem.classList.toggle("open");

    const dropdownWrapper = dropdownItem.querySelector("ul");
    const dropdownWarpTop = dropdownWrapper.getBoundingClientRect().top;
    const selected = dropdownItem.querySelector("li.selected");

    if (selected) dropdownWrapper.scrollBy(0, selected.getBoundingClientRect().top - dropdownWarpTop - 80);
};

const initDropdownSelect = (modal: HTMLElement): void => {
    const dropdowns: NodeListOf<HTMLElement> = modal.querySelectorAll(".select-input, .time-select");
    dropdowns.forEach((dropdownItem) => {
        dropdownItem.addEventListener("click", () => openDropdownClick(dropdownItem));
        initDropdownItemSelect(dropdownItem);
    });
};

const resetDropdownItem = (dropdownItem: HTMLElement): void => {
    dropdownItem.querySelectorAll(".select-options li").forEach((item: HTMLElement, index) => {
        item.classList.remove("selected");
        if (index === 0) {
            item.classList.add("selected");
            setInputLabel(dropdownItem, item);
        }
    });
};

const generateTimeDropdown = (input: HTMLInputElement): void => {
    const parent = input.parentElement;
    const dropdownList = createDomElement("ul", "repeat-options select-options");
    dropdownList.style.minWidth = "188px";
    dropdownList.style.height = "200px";

    for (let i = 0; i < hoursInDay * getMinutesIncrements().length; i++) {
        const listItem = createDomElement("li");
        dropdownList.appendChild(listItem);
    }

    parent.appendChild(dropdownList);
};

const populateTimeDropdowns = (eventData: EventData): void => {
    const populateDropdown = (dropdownItems: NodeListOf<HTMLElement>, time: Time, startTime: boolean) => {
        Array.from(dropdownItems).forEach((item, index) => {
            const minutesIncrementLength = getMinutesIncrements().length;
            const hourFraction = startTime
                ? index / minutesIncrementLength
                : index / minutesIncrementLength +
                  parseInt(eventData.startTime.hour) +
                  minutesToHour(eventData.startTime.minutes);

            item.innerText = formatTime(hourFraction);
            if (item.innerText === getDisplayableTime(time.hour, time.minutes)) {
                item.classList.add("selected");
            }
            if (!startTime && index === 0) setElementDisplay(item, "none");
        });
    };

    const startDropdownItems: NodeListOf<HTMLElement> = getModalInputById(
        modalInputsIds.timeStart
    ).parentElement.querySelectorAll("ul li");
    const endDropdownItems: NodeListOf<HTMLElement> = getModalInputById(
        modalInputsIds.timeEnd
    ).parentElement.querySelectorAll("ul li");

    populateDropdown(startDropdownItems, eventData.startTime, true);
    populateDropdown(endDropdownItems, eventData.endTime, false);
};

export { initDropdownSelect, setInputLabel, resetDropdownItem, generateTimeDropdown, populateTimeDropdowns };
