import { parseTime } from "./utils";
import { cellHeightInPx, currentEventTileId, defaultEventLengthInHours, emptyEventTitle } from "./constants";
import { placeNewEventTile, createEventTile } from "./eventTile";
import { getModalInputs, getGridDays } from "./selectors";
import { closeModal } from "./modal";
import {
    minutesToHour,
    hoursToMinutes,
    formatMinutes,
    formatHours,
    hourIsValid,
    minutesAreValid,
} from "./timeCalculations";
import eventsServiceFactory from "./dataService";
import { WEEK_DAYS_SHORT, MONTHS_SHORT, weekDaysMap, monthsMap } from "./types/constants";
import { isWeekDayShort, isMonthShort, isWeekDayLong, isMonthLong } from "./types/checking";
import type { DateInfo, EventData, Time } from "./types/main";

const eventsService = eventsServiceFactory();

const adjustEventTopPosition = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement | null;
    const distanceFromTop = clickedElement?.getBoundingClientRect().top;
    const clickPosition = event.clientY - (distanceFromTop ? distanceFromTop : 0);
    const increment = cellHeightInPx / 2;

    return Math.floor(clickPosition / increment) * increment;
};

const getEventLength = (eventData: EventData) => {
    const startHour = parseInt(eventData.startTime.hour, 10);
    const startMin = minutesToHour(eventData.startTime.minutes);
    const endHour = parseInt(eventData.endTime.hour, 10);
    const endMin = minutesToHour(eventData.endTime.minutes);

    return endHour + endMin - startHour - startMin;
};

const getTime = (hour: number | string, minutes: number | string): Time => {
    const time = parseTime(hour, minutes);

    if (!hourIsValid(time.hour) || !minutesAreValid(time.minutes)) throw new Error("invalid time");

    return {
        hour: `${formatHours(time.hour)}`,
        minutes: `${formatMinutes(time.minutes)}`,
    };
};

const getEndTime = (
    startHour: number | string,
    minutes: number | string,
    eventLength = defaultEventLengthInHours
): Time => {
    const time = parseTime(startHour, minutes);
    const endTime = time.hour + minutesToHour(time.minutes) + eventLength;
    const endHour = Math.floor(endTime);
    const endMinutes = hoursToMinutes(endTime - endHour);

    return getTime(endHour, endMinutes);
};
const getDefaultEvent = (): EventData => {
    const today = new Date();
    const [weekDayShort, monthShort, dayNum, year] = today.toString().split(" ") as DateInfo;

    return {
        title: emptyEventTitle,
        startTime: getTime(9, 0),
        endTime: getEndTime(9, 0),
        weekday: weekDayShort,
        weekdayLong: weekDaysMap[weekDayShort],
        day: dayNum,
        month: monthShort,
        monthLong: monthsMap[monthShort],
        year: year,
    };
};

const constructNewEvent = (event: MouseEvent): EventData => {
    const data = getDefaultEvent();
    const clickedColumn = event.target as HTMLElement;
    const clickPosition = adjustEventTopPosition(event);
    const startHour = Math.floor(clickPosition / cellHeightInPx);

    let minutes = 0;
    if (clickPosition % cellHeightInPx === cellHeightInPx / 2) minutes = 30;
    data.startTime = getTime(startHour, minutes);
    data.endTime = getEndTime(startHour, minutes);

    const weekDayAttr = clickedColumn.getAttribute("data-weekday");
    const monthAttr = clickedColumn.getAttribute("data-month");
    const dayAttr = clickedColumn.getAttribute("data-day");
    const yearAttr = clickedColumn.getAttribute("data-year");

    if (isWeekDayShort(weekDayAttr)) {
        data.weekday = WEEK_DAYS_SHORT[weekDayAttr];
        data.weekdayLong = weekDaysMap[data.weekday];
    } else throw new Error("failed to get weekday");

    if (isMonthShort(monthAttr)) {
        data.month = MONTHS_SHORT[monthAttr];
        data.monthLong = monthsMap[data.month];
    } else throw new Error("failed to get month");

    if (dayAttr) {
        data.day = dayAttr;
    } else throw new Error("failed to get day");

    if (yearAttr) {
        data.year = yearAttr;
    } else throw new Error("failed to get year");

    return data;
};

