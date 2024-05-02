import React, { useState, useEffect, useRef } from 'react';
import { DropDownPropsType } from '@/app/_types/dropdownProps';
import { columnActions, columnData } from '@/app/_slice/columnSlice';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import styles from './StatusDropDown.module.css';
import ArrowDown from '../../../../public/assets/icons/arrowDown.svg';
import CheckIcon from '../../../../public/assets/icons/checkIcon';
import StatusTag from './StatusTag';
import useAppDispatch from './../../_hooks/useAppDispatch';

const StatusDropDown = ({
  title,
  setStatusColumnId,
  columnId,
}: DropDownPropsType) => {
  const dispatch = useAppDispatch()
  const columnDataList = useAppSelector(columnData);

  const initialStatus = columnDataList?.data?.findIndex(
    (column) => Number(column.id) === Number(columnId),
  );

  const params = useParams();
  const [isDropDown, setIsDropDown] = useState(false);
  const [selectedDivIndex, setSelectedDivIndex] = useState(initialStatus);
  const STATUS = columnDataList?.data ? columnDataList?.data.map((column) => column.title) : [];

  const handleDivClick = (index: number) => {
    let statusColumnId = -1;
    columnDataList?.data?.forEach((column) => {
      if (column.title === STATUS[index]) statusColumnId = column.id;
    });
    setSelectedDivIndex(index);
    setStatusColumnId && setStatusColumnId(statusColumnId);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchColumns = async () => {
    try {
      await dispatch(
        columnActions.asyncFetchGetColumn({ dashboardId: Number(params.id) }),
      );
    } catch (error) {
      console.error('Error fetching columns:', error);
    }
  };

  useEffect(() => {
    fetchColumns();
  }, [params.id, dispatch]);

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
    <div className={styles.container} ref={dropdownRef}>
      <p id={styles.title}>{title}</p>
      <div
        className={`${styles.drowDownInput} ${isDropDown && styles.pressed}`}
      >
        {
          selectedDivIndex && (
            <StatusTag status={STATUS[selectedDivIndex]} />
          )
        }
        <button
          type="button"
          className={styles.drowDownButton}
          onClick={() => setIsDropDown(!isDropDown)}
        >
          {' '}
          <ArrowDown />
        </button>
      </div>
      <div
        className={`${styles.dropDownDiv} ${isDropDown ? styles.open : styles.close}`}
      >
        {STATUS &&
          STATUS.map((status, index) => {
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
  );
};

export default StatusDropDown;
