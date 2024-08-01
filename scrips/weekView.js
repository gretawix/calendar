import { getStartOfWeek, getTimeZone } from "./timeCalculations.js";
import { openModal } from "./modal.js";
import { hoursNumber, weekDaysNumber, cellHeight } from "./calendarVars.js";
import { createDomElement, formatHours } from "./utils.js";
import { createNewEventTile } from "./eventDisplay.js";

const createTimeZoneCell = (timeZone) => {
    const timeZoneCell = createDomElement("div", "time-zone-cell");
    timeZoneCell.innerHTML = `<p class="time-zone">${timeZone}</p>`;

    return timeZoneCell;
};

const createSingleWeekDay = (day, today) => {
    const dayDiv = createDomElement("div", "one-day cell-width");
    Object.entries(day).forEach(([key, value]) => {
        dayDiv.setAttribute(`data-${key}`, value);
    });
    if (day.day == today.getDate()) dayDiv.classList.add("active");
    dayDiv.innerHTML = `<div class="divider-vertical"></div>
                        <p class="day-name">${day.weekDay}</p>
                        <p class="day-number">${day.day}</p>`;

    return dayDiv;
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

    weekDaysWrapper.appendChild(timeZoneCell);
    weekDaysWrapper.appendChild(weekDaysRow);

    return weekDaysWrapper;
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
        Object.entries(day).forEach(([key, value]) => {
            dayColumn.setAttribute(`data-${key}`, value);
        });
        timeGrid.appendChild(dayColumn);
    });

    return timeGrid;
};

const createTimeGridWrapper = (week) => {
    const timeGridWrapper = createDomElement("div", "time-grid");
    const hoursColumn = createHoursColumn();
    const timeGrid = createTimeGrid(week);

    timeGridWrapper.appendChild(hoursColumn);
    timeGridWrapper.appendChild(timeGrid);

    return timeGridWrapper;
};

const createWeek = (today) => {
    const week = [];
    const monday = getStartOfWeek(today);

    for (let i = 0; i < weekDaysNumber; i++) {
        const day = new Date();
        day.setDate(monday.getDate() + i);
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
    const weekViewDiv = document.querySelector("#week-view");
    const weekDaysWrapper = createWeekDaysWrapper(week, timeZone, today);
    const timeGridWrapper = createTimeGridWrapper(week);

    weekViewDiv.appendChild(weekDaysWrapper);
    weekViewDiv.appendChild(timeGridWrapper);
};

const initWeekView = () => {
    document.documentElement.style.setProperty("--cell-height", `${cellHeight}px`);
    drawWeekView();

    const grid = document.querySelector("#days-hours-grid");
    const daysRow = document.querySelector("#days-row");
    const hoursCol = document.querySelector("#hours-col");
    const daysGridColumns = grid.querySelectorAll(".hours-cells-column");

    grid.addEventListener("scroll", () => {
        hoursCol.scrollTop = grid.scrollTop;
        daysRow.scrollLeft = grid.scrollLeft;
    });
    daysGridColumns.forEach((col) => {
        col.addEventListener("click", (event) => {
            const clickedWeekDayCol = event.target;
            openModal(event);
            const eventTile = createNewEventTile(event);
            if (clickedWeekDayCol.hasAttribute("data-weekday")) clickedWeekDayCol.appendChild(eventTile);
        });
    });
};

export default initWeekView;
