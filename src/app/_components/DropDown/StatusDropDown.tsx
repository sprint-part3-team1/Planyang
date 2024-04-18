import React, { useState, useEffect, useRef } from 'react';
import { DropDownPropsType } from '@/app/_types/dropdownProps';
import styles from './StatusDropDown.module.css';
import ArrowDown from '../../../../public/assets/icons/arrowDown.svg';
import CheckIcon from '../../../../public/assets/icons/checkIcon';
import StatusTag from './StatusTag';

const StatusDropDown = ({ title }: DropDownPropsType) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedDivIndex, setSelectedDivIndex] = useState(0);
  const STATUS = ['To Do', 'On Progress', 'Done'];

  const handleDivClick = (index: number) => {
    setSelectedDivIndex(index);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutSide);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [isDropDown]);

  return (
    <button
      type="button"
      className={styles.drowDownButton}
      onClick={() => setIsDropDown(!isDropDown)}
    >
      <div className={styles.container} ref={dropdownRef}>
        <p id={styles.title}>{title}</p>
        <div
          className={`${styles.drowDownInput} ${isDropDown && styles.pressed}`}
        >
          <StatusTag status={STATUS[selectedDivIndex]} />
          <ArrowDown />
        </div>
        <div
          className={`${styles.dropDownDiv} ${isDropDown ? styles.open : styles.close}`}
        >
          {STATUS.map((status, index) => {
            return (
              <button
                onClick={() => handleDivClick(index)}
                type="button"
                key={status}
                className={styles.choiceButton}
              >
                <div className={styles.choiceDiv}>
                  {' '}
                  {selectedDivIndex === index ? (
                    <CheckIcon fill="#787486" />
                  ) : (
                    <CheckIcon fill="none" />
                  )}
                  <StatusTag status={status} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </button>
  );
};

export default StatusDropDown;
