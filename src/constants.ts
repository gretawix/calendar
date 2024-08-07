const daysNumberOnTimeGrid: number = 7;
const hoursInDay: number = 24;
const minutesInHour: number = 60;
const daysInWeek: number = 7;
const cellHeightInPx: number = 49;
const currentEventTileId: string = "current-event-tile";
const defaultEventLengthInHours: number = 1;
const emptyEventTitle: string = "(no title)";
const timeStepInMinutes: number = 15;
const modalInputsIds: { [key: string]: string } = { date: "date", timeStart: "time-start", timeEnd: "time-end" };
const modalTitleId: string = "title";

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
