import {DateDtoImpl} from "@/app/_types/_dto/DateDtoImpl";

export class DateDto implements DateDtoImpl {
    year: number;
    month: number;
    day: number;

    constructor(year: number, month: number, day: number) {
        this.year = year;
        this.month = month;
        this.day = day;
    }
}