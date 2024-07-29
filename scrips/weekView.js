import { createWeek, getTimeZone } from "./timeCalculations.js";
import { openModal } from "./modal.js";

const initWeekView = () => {
    drawWeekView();
    const grid = document.querySelector("#days-hours-grid");
    const daysRow = document.querySelector("#days-row");
    const hoursCol = document.querySelector("#hours-col");
    grid.addEventListener("scroll", (event) => {
        hoursCol.scrollTop = grid.scrollTop;
        daysRow.scrollLeft = grid.scrollLeft;
    });
    const daysGridColumns = grid.querySelectorAll(".hours-cells-column");
    daysGridColumns.forEach((col) => {
        col.addEventListener("click", openModal);
    });
};

const drawWeekView = () => {
    const today = new Date();
    const week = createWeek(today);
    const timeZone = getTimeZone(today);
    const weekViewDiv = document.querySelector("#week-view");
    const weekDaysPart = createWeekDaysPart(week, timeZone, today);
    const timeGridPart = createTimeGridPart(week);

    weekViewDiv.appendChild(weekDaysPart);
    weekViewDiv.appendChild(timeGridPart);
};

const createWeekDaysPart = (week, timeZone, today) => {
    const weekDaysPart = document.createElement("div");
    weekDaysPart.className = "week-days-part";
    const timeZoneCell = createTimeZoneCell(timeZone);
    const weekDaysRow = createWeekDaysRow(week, today);

    weekDaysPart.appendChild(timeZoneCell);
    weekDaysPart.appendChild(weekDaysRow);

    return weekDaysPart;
};

const createTimeZoneCell = (timeZone) => {
    const timeZoneCell = document.createElement("div");
    timeZoneCell.className = "time-zone-cell";
    timeZoneCell.innerHTML = ` <p class="time-zone">${timeZone}</p>`;

    return timeZoneCell;
};

const createWeekDaysRow = (week, today) => {
    const weekDaysRow = document.createElement("div");
    weekDaysRow.className = "week-days";
    weekDaysRow.id = "days-row";
    const divider = document.createElement("div");
    divider.className = "divider-no-border";

    weekDaysRow.appendChild(divider);

    week.forEach((day) => {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("one-day", "cell-width");
        if (day.day == today.getDate()) dayDiv.classList.add("active");
        dayDiv.innerHTML = `<div class="divider-vertical"></div>
                            <p class="day-name">${day.weekDay}</p>
                            <p class="day-number">${day.day}</p>`;

        weekDaysRow.appendChild(dayDiv);
    });

    return weekDaysRow;
};

const createTimeGridPart = (week) => {
    const timeGridPart = document.createElement("div");
    timeGridPart.className = "time-grid";
    const hoursColumn = createHoursColumn();
    const timeGrid = createTimeGrid(week);

    timeGridPart.appendChild(hoursColumn);
    timeGridPart.appendChild(timeGrid);

    return timeGridPart;
};

const createHoursColumn = () => {
    const hoursColumn = document.createElement("div");
    hoursColumn.className = "hours-labels-column";
    hoursColumn.id = "hours-col";

    for (let i = 0; i < 24; i++) {
        const hourDiv = document.createElement("div");
        hourDiv.classList.add("hour-label-cell", "cell-height");
        const hour = i > 9 ? i : `0${i}`;
        hourDiv.innerHTML = `<p class="hour">${hour}:00</p>`;

        hoursColumn.appendChild(hourDiv);
    }

    return hoursColumn;
};

const createTimeGrid = (week) => {
    const timeGrid = document.createElement("div");
    timeGrid.className = "hours-cells-all";
    timeGrid.id = "days-hours-grid";
    const dividerColumn = createDividerColumn();

    timeGrid.appendChild(dividerColumn);

    week.forEach(() => {
        const dayColumn = document.createElement("div");
        dayColumn.className = "hours-cells-column";
        dayColumn.innerHTML = `<div class="inner-hour-cell-column">
                                <div class="hours-cell cell-height"></div>
                            </div>`;

        timeGrid.appendChild(dayColumn);
    });

    return timeGrid;
};

const createDividerColumn = () => {
    const dividerColumn = document.createElement("div");
    dividerColumn.className = "divider-column";

    for (let i = 0; i < 22; i++) {
        const divider = document.createElement("div");
        divider.className = "divider cell-height";
        dividerColumn.appendChild(divider);
    }

    return dividerColumn;
};
export default initWeekView;
