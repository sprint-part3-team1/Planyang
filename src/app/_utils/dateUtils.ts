import {DateDto} from "@/app/_types/_dto/DateDto";

export const changeDateFormat = (date: DateDto) => {
    let year = date.year.toString();
    let day = adjustFormat(date.day);
    let month = adjustFormat(date.month);

    return `${year}-${month}-${day}`;
}

const adjustFormat = (value: number) => {
    let ret: string;
    if(value < 10) {
        ret = '0' + value;
    } else {
        ret = value.toString();
    }

    return ret;
}