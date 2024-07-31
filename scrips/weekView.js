import { createWeek, getTimeZone } from "./timeCalculations.js";
import { openModal } from "./modal.js";
import { hoursNumber } from "./calendarVars.js";

const createTimeZoneCell = (timeZone) => {
    const timeZoneCell = document.createElement("div");

    timeZoneCell.className = "time-zone-cell";
    timeZoneCell.innerHTML = `<p class="time-zone">${timeZone}</p>`;

    return timeZoneCell;
};

const createWeekDaysRow = (week, today) => {
    const weekDaysRow = document.createElement("div");
    const divider = document.createElement("div");

    weekDaysRow.className = "week-days";
    weekDaysRow.id = "days-row";
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

const createHoursColumn = () => {
    const hoursColumn = document.createElement("div");

    hoursColumn.className = "hours-labels-column";
    hoursColumn.id = "hours-col";

    for (let i = 0; i < hoursNumber; i++) {
        const hourDiv = document.createElement("div");
        const hour = i > 9 ? i : `0${i}`;

        hourDiv.classList.add("hour-label-cell", "cell-height");
        hourDiv.innerHTML = `<p class="hour">${hour}:00</p>`;
        hoursColumn.appendChild(hourDiv);
    }

    return hoursColumn;
};

const createWeekDaysWrapper = (week, timeZone, today) => {
    const weekDaysWrapper = document.createElement("div");
    const timeZoneCell = createTimeZoneCell(timeZone);
    const weekDaysRow = createWeekDaysRow(week, today);

    weekDaysWrapper.className = "week-days-part";
    weekDaysWrapper.appendChild(timeZoneCell);
    weekDaysWrapper.appendChild(weekDaysRow);

    return weekDaysWrapper;
};

const createDividerColumn = () => {
    const dividerColumn = document.createElement("div");

    dividerColumn.className = "divider-column";

    for (let i = 0; i < hoursNumber - 2; i++) {
        const divider = document.createElement("div");
        divider.className = "divider cell-height";
        dividerColumn.appendChild(divider);
    }

    return dividerColumn;
};

const createTimeGrid = (week) => {
    const timeGrid = document.createElement("div");
    const dividerColumn = createDividerColumn();

    timeGrid.className = "hours-cells-all";
    timeGrid.id = "days-hours-grid";
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

const createTimeGridWrapper = (week) => {
    const timeGridWrapper = document.createElement("div");
    const hoursColumn = createHoursColumn();
    const timeGrid = createTimeGrid(week);

    timeGridWrapper.className = "time-grid";
    timeGridWrapper.appendChild(hoursColumn);
    timeGridWrapper.appendChild(timeGrid);

    return timeGridWrapper;
};

const drawWeekView = () => {
    const today = new Date();
    const week = createWeek(today);
    const timeZone = getTimeZone(today);
    const weekViewDiv = document.querySelector("#week-view");
    const weekDaysWrapper = createWeekDaysWrapper(week, timeZone, today);
    const timeGridWrapper = createTimeGridWrapper(week);

    weekViewDiv.appendChild(weekDaysWrapper);
    weekViewDiv.appendChild(timeGridWrapper);
};

const initWeekView = () => {
    drawWeekView();

    const grid = document.querySelector("#days-hours-grid");
    const daysRow = document.querySelector("#days-row");
    const hoursCol = document.querySelector("#hours-col");
    const daysGridColumns = grid.querySelectorAll(".hours-cells-column");

    grid.addEventListener("scroll", (event) => {
        hoursCol.scrollTop = grid.scrollTop;
        daysRow.scrollLeft = grid.scrollLeft;
    });
    daysGridColumns.forEach((col) => {
        col.addEventListener("click", openModal);
    });
};

export default initWeekView;
