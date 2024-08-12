import { WEEK_DAYS_SHORT, WEEK_DAYS_LONG, MONTHS_SHORT, MONTHS_LONG } from "./constants.ts";

export type ObjectValues<T> = T[keyof T];

export type WeekDayNamesLong = ObjectValues<typeof WEEK_DAYS_LONG>;
export type WeekDayNamesShort = ObjectValues<typeof WEEK_DAYS_SHORT>;
export type MonthNamesLong = ObjectValues<typeof MONTHS_LONG>;
export type MonthNamesShort = ObjectValues<typeof MONTHS_SHORT>;

export type WeekDay = {
    weekDay: WeekDayNamesShort;
    month: MonthNamesShort;
    day: number;
    year: number;
};

export type DateInfo = [WeekDayNamesShort, MonthNamesShort, string, string];

export type ModalInputs = [
    HTMLInputElement | null | undefined,
    HTMLInputElement | null | undefined,
    HTMLInputElement | null | undefined,
    HTMLInputElement | null | undefined,
    HTMLElement | null | undefined,
    HTMLElement | null | undefined,
    NodeListOf<HTMLElement> | undefined
];

export type Time = {
    hour: string;
    minutes: string;
};

export type EventData = {
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

export type Events = {
    all: EventData[];
    current: EventData;
};
