'use client';

import React, { useEffect, useRef, useState } from 'react';
import { InputProps } from '@/app/_types/InputProps';
import Image from 'next/image';
import Calendar from '@/app/_components/Calendar';
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
  dueDateValue,
  tagInputValue,
  setDueDateValue,
  setTagInputValue,
}: InputProps) => {
  const INVISIBLE_ICON_SRC = '/assets/icons/invisible.svg';
  const VISIBLE_ICON_SRC = '/assets/icons/visible.svg';
  const calendarRef = useRef<HTMLDivElement>(null);

  const initialTagValue = new Set(tagInputValue) || new Set<string>();

  const [tags, setTags] = useState<any>(initialTagValue);
  const [visibilityIcon, setVisibilityIcon] = useState(true);
  const [calendarVisibility, setCalendarVisibility] = useState(false);
  const [today, setToday] = useState(new Date());

  const initialDateValue =
    dueDateValue ||
    (() => {
<<<<<<< HEAD
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 00:00:00`;
=======
      return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')} 00:00`;
>>>>>>> edd4922b8f4552b3bedaf95c119dd754c6ba2251
    });

  const [dateValue, setDateValue] = useState(initialDateValue);

  const customWidth =
    inputWidth !== '100%'
      ? {
          width: `${inputWidth}rem`,
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

<<<<<<< HEAD
      if (setTagInputValue) {
        const newTags = new Set<string>(tags);
        newTags.add(value);
        e.currentTarget.value = '';
        setTags(newTags);
        setTagInputValue(Array.from(newTags));
=======
      const newTags = new Set(tags);
      newTags.add(value);
      e.currentTarget.value = '';
      setTags(newTags);
      if (setTagInputValue) {
        setTagInputValue([...newTags]);
>>>>>>> edd4922b8f4552b3bedaf95c119dd754c6ba2251
      }
    }
  };

  const getDateValue = (value: string) => {
    let date = value.split(' ').at(0);

    if (date !== undefined) {
      let [year, month, day] = date.split('-').map((x) => parseInt(x));

      console.log(date);

      setDateValue(value);
      setToday(new Date(year, month - 1, day, 0, 0, 0));
      setCalendarVisibility(false);
    }
  };

  const getDeleteOrder = (value: string) => {
<<<<<<< HEAD
    if (setTagInputValue) {
      const newTags = new Set<string>(tags);
      newTags.delete(value);
      setTags(newTags);
      setTagInputValue(Array.from(newTags));
=======
    const newTags = new Set(tags);
    newTags.delete(value);
    setTags(newTags);
    if (setTagInputValue) {
      setTagInputValue([...newTags]);
>>>>>>> edd4922b8f4552b3bedaf95c119dd754c6ba2251
    }
  };

  const setInputType = () => {
    if (inputType === 'text') return 'text';

    if (visibilityIcon) {
      return 'password';
    }
    return 'text';
  };

  useOutsideClick(calendarRef, () => {
    setCalendarVisibility(false);
  });

  useEffect(() => {
    if (inputRef !== null && inputRef.current.id === 'calendar') {
      inputRef.current.value = dateValue;
      setDueDateValue?.(dateValue);
    }
  }, [today]);

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
              id="calendar"
              className={`${styles.input} ${errorState ? styles.error : undefined}`}
              type="text"
              placeholder={placeholder}
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
              {(Array.from(tags || []) as string[]).map((value: string) => {
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
