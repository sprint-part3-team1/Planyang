import React, { useState, useEffect, useRef } from 'react';
import { DropDownPropsType } from '@/app/_types/dropdownProps';
import styles from './ManagerDropDown.module.css';
import ArrowDown from '../../../../public/assets/icons/arrowDown.svg';
import CheckIcon from '../../../../public/assets/icons/checkIcon';
import CloseIcon from '../../../../public/assets/icons/close';
import UserIcon from '../UserIcon';

const ManagerDropDown = ({ title }: DropDownPropsType) => {
  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedDivIndex, setSelectedDivIndex] = useState(-1);
  const MANAGERS = ['배상욱', '배동철', '배민정', '김민정', '박민정', '플래냥'];
  const [managerNames, setManagerNames] = useState(MANAGERS);
  const [managerNamesearch, setManagerNameSearch] = useState('');

  const handleDivClick = (index: number) => {
    setSelectedDivIndex(index);
  };

  const onchangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setManagerNameSearch(value);
    const filteredMangers = MANAGERS.filter((manager) =>
      manager.includes(managerNamesearch),
    );
    setIsDropDown(true);
    setManagerNames(filteredMangers);
  };

  const resetInput = () => {
    setManagerNameSearch('');
    setSelectedDivIndex(-1);
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [isDropDown]);

  useEffect(() => {
    const filteredMangers = MANAGERS.filter((manager) =>
      manager.includes(managerNamesearch),
    );
    setManagerNames(filteredMangers);
  }, [managerNamesearch]);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <p id={styles.title}>{title}</p>
      <div
        className={`${styles.drowDownInput} ${isDropDown && styles.pressed}`}
      >
        {selectedDivIndex === -1 ? ( // 이름으로 검색할 때
          <input
            className={styles.managerNameInput}
            onChange={onchangeInputHandler}
            placeholder="이름을 입력해주세요"
            onFocus={() => setIsDropDown(true)}
          />
        ) : (
          <div className={styles.ManagerNameDiv}>
            <UserIcon nickname={MANAGERS[selectedDivIndex]} />
            {MANAGERS[selectedDivIndex]}
            <CloseIcon handleCloseClick={resetInput} />
          </div>
        )}
        <div className={styles.inputCloseDiv}>
          <button
            type="button"
            className={styles.drowDownButton}
            onClick={() => setIsDropDown(!isDropDown)}
          >
            {' '}
            <ArrowDown />
          </button>
        </div>
      </div>
      <div
        className={`${styles.dropDownDiv} ${isDropDown ? styles.open : styles.close}`}
      >
        {managerNames.map((name, index) => {
          return (
            <button
              onClick={() => handleDivClick(index)}
              type="button"
              key={name}
              className={styles.choiceButton}
            >
              <div className={styles.choiceDiv}>
                {' '}
                {selectedDivIndex === index ? (
                  <CheckIcon fill="#787486" />
                ) : (
                  <CheckIcon fill="none" />
                )}
                <UserIcon nickname={name} />
                {name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ManagerDropDown;
