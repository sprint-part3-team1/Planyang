'use client';

import React, { useState } from 'react';
import Input from '@/app/_components/Input';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from './ModalContainer';
import styles from './NewDashboardModal.module.css';
import CheckCancleButton from './CheckCancleButton';
import CheckIcon from '../../../../public/assets/icons/checkIcon';

function NewDashboardModal({ setOpenModalType }: ModalPropsType) {
  const produceButtonHandler = () => {
    /** 새로운 대시보드 생성 버튼을 누르면 실행되는 함수 작성 */
  };
  const colors = ['green', 'purple', 'orange', 'blue', 'pink'];
  const [dashboardColor, setDashboardColor] = useState<string>('green');

  return (
    <ModalContainer title="새로운 대시보드">
      <Input inputName="대시보드 이름" inputType="text" inputWidth={48} />
      <div className={styles.colorEclipseContainer}>
        {colors.map((color) => {
          return (
            <button
              key={color}
              className={`${styles.colorEclipse} ${styles[color]}`}
              onClick={() => setDashboardColor(color)}
              type="button"
            >
              {dashboardColor === color && <CheckIcon fill="white" />}
            </button>
          );
        })}
      </div>
      <CheckCancleButton
        checkText="생성"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={produceButtonHandler}
      />
    </ModalContainer>
  );
}
export default NewDashboardModal;
