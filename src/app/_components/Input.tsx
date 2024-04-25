'use client';

import React, { useRef, useState } from 'react';
import { InputProps } from '@/app/_types/InputProps';
import Image from 'next/image';
import Calendar from '@/app/_components/Calendar';
import { DateDto } from '@/app/_types/_dto/DateDto';
import { changeDateFormat } from '@/app/_utils/dateUtils';
import { useOutsideClick } from '@/app/_hooks/useOutsideClick';
import TagIcon from '@/app/_components/TagIcon';
import { isValidName } from '@/app/_utils/validateUtils';
import styles from './Input.module.css';

const Input = ({
  inputId,
  inputName,
  inputType,
  inputWidth,
  inputRef,
  errorMessage = null,
  errorState,
  placeholder = undefined,
  onChange,
}: InputProps) => {
  const INVISIBLE_ICON_SRC = '/assets/icons/invisible.svg';
  const VISIBLE_ICON_SRC = '/assets/icons/visible.svg';
  const calendarRef = useRef<HTMLDivElement>(null);

  const customWidth =
    inputWidth !== '100%'
      ? {
          width: inputWidth + 'rem',
        }
      : {
          width: '100%',
        };

  const onClickVisibleIcon = () => {
    setVisibilityIcon(!visibilityIcon);
  };

  const onClickCalendarIcon = () => {
    setCalendarVisibility(!calendarVisibility);
  };

  const onKeydownTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const { value } = e.currentTarget;
      if (tags.size === 4) {
        alert('태그는 최대 4개까지만 추가할 수 있습니다.');
        return;
      }
      if (isValidName(value, 0, 10)) {
        alert(
          '태그는 영문(1pt) 또는 한글(2pt)만 사용해 10pt 이내로 작성해주세요.',
        );
        return;
      }

      const newTags = new Set(tags);
      newTags.add(value);
      e.currentTarget.value = '';
      setTags(newTags);
    }
  };

  const getDateValue = (value: DateDto) => {
    setDateValue(changeDateFormat(value));
    setToday(new Date(value.year, value.month - 1, value.day));
    setCalendarVisibility(false);
  };

  const getDeleteOrder = (value: string) => {
    const newTags = new Set(tags);
    newTags.delete(value);
    setTags(newTags);
  };

  const setInputType = () => {
    if (inputType === 'text') return 'text';

    if (visibilityIcon) {
      return 'password';
    }
    return 'text';
  };

  const [visibilityIcon, setVisibilityIcon] = useState(true);
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [today, setToday] = useState(new Date());
  const [dateValue, setDateValue] = useState(
    changeDateFormat(
      new DateDto(today.getFullYear(), today.getMonth() + 1, today.getDay()),
    ),
  );
  const [tags, setTags] = useState(new Set<string>());

  useOutsideClick(calendarRef, () => {
    setCalendarVisibility(false);
  });

  return (
    <div className={styles.entireWrapper}>
      <label className={styles.inputLabel} htmlFor={inputId}>
        {inputName}
      </label>
      <div className={styles.inputWrapper} style={customWidth}>
        {inputType === 'text' || inputType === 'password' ? (
          <>
            <input
              id={inputId}
              className={`${styles.input} ${errorState ? styles.error : undefined}`}
              type={setInputType()}
              placeholder={placeholder}
              ref={inputRef}
              onChange={onChange}
            />
            {inputType === 'password' ? (
              <Image
                className={styles.innerIcon}
                src={visibilityIcon ? INVISIBLE_ICON_SRC : VISIBLE_ICON_SRC}
                alt="visibleIcon"
                width={24}
                height={24}
                onClick={onClickVisibleIcon}
              />
            ) : null}
          </>
        ) : inputType === 'calendar' ? (
          <>
            <input
              id={inputId}
              className={`${styles.input} ${errorState ? styles.error : undefined}`}
              type="text"
              placeholder={placeholder}
              defaultValue={dateValue}
              disabled
              ref={inputRef}
            />
            <Image
              className={`${styles.innerIcon} ${styles.calendarIcon}`}
              src="/assets/icons/calendar.svg"
              alt="calendarIcon"
              width={24}
              height={24}
              onClick={onClickCalendarIcon}
            />
            {calendarVisibility ? (
              <div className={styles.calendarWrapper}>
                <Calendar
                  date={today}
                  onValueChange={getDateValue}
                  reference={calendarRef}
                />
              </div>
            ) : null}
          </>
        ) : inputType === 'tag' ? (
          <>
            <input
              id={inputId}
              className={`${styles.input} ${styles.tag}`}
              type="text"
              placeholder={placeholder}
              onKeyDown={onKeydownTag}
              ref={inputRef}
            />
            <div className={styles.innerTags}>
              {Array.from(tags).map((value, index) => {
                return (
                  <TagIcon
                    key={Math.random()}
                    tagName={value}
                    tagStyleType="smallTag"
                    deleteOption
                    onValueChange={getDeleteOrder}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
      {inputType !== 'tag' && (
        <div
          className={styles.errorMessage}
          style={{ opacity: errorState ? 1 : 0 }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;
