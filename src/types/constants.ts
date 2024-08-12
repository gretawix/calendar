import type { WeekDayNamesLong, WeekDayNamesShort, MonthNamesLong, MonthNamesShort } from "./main";

const WEEK_DAYS_LONG = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday",
} as const;

const WEEK_DAYS_SHORT = {
    Mon: "Mon",
    Tue: "Tue",
    Wed: "Wed",
    Thu: "Thu",
    Fri: "Fri",
    Sat: "Sat",
    Sun: "Sun",
} as const;

const MONTHS_LONG = {
    January: "January",
    February: "February",
    March: "March",
    April: "April",
    May: "May",
    June: "June",
    July: "July",
    August: "August",
    September: "September",
    October: "October",
    November: "November",
    December: "December",
} as const;

const MONTHS_SHORT = {
    Jan: "Jan",
    Feb: "Feb",
    Mar: "Mar",
    Apr: "Apr",
    May: "May",
    Jun: "Jun",
    Jul: "Jul",
    Aug: "Aug",
    Sep: "Sep",
    Oct: "Oct",
    Nov: "Nov",
    Dec: "Dec",
} as const;

const weekDaysMap = Object.fromEntries(
    Object.entries(WEEK_DAYS_LONG).map(([longName, fullName]) => [longName.slice(0, 3) as WeekDayNamesShort, fullName])
) as Record<WeekDayNamesShort, WeekDayNamesLong>;

const monthsMap = Object.fromEntries(
    Object.entries(MONTHS_LONG).map(([longName, fullName]) => [longName.slice(0, 3) as MonthNamesShort, fullName])
) as Record<MonthNamesShort, MonthNamesLong>;

export { WEEK_DAYS_SHORT, WEEK_DAYS_LONG, MONTHS_SHORT, MONTHS_LONG, weekDaysMap, monthsMap };
