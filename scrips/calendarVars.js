const weekDaysNumber = 7;
const hoursNumber = 24;
const cellHeight = 49;
const currentEventTileId = "current-event-tile";
const defaultEventLength = 1; //hours
const emptyEventTitle = "(no title)";
const minutesGap = 15;
const minutesIncrement = [];
for (let i = 0; i < 60 / minutesGap; i++) minutesIncrement.push(i * minutesGap);

export {
    weekDaysNumber,
    hoursNumber,
    cellHeight,
    currentEventTileId,
    defaultEventLength,
    emptyEventTitle,
    minutesIncrement,
};
