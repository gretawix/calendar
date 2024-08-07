type WeekDay = {
    weekDay: string;
    month: string;
    day: number;
    year: number;
};

type WeekDayNamesLong = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
type WeekDayNamesShort = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

type MonthNamesLong =
    | "January"
    | "February"
    | "March"
    | "April"
    | "May"
    | "June"
    | "July"
    | "August"
    | "September"
    | "October"
    | "November"
    | "December";

type MonthNamesShort = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

type ModalInputs = [
    HTMLInputElement,
    HTMLInputElement,
    HTMLInputElement,
    HTMLInputElement,
    HTMLElement,
    HTMLElement,
    NodeListOf<HTMLElement>
];

type Time = {
    hour: string;
    minutes: string;
};

type EventData = {
    title: string;
    startTime: Time;
    endTime: Time;
    weekday: string;
    weekdayLong: string;
    day: string;
    month: string;
    monthLong: string;
    year: string;
};

export { WeekDay, WeekDayNamesLong, WeekDayNamesShort, MonthNamesLong, MonthNamesShort, ModalInputs, EventData, Time };
