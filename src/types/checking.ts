import { WEEK_DAYS_SHORT, WEEK_DAYS_LONG, MONTHS_SHORT, MONTHS_LONG } from "./constants.js";
import type { WeekDayNamesLong, WeekDayNamesShort, MonthNamesLong, MonthNamesShort } from "./main.js";

const isWeekDayLong = (value: any): value is WeekDayNamesLong => {
    return Object.values(WEEK_DAYS_LONG).includes(value);
};

const isWeekDayShort = (value: any): value is WeekDayNamesShort => {
    return Object.values(WEEK_DAYS_SHORT).includes(value);
};

const isMonthLong = (value: any): value is MonthNamesLong => {
    return Object.values(MONTHS_LONG).includes(value);
};

const isMonthShort = (value: any): value is MonthNamesShort => {
    return Object.values(MONTHS_SHORT).includes(value);
};

export { isWeekDayLong, isWeekDayShort, isMonthShort, isMonthLong };
