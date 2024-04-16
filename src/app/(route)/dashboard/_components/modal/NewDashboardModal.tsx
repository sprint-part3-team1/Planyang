'use client';

import React, { useState } from 'react';
import CheckCancelButton from '@/app/_components/modal/CheckCancelButton';
import { ModalPropsType } from '@/app/_types/commonTypes';
import Image from 'next/image';
import styles from './NewDashboardModal.module.css';

function NewDashboardModal({ openModal, setOpenModal }: ModalPropsType) {
  const title = '새로운 대시보드';
  const colors = ['green', 'purple', 'orange', 'blue', 'pink'];
  const [dashboardColor, setDashboardColor] = useState<string>('');

  return (
    <div className={styles.container}>
      <p id={styles.title}>{title}</p>
      <p id={styles.dashBaordNameinputTitle}>대시보드 이름</p>
      <input className={styles.dashboardNameInput} />
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
