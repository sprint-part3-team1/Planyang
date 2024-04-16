'use client';

import React, { useState } from 'react';
import CheckCancelButton from '@/app/_components/modal/CheckCancelButton';
import { ModalPropsType } from '@/app/_types/commonTypes';
import Input from '@/app/_components/Input';
import Image from 'next/image';
import styles from './NewDashboardModal.module.css';

function NewDashboardModal({ openModal, setOpenModal }: ModalPropsType) {
  const title = '새로운 대시보드';
  const colors = ['green', 'purple', 'orange', 'blue', 'pink'];
  const [dashboardColor, setDashboardColor] = useState<string>('green');

  return (
    <div className={styles.container}>
      <p id={styles.title}>{title}</p>
      {/* <p id={styles.dashBaordNameinputTitle}>대시보드 이름</p> */}
      <Input inputName="대시보드 이름" inputType="text" inputWidth={484} />
      <div className={styles.colorEclipseContainer}>
        {colors.map((color) => {
          return (
            <button
              key={color}
              className={`${styles.colorEclipse} ${styles[color]}`}
              onClick={() => setDashboardColor(color)}
              type="button"
            >
              {dashboardColor === color && (
                <Image fill src="/icons/checkIcon.svg" alt="체크 아이콘" />
              )}
            </button>
          );
        })}
      </div>
      <CheckCancelButton openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}
export default NewDashboardModal;
