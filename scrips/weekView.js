const weekViewFunctionality = () => {
    const grid = document.querySelector("#days-hours-grid");
    const daysRow = document.querySelector("#days-row");
    const hoursCol = document.querySelector("#hours-col");
    grid.addEventListener("scroll", (event) => {
        hoursCol.scrollTop = grid.scrollTop;
        daysRow.scrollLeft = grid.scrollLeft;
    });
};

export default weekViewFunctionality;
