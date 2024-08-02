const setInputLabel = (dropdownItem, selectedOption) => {
    const inputLabelText = selectedOption.innerText.trim();
    dropdownItem.querySelector("button.dropdown .dropdown-label").innerText = inputLabelText;
};

const selectDropdownItem = (dropdownItem) => {
    const allOptions = dropdownItem.querySelectorAll(".select-options li");
    allOptions.forEach((option) => {
        option.addEventListener("click", () => {
            allOptions.forEach((item) => item.classList.remove("selected"));
            option.classList.add("selected");
            setInputLabel(dropdownItem, option);
        });
    });
};

const initDropdownSelect = (modal) => {
    const dropdowns = modal.querySelectorAll(".select-input");

    dropdowns.forEach((dropdownItem) => {
        dropdownItem.addEventListener("click", () => {
            dropdownItem.classList.toggle("open");
        });
        selectDropdownItem(dropdownItem);
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

const handleEmptyTitleInput = (event, titleInput) => {
    if (event.target.value) titleInput.classList.remove("error");
};

export { initDropdownSelect, setInputLabel, resetDropdownItem, handleEmptyTitleInput };