const saveEventToStorage = async (eventData: EventData) => {
    const currentEventTile = document.querySelector(`#${currentEventTileId}`) as HTMLElement | null;
    if (currentEventTile) {
        placeNewEventTile(currentEventTile, eventData);
    } else throw new Error("failed to save new event tile");

    await eventsService.create(eventData);
};

const updateWeekday = (eventData: EventData, weekDayLong: string): EventData => {
    const weekDayShort = weekDayLong.slice(0, 3);
    if (isWeekDayLong(weekDayLong) && isWeekDayShort(weekDayShort)) {
        eventData.weekday = weekDayShort;
        eventData.weekdayLong = weekDayLong;
    } else {
        throw new Error("incorrect week day");
    }

    return eventData;
};

const updateMonth = (eventData: EventData, monthLong: string): EventData => {
    const monthShort = monthLong.slice(0, 3);
    if (isMonthLong(monthLong) && isMonthShort(monthShort)) {
        eventData.monthLong = monthLong;
        eventData.month = monthShort;
    } else {
        throw new Error("incorrect month name");
    }

    return eventData;
};

const updateDay = (eventData: EventData, day: string): EventData => {
    if (parseInt(day, 10) <= 31 && parseInt(day, 10) > 0) {
        eventData.day = day;
    } else {
        throw new Error("Incorect month day");
    }
    return eventData;
};

const updateEventTime = (eventData: EventData, hour: string, minutes: string, timeType: "start" | "end"): EventData => {
    if (hourIsValid(hour) && minutesAreValid(minutes)) {
        eventData[`${timeType}Time`] = getTime(hour, minutes);
    } else {
        throw new Error(`incorrect ${timeType} time`);
    }

    return eventData;
};

const updateEventData = (
    eventData: EventData,
    title: string,
    dateInput: string,
    startTime: string,
    endTime: string
): EventData => {
    const [weekDayLong, date] = dateInput.split(", ");
    const [startHour, startMinutes] = startTime.split(":");
    const [endHour, endMinutes] = endTime.split(":");

    eventData.title = title;
    if (weekDayLong) eventData = updateWeekday(eventData, weekDayLong);
    if (date) {
        const [monthLong, day] = date.split(" ");
        if (monthLong) eventData = updateMonth(eventData, monthLong);
        if (day) eventData = updateDay(eventData, day);
    }
    if (startHour && startMinutes) eventData = updateEventTime(eventData, startHour, startMinutes, "start");
    if (endHour && endMinutes) eventData = updateEventTime(eventData, endHour, endMinutes, "end");

    return eventData;
};

const saveEvent = async () => {
    const [title, dateInput, startTime, endTime] = getModalInputs();
    const events = await eventsService.getAll();

    let eventData = events.current;
    let eventLength = getEventLength(eventData);

    if (!title?.value) {
        title?.classList.add("error");
        title?.focus();
    } else if (eventLength <= 0) {
        endTime?.classList.add("error");
        endTime?.focus();
    }
    if (title?.value) {
        if (eventLength > 0 && dateInput && startTime && endTime) {
            eventData = updateEventData(eventData, title.value, dateInput.value, startTime.value, endTime.value);
            saveEventToStorage(eventData);
            closeModal();
        } else throw new Error("Failed to save event");
    } else throw new Error("No event title provided");
};

const displayAllSavedEvents = async () => {
    const events = await eventsService.getAll();
    const allSavedEvents = events.all;
    const gridDays = getGridDays();

    if (gridDays) {
        allSavedEvents.forEach((oneEvent) => {
            const eventTile = createEventTile(oneEvent);
            const eventParentDiv = Array.from(gridDays).find(
                (day) =>
                    day.dataset.day === oneEvent.day &&
                    day.dataset.month === oneEvent.month &&
                    day.dataset.year === oneEvent.year
            );
            if (eventParentDiv) eventParentDiv.appendChild(eventTile);
        });
    } else throw new Error("No time grid to display events");
};

export { saveEvent, constructNewEvent, getEventLength, displayAllSavedEvents, getTime, getEndTime };
