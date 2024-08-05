const setInputLabel = (dropdownItem, selectedOption) => {
    const inputLabelText = selectedOption.innerText.trim();
    dropdownItem.querySelector("button.dropdown .dropdown-label").innerText = inputLabelText;
};

const selectDropdownItem = (dropdownItem) => {
    const allOptions = dropdownItem.querySelectorAll(".select-options li");
    allOptions.forEach((option) => {
        option.addEventListener("click", (_) => {
            allOptions.forEach((item) => item.classList.remove("selected"));
            option.classList.add("selected");
            setInputLabel(dropdownItem, option);
        });
    });
};

const initDropdownSelect = (modal) => {
    const dropdowns = modal.querySelectorAll(".select-input");

    dropdowns.forEach((item) => {
        item.addEventListener("click", (event) => {
            item.classList.toggle("open");
            selectDropdownItem(item);
        });
    });
};

const resetDropdownItem = (dropdownItem) => {
    dropdownItem.querySelectorAll(".select-options li").forEach((item, index) => {
        item.classList.remove("selected");
        if (index === 0) {
            item.classList.add("selected");
            setInputLabel(dropdownItem, item);
        }
    });
};

export { selectDropdownItem, initDropdownSelect, setInputLabel, resetDropdownItem };
