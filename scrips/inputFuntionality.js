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

const separateInputs = (parent) => {
    const parentClasses = parent.classList;
    if (parentClasses.contains("with-separator")) {
        const prevDiv = parent.previousElementSibling;
        const nextDiv = parent.nextElementSibling;
        if (
            prevDiv &&
            nextDiv &&
            prevDiv.classList.contains("separated-bottom") &&
            nextDiv.classList.contains("separated-top")
        ) {
            prevDiv.classList.remove("separated-bottom");
            parentClasses.add("separated-top");
        } else if (nextDiv && nextDiv.classList.contains("separated-top")) {
            parentClasses.add("separated-top");
        } else if (prevDiv && prevDiv.classList.contains("separated-bottom")) {
            parentClasses.add("separated-bottom");
        } else {
            parentClasses.add("separated-top");
            parentClasses.add("separated-bottom");
        }
    }
};

export { toggleDropdown, separateInputs };
