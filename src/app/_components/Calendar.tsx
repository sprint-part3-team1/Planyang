import React, {useRef, useState} from 'react'
import styles from './Calendar.module.css'
import {months} from "@/app/_types/_enums/months";
import {getCalendar} from "@/app/_utils/getCalendar";
import {CalendarProps} from "@/app/_types/CalendarProps";
import {DateDto} from "@/app/_types/_dto/DateDto";

const Calendar = ({onValueChange, date, reference}: CalendarProps) => {
    const initialCalendarInfo = getCalendar(date);
    const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const [calendarInfo, setCalendarInfo] = useState(initialCalendarInfo);
    const currentDate = useRef(date);

    const getLastMonth = () => {
        currentDate.current.setMonth(currentDate.current.getMonth() - 1);
        setCalendarInfo(getCalendar(currentDate.current));
    }

    const getNextMonth = () => {
        currentDate.current.setMonth(currentDate.current.getMonth() + 1);
        setCalendarInfo(getCalendar(currentDate.current));
    }

    const sendCalendarData = (e: React.MouseEvent<HTMLDivElement>) => {
        const day = e.currentTarget.textContent;
        if(day !== null) {
            const yearValue = currentDate.current.getFullYear();
            const monthValue = currentDate.current.getMonth();
            const dayValue = parseInt(day, 10);

            onValueChange(new DateDto(yearValue, monthValue+1, dayValue));
        }
    }

    return (
        <div className={styles.calendarWrapper} ref={reference}>
            <div className={styles.topMenu}>
                <div className={styles.leftArrow} onClick={getLastMonth}/>
                <div className={styles.title}>{months[calendarInfo.month]} {calendarInfo.year}</div>
                <div className={styles.rightArrow} onClick={getNextMonth} />
            </div>

            <div className={styles.dayList}>
                {
                    DAYS.map((value, index) => {
                        return (
                            index === 0 ?
                                <div key={index} className={styles.holiday}>{value}</div> :
                                <div key={index} className={styles.weekday}>{value}</div>
                        )
                    })
                }
                {
                    calendarInfo.days.map((value: number, index: number) => {
                        return value <= index + 1 ?
                            <div key={index} className={`${styles.weekday} ${styles.usableDate}`} onClick={(e) => sendCalendarData(e)}>{value}</div> :
                            <div key={index} className={styles.lastMonthDay}>{value}</div>
                    })
                }
            </div>
        </div>

    )
}

export default Calendar;