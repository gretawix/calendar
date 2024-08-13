import { WEEK_DAYS_SHORT, WEEK_DAYS_LONG, MONTHS_SHORT, MONTHS_LONG } from "./constants";
import type { WeekDayNamesLong, WeekDayNamesShort, MonthNamesLong, MonthNamesShort } from "./main";

const isWeekDayLong = (value: any): value is WeekDayNamesLong => {
    return value in WEEK_DAYS_LONG;
};

const isWeekDayShort = (value: any): value is WeekDayNamesShort => {
    return value in WEEK_DAYS_SHORT;
};

const isMonthLong = (value: any): value is MonthNamesLong => {
    return value in MONTHS_LONG;
};

const isMonthShort = (value: any): value is MonthNamesShort => {
    return value in MONTHS_SHORT;
};

export { isWeekDayLong, isWeekDayShort, isMonthShort, isMonthLong };
