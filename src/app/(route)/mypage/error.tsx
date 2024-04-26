'use client';

import React from 'react';
import styles from '@/app/error.module.css';

interface Props {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
  console.log('Error: ', error);

  return (
    <div className={styles.container}>
      <h1 className={styles.errorText}>ERROR</h1>
      <p className={styles.contentText}> 예상치 못한 오류가 발생했습니다.</p>
      <button
        type="button"
        className={styles.retryButton}
        onClick={() => reset()}
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorPage;
