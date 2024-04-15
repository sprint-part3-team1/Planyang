import React from 'react';

import styles from './CheckCancleButton.module.css';

export default function CheckCancelButton() {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={`${styles.button} ${styles.cancleButton}`}
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
