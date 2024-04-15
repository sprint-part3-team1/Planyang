import React from 'react';
import { ModalPropsType } from '@/app/_types/commonTypes';
import styles from './CheckCancleButton.module.css';

export default function CheckCancelButton({
  openModal, // 지금은 사용하지 않지만 혹시 몰라 추가해두었습니다.
  setOpenModal,
}: ModalPropsType) {
  const onCancelButtonHandler = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.button} ${styles.cancleButton}`}
        onClick={onCancelButtonHandler}
      >
        취소
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.checkButton}`}
      >
        생성
      </button>
    </div>
  );
}
