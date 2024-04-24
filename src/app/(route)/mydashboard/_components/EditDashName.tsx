'use client';

import React, { useState, ChangeEvent } from 'react';
import EditButton from '@/app/_components/Button/EditButton/EditButton';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';

import styles from './EditDashName.module.css';
import DashBoardEditCircle from './DashBoardEditCircle';

export interface ColorBoxType {
  color: string;
  isChecked: boolean;
  id: number;
}
const EditDashName = () => {
  const dashBoardDats = useAppSelector(dashBoardDetailData);

  const [colorBox, setColorBox]: [
    ColorBoxType[],
    React.Dispatch<React.SetStateAction<ColorBoxType[]>>,
  ] = useState([
    { color: '#7AC555', isChecked: false, id: 0 },
    { color: '#760DDE', isChecked: false, id: 1 },
    { color: '#FFA500', isChecked: false, id: 2 },
    { color: '#76A5EA', isChecked: false, id: 3 },
    { color: '#E876EA', isChecked: false, id: 4 },
  ]);
  console.log(colorBox);
  // 받아야 할 데이터 : 해당 대시보드의 이름, 색상정하는 컴포넌트 (임의의 이미지 대신에 )
  const dashBoardDatas = useAppSelector(dashBoardDetailData);
  const [checkColor, setCheckColor] = useState('');
  const [editDashBoardName, setEditDashBoardName] = useState('');
  console.log(checkColor);
  console.log(editDashBoardName);
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEditDashBoardName(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span>{dashBoardDatas?.title}</span>
        {/* 색상 이미지로 대체 필요 */}

        <div className={styles.circleBox}>
          {colorBox.map((item) => {
            return (
              <DashBoardEditCircle
                color={item.color}
                setCheckColor={setCheckColor}
                key={item.id}
              />
            );
          })}
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
        <EditButton
          checkColor={checkColor}
          editDashBoardName={editDashBoardName}
          boardId={dashBoardDats?.id}
        />
      </div>
    </div>
  );
};

export default EditDashName;
