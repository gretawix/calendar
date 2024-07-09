const toggleDropdown = () => {
    const dropdowns = document.querySelectorAll(".select-input");
    dropdowns.forEach((item) => {
        item.addEventListener("click", (event) => {
            item.classList.toggle("open");
            selectDropdownItem(item);
            setInputLabel(item);
        });
    });
};

const selectDropdownItem = (parentElement) => {
    const selectOptions = parentElement.querySelectorAll(".select-options li");
    selectOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
            selectOptions.forEach((item) => item.classList.remove("selected"));
            option.classList.add("selected");
        });
    });
};

const setInputLabel = (parentElement) => {
    const selectOption = parentElement.querySelector("li.selected");
    const inputLabelText = selectOption.innerText.trim();
    const labelElement = parentElement.querySelector("button.dropdown .dropdown-label");
    labelElement.innerText = inputLabelText;
};

export { toggleDropdown };
