'use client';

import React, { useState } from 'react';
import Input from '@/app/_components/Input';
import Image from 'next/image';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from './ModalContainer';
import styles from './NewDashboardModal.module.css';

function NewDashboardModal({
  openModalType,
  setOpenModalType,
}: ModalPropsType) {
  const colors = ['green', 'purple', 'orange', 'blue', 'pink'];
  const [dashboardColor, setDashboardColor] = useState<string>('green');

  return (
    <ModalContainer
      title="새로운 대시보드"
      checkString="생성"
      cancelString="취소"
      openModalType={openModalType}
      setOpenModalType={setOpenModalType}
    >
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
    </ModalContainer>
  );
}
export default NewDashboardModal;
