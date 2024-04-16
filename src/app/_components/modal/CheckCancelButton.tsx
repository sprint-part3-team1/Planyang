import React from 'react';
import { CheckCancleButtonPropsType } from '@/app/_types/modalProps';
import styles from './CheckCancelButton.module.css';

export default function CheckCancelButton({
  setOpenModal,
  CheckString,
  CancleString,
}: CheckCancleButtonPropsType) {
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
        {CancleString}
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.checkButton}`}
      >
        {CheckString}
      </button>
    </div>
  );
}
