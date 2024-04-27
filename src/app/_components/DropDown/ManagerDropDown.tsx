import React, { useState, useEffect, useRef } from 'react';
import { DropDownPropsType } from '@/app/_types/dropdownProps';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { memberActions, memberData } from '@/app/_slice/memberSlice';
import { useParams } from 'next/navigation';
import styles from './ManagerDropDown.module.css';
import ArrowDown from '../../../../public/assets/icons/arrowDown.svg';
import CheckIcon from '../../../../public/assets/icons/checkIcon';
import CloseIcon from '../../../../public/assets/icons/close';
import UserIcon from '../UserIcon';

const ManagerDropDown = ({ title, setClickedMember }: DropDownPropsType) => {
  const dispatch = useAppDispatch();
  const memberDataList = useAppSelector(memberData);

  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedDivIndex, setSelectedDivIndex] = useState(-1);
  const MANAGERS: string[] = [];
  const [managerNames, setManagerNames] = useState(MANAGERS);
  const [managerNamesearch, setManagerNameSearch] = useState('');

  const params = useParams();

  let filteredMangers: string[] = [];
  memberDataList?.members.forEach((member) => {
    MANAGERS.push(member.nickname);
  });

  const handleDivClick = (index: number) => {
    setSelectedDivIndex(index);

    if (setClickedMember && memberDataList && memberDataList.members[index]) {
      setClickedMember(memberDataList.members[index]);
    }
  };

  const onchangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setManagerNameSearch(value);
    filteredMangers = MANAGERS.filter((manager) =>
      manager.includes(managerNamesearch),
    );
    setIsDropDown(true);
    setManagerNames(filteredMangers);
  };

  const resetInput = () => {
    setManagerNameSearch('');
    setSelectedDivIndex(-1);
    setClickedMember?.(null);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        await dispatch(
          memberActions.asyncGetMembers({
            dashboardId: Number(params.id),
            page: 1,
          }),
        );
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

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
