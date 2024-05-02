'use client';

import React, { useState, ChangeEvent } from 'react';
import EditButton from '@/app/_components/Button/EditButton/EditButton';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';

import DashboardColors from '@/app/_components/DashboardColors';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { dashBoardActions } from '@/app/_slice/dashBoardSlice';
import styles from './EditDashName.module.css';

export interface ColorBoxType {
  color: string;
  isChecked: boolean;
  id: number;
}
const EditDashName = () => {
  const dashBoardDatas = useAppSelector(dashBoardDetailData);
  const [dashboardColor, setDashboardColor] = useState<string>('green');

  const [editDashBoardName, setEditDashBoardName] = useState('');
  const [inputError, setInputError] = useState('');
  const dispatch = useAppDispatch();
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setEditDashBoardName(e.target.value);
      setInputError('');
    } else {
      setInputError('10자 이하로 글자를 입력해주세요.');
    }
  };

  const editDashboard = (dashBoardId: number, title: string, color: string) => {
    dispatch(
      dashBoardActions.asyncFetchUpdateDashBoard({
        dashBoardId,
        title,
        color,
      }),
    );
  };

  const editButtonHandler = () => {
    let color: string;
    switch (dashboardColor) {
      case 'green':
        color = '#7AC555';
        break;
      case 'purple':
        color = '#760DDE';
        break;
      case 'orange':
        color = '#FFA500';
        break;
      case 'blue':
        color = '#76A5EA';
        break;
      case 'pink':
        color = '#E876EA';
        break;
      default:
        color = '';
    }
    if (!inputError && editDashBoardName !== '' && dashBoardDatas?.id) {
      editDashboard(dashBoardDatas?.id, editDashBoardName, color);
    } else if (editDashBoardName === '') {
      setInputError('글자를 입력해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>{dashBoardDatas?.title}</span>

        <div className={styles.circleBox}>
          <DashboardColors
            dashboardColor={dashboardColor}
            setDashboardColor={setDashboardColor}
          />
        </div>
      </div>
      <span id={styles.inputTitle}>대시보드 이름</span>
      <input
        id={styles.input}
        value={editDashBoardName}
        onChange={(e) => {
          handleChangeInput(e);
        }}
      />
      <p style={{ color: 'red', fontWeight: 'bold', fontSize: '14px' }}>
        {inputError}
      </p>
      <div className={styles.editBtn}>
        <EditButton editButtonHandler={editButtonHandler} />
      </div>
    </div>
  );
};

export default EditDashName;
