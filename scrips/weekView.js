import { getStartOfWeek, getTimeZone } from "./timeCalculations.js";
import { hoursNumber, weekDaysNumber, cellHeight } from "./calendarVars.js";
import { createDomElement, formatHours, appendChildren } from "./utils.js";
import { handleEventCreationClick } from "./eventTile.js";

const createTimeZoneCell = (timeZone) => {
    const timeZoneCell = createDomElement("div", "time-zone-cell");
    timeZoneCell.innerHTML = `<p class="time-zone">${timeZone}</p>`;

    return timeZoneCell;
};

const createSingleWeekDay = (day, today) => {
    const dayDiv = createDomElement("div", "one-day cell-width");
    const divider = createDomElement("div", "divider-vertical");
    const dayName = createDomElement("p", "day-name");
    const dayNumber = createDomElement("p", "day-number");

    Object.entries(day).forEach(([key, value]) => dayDiv.setAttribute(`data-${key}`, value));
    if (day.day == today.getDate()) dayDiv.classList.add("active");
    dayName.innerText = day.weekDay;
    dayNumber.innerText = day.day;

    return appendChildren(dayDiv, [divider, dayName, dayNumber]);
};

const createWeekDaysRow = (week, today) => {
    const weekDaysRow = createDomElement("div", "week-days", "days-row");
    const divider = createDomElement("div", "divider-no-border");

    weekDaysRow.appendChild(divider);
    week.forEach((day) => weekDaysRow.appendChild(createSingleWeekDay(day, today)));

    return weekDaysRow;
};

const createHoursColumn = () => {
    const hoursColumn = createDomElement("div", "hours-labels-column", "hours-col");

    for (let i = 0; i < hoursNumber; i++) {
        const hourDiv = createDomElement("div", "hour-label-cell cell-height");
        const hour = formatHours(i);

        hourDiv.innerHTML = `<p class="hour">${hour}:00</p>`;
        hoursColumn.appendChild(hourDiv);
    }

    return hoursColumn;
};

const createWeekDaysWrapper = (week, timeZone, today) => {
    const weekDaysWrapper = createDomElement("div", "week-days-part");
    const timeZoneCell = createTimeZoneCell(timeZone);
    const weekDaysRow = createWeekDaysRow(week, today);

    return appendChildren(weekDaysWrapper, [timeZoneCell, weekDaysRow]);
};

const createDividerColumn = () => {
    const dividerColumn = createDomElement("div", "divider-column");

    for (let i = 0; i < hoursNumber - 2; i++) {
        const divider = createDomElement("div", "divider cell-height");
        dividerColumn.appendChild(divider);
    }

    return dividerColumn;
};

const createTimeGrid = (week) => {
    const timeGrid = createDomElement("div", "hours-cells-all", "days-hours-grid");
    const dividerColumn = createDividerColumn();

    timeGrid.appendChild(dividerColumn);
    week.forEach((day) => {
        const dayColumn = createDomElement("div", "hours-cells-column");
        Object.entries(day).forEach(([key, value]) => dayColumn.setAttribute(`data-${key}`, value));
        timeGrid.appendChild(dayColumn);
    });

    return timeGrid;
};

const createTimeGridWrapper = (week) => {
    const timeGridWrapper = createDomElement("div", "time-grid");
    const hoursColumn = createHoursColumn();
    const timeGrid = createTimeGrid(week);

    return appendChildren(timeGridWrapper, [hoursColumn, timeGrid]);
};

const createWeek = (today) => {
    const week = [];
    const baseDay = getStartOfWeek(today);

    for (let i = 0; i < weekDaysNumber; i++) {
        const day = new Date(baseDay);
        day.setDate(baseDay.getDate() + i);
        const [weekDay, month, dayNum, year] = day.toString().split(" ");
        week.push({
            weekDay: weekDay,
            month: month,
            day: dayNum,
            year: year,
        });
    }

    return week;
};

const drawWeekView = () => {
    const today = new Date();
    const week = createWeek(today);
    const timeZone = getTimeZone(today);
    const weekView = document.querySelector("#week-view");
    const weekDaysWrapper = createWeekDaysWrapper(week, timeZone, today);
    const timeGridWrapper = createTimeGridWrapper(week);

    document.documentElement.style.setProperty("--cell-height", `${cellHeight}px`);
    document.documentElement.style.setProperty("--week-grid", weekDaysNumber);
    appendChildren(weekView, [weekDaysWrapper, timeGridWrapper]);
};

const initTimeGridScroll = (grid) => {
    const daysRow = document.querySelector("#days-row");
    const hoursCol = document.querySelector("#hours-col");

    grid.addEventListener("scroll", () => {
        hoursCol.scrollTop = grid.scrollTop;
        daysRow.scrollLeft = grid.scrollLeft;
    });
    grid.scrollBy(0, cellHeight * 7);
};

const initWeekView = () => {
    drawWeekView();

    const grid = document.querySelector("#days-hours-grid");
    const daysGridColumns = grid.querySelectorAll(".hours-cells-column");

    initTimeGridScroll(grid);
    daysGridColumns.forEach((col) => col.addEventListener("click", handleEventCreationClick));
};

export default initWeekView;
