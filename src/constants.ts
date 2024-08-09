const daysNumberOnTimeGrid = 7;
const hoursInDay = 24;
const minutesInHour = 60;
const daysInWeek = 7;
const cellHeightInPx = 49;
const currentEventTileId = "current-event-tile";
const defaultEventLengthInHours = 1;
const emptyEventTitle = "(no title)";
const timeStepInMinutes = 15;
const modalInputsIds = { date: "date", timeStart: "time-start", timeEnd: "time-end" } as const;
const modalTitleId = "title";

export {
    daysNumberOnTimeGrid,
    hoursInDay,
    cellHeightInPx,
    currentEventTileId,
    defaultEventLengthInHours,
    emptyEventTitle,
    modalInputsIds,
    modalTitleId,
    minutesInHour,
    daysInWeek,
    timeStepInMinutes,
};
