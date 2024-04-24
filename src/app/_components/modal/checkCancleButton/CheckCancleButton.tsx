import React from 'react';
import { CheckCancelButtonPropType } from '@/app/_types/modalProps';
import modalTypes from '@/app/constants/modalTypes';
import styles from './CheckCancleButton.module.css';

const CheckCancleButton = ({
  deleteMode,
  checkText,
  cancelText,
  setOpenModalType,
  checkButtonHandler,
}: CheckCancelButtonPropType) => {
  const cancelButtonText = cancelText ?? '취소';
  const onCancelButtonHandler = () => {
    setOpenModalType('');
  };

  const deleteButtonHandler = () => {
    setOpenModalType(modalTypes.deleteColumnCheck);
  };
  return (
    <div className={styles.deleteModeContainer}>
      {deleteMode && (
        <button
          type="button"
          className={styles.deleteButton}
          onClick={deleteButtonHandler}
        >
          <p id={styles.deleteText}>삭제하기</p>
        </button>
      )}
      <div className={styles.buttonContainer}>
        {cancelButtonText === '' || (
          <button
            type="button"
            className={`${styles.button} ${styles.cancleButton}`}
            onClick={onCancelButtonHandler}
          >
            {cancelButtonText}
          </button>
        )}
        <button
          type="button"
          className={`${styles.button} ${styles.checkButton}`}
          onClick={checkButtonHandler}
        >
          {checkText}
        </button>
      </div>
    </div>
  );
};
export default CheckCancleButton;
