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
  const dispatch = useAppDispatch();
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEditDashBoardName(e.target.value);
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
    editDashboard(dashBoardDatas?.id, editDashBoardName, color);
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
      <div className={styles.editBtn}>
        <EditButton editButtonHandler={editButtonHandler} />
      </div>
    </div>
  );
};

export default EditDashName;
