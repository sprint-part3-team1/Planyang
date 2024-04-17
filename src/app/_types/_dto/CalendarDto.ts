import {CalendarDtoImpl} from "@/app/_types/_dto/CalendarDtoImpl";

export class CalendarDto implements CalendarDtoImpl {
    year: number;
    month: number;
    days: number[];

    constructor(year: number, month: number, days: number[]) {
        this.year = year;
        this.month = month;
        this.days = days;
    }
}