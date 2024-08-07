declare enum WeekdayNamesLong {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    SATURDAY = "Saturday",
    SUNDAY = "Sunday",
}

declare enum WeekdayNamesShort {
    MON = "Mon",
    TUE = "Tue",
    WED = "Wed",
    THU = "Thu",
    FRI = "Fri",
    SAT = "Sat",
    SUN = "Sun",
}

declare enum AllMonthNamesLong {
    JANUARY = "January",
    FEBRUARY = "February",
    MARCH = "March",
    APRIL = "April",
    MAY = "May",
    JUNE = "June",
    JULY = "July",
    AUGUST = "August",
    SEPTEMBER = "September",
    OCTOBER = "October",
    NOVEMBER = "November",
    DECEMBER = "December",
}

declare enum AllMonthNamesShort {
    JAN = "Jan",
    FEB = "Feb",
    MAR = "Mar",
    APR = "Apr",
    MAY = "May",
    JUN = "Jun",
    JUL = "Jul",
    AUG = "Aug",
    SEP = "Sep",
    OCT = "Oct",
    NOV = "Nov",
    DEC = "Dec",
}

type WeekDayNamesLong = `${WeekdayNamesLong}`;
type WeekDayNamesShort = `${WeekdayNamesShort}`;
type MonthNamesLong = `${AllMonthNamesLong}`;
type MonthNamesShort = `${AllMonthNamesShort}`;

type WeekDay = {
    weekDay: string;
    month: string;
    day: number;
    year: number;
};

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
    weekday: WeekDayNamesShort;
    weekdayLong: WeekDayNamesLong;
    day: string;
    month: MonthNamesShort;
    monthLong: MonthNamesLong;
    year: string;
};

export { WeekDay, WeekDayNamesLong, WeekDayNamesShort, MonthNamesLong, MonthNamesShort, ModalInputs, EventData, Time };
