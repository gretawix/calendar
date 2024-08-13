import { hoursInDay, daysNumberOnTimeGrid, cellHeightInPx } from "./constants";
import { getFirstDayInTimeGrid, getTimeZone, formatHours } from "./timeCalculations";
import { createDomElement, appendChildren } from "./utils";
import { handleEventCreationClick } from "./eventTile";
import { getGrid, getGridDays } from "./selectors";
import type { DateInfo, WeekDay } from "./types/main";

const createTimeZoneCell = (timeZone: string) => {
    const timeZoneCell = createDomElement("div", "time-zone-cell");
    timeZoneCell.innerHTML = `<p class="time-zone">${timeZone}</p>`;

    return timeZoneCell;
};

const createSingleWeekDay = (day: WeekDay, today: Date) => {
    const dayDiv: HTMLElement = createDomElement("div", "one-day cell-width");
    const divider: HTMLElement = createDomElement("div", "divider-vertical");
    const dayName: HTMLElement = createDomElement("p", "day-name");
    const dayNumber: HTMLElement = createDomElement("p", "day-number");

    Object.entries(day).forEach(([key, value]) =>
        dayDiv.setAttribute(`data-${key}`, typeof value === "number" ? value.toString() : value)
    );
    if (day.day == today.getDate()) {
        dayDiv.classList.add("active");
    }
    dayName.innerText = day.weekDay;
    dayNumber.innerText = day.day.toString();

    return appendChildren(dayDiv, [divider, dayName, dayNumber]);
};

const createWeekDaysRow = (week: WeekDay[], today: Date) => {
    const weekDaysRow = createDomElement("div", "week-days", "days-row");
    const divider = createDomElement("div", "divider-no-border");

    weekDaysRow.appendChild(divider);
    week.forEach((day) => weekDaysRow.appendChild(createSingleWeekDay(day, today)));

    return weekDaysRow;
};

const createHoursColumn = () => {
    const hoursColumn = createDomElement("div", "hours-labels-column", "hours-col");

    for (let i = 0; i < hoursInDay; i++) {
        const hourDiv = createDomElement("div", "hour-label-cell cell-height");
        const hour = formatHours(i);

        hourDiv.innerHTML = `<p class="hour">${hour}:00</p>`;
        hoursColumn.appendChild(hourDiv);
    }

    return hoursColumn;
};

const createWeekDaysWrapper = (week: WeekDay[], timeZone: string, today: Date) => {
    const weekDaysWrapper = createDomElement("div", "week-days-part");
    const timeZoneCell = createTimeZoneCell(timeZone);
    const weekDaysRow = createWeekDaysRow(week, today);

    return appendChildren(weekDaysWrapper, [timeZoneCell, weekDaysRow]);
};

const createDividerColumn = () => {
    const dividerColumn = createDomElement("div", "divider-column");

    for (let i = 0; i < hoursInDay - 2; i++) {
        const divider = createDomElement("div", "divider cell-height");
        dividerColumn.appendChild(divider);
    }

    return dividerColumn;
};

const createTimeGrid = (week: WeekDay[]) => {
    const timeGrid = createDomElement("div", "hours-cells-all", "days-hours-grid");
    const dividerColumn = createDividerColumn();

    timeGrid.appendChild(dividerColumn);
    week.forEach((day) => {
        const dayColumn = createDomElement("div", "hours-cells-column");
        Object.entries(day).forEach(([key, value]) =>
            dayColumn.setAttribute(`data-${key}`, typeof value === "number" ? value.toString() : value)
        );
        timeGrid.appendChild(dayColumn);
    });

    return timeGrid;
};

const createTimeGridWrapper = (week: WeekDay[]) => {
    const timeGridWrapper = createDomElement("div", "time-grid");
    const hoursColumn = createHoursColumn();
    const timeGrid = createTimeGrid(week);

    return appendChildren(timeGridWrapper, [hoursColumn, timeGrid]);
};

const createWeek = (today: Date): WeekDay[] => {
    const week: WeekDay[] = [];
    const baseDay = getFirstDayInTimeGrid(today);

    for (let i = 0; i < daysNumberOnTimeGrid; i++) {
        const day = new Date(baseDay);
        day.setDate(baseDay.getDate() + i);
        const [weekDay, month, dayNum, year] = day.toString().split(" ") as DateInfo;
        week.push({
            weekDay: weekDay,
            month: month,
            day: parseInt(dayNum, 10),
            year: parseInt(year, 10),
        });
    }

    return week;
};

const drawWeekView = () => {
    const today = new Date();
    const week = createWeek(today);
    const timeZone = getTimeZone(today);
    const weekView: HTMLElement | null = document.querySelector("#week-view");
    const weekDaysWrapper = createWeekDaysWrapper(week, timeZone, today);
    const timeGridWrapper = createTimeGridWrapper(week);

    document.documentElement.style.setProperty("--cell-height", `${cellHeightInPx}px`);
    document.documentElement.style.setProperty("--week-grid", `${daysNumberOnTimeGrid}`);
    if (weekView) {
        appendChildren(weekView, [weekDaysWrapper, timeGridWrapper]);
    }
};

const initTimeGridScroll = (grid: HTMLElement) => {
    const daysRow: HTMLElement | null = document.querySelector("#days-row");
    const hoursCol: HTMLElement | null = document.querySelector("#hours-col");
    if (hoursCol && daysRow) {
        grid.addEventListener("scroll", () => {
            hoursCol.scrollTop = grid.scrollTop;
            daysRow.scrollLeft = grid.scrollLeft;
        });
    }
    grid.scrollBy(0, cellHeightInPx * 7);
};

const initWeekView = () => {
    drawWeekView();

    const grid = getGrid();
    const gridDays = getGridDays();

    if (grid) {
        initTimeGridScroll(grid);
    }
    gridDays?.forEach((col) => col.addEventListener("click", handleEventCreationClick));
};

export default initWeekView;
