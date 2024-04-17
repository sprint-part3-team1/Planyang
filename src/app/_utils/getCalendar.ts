import {CalendarDto} from "@/app/_types/_dto/CalendarDto";

export const getCalendar = (date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month+1, 0);

    const startDayOfWeek = firstDay.getDay();
    const lastDayOfLastMonth = new Date(year, month, 0).getDate();

    let calendarDays = [];
    for(let i=startDayOfWeek-1; i>=0; i--) {
        calendarDays.push(lastDayOfLastMonth-i);
    }
    for(let i=1; i<=lastDay.getDate(); i++) {
        calendarDays.push(i);
    }

    return new CalendarDto(year, month, calendarDays);
}