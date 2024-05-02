'use client';

import React, { useEffect } from 'react';
import LoadingIcon from '@/../public/assets/images/loading.svg';
import styles from './loading.module.css';

const Loading = () => {
  useEffect(() => {
    // 페이지가 처음 로드될 때 한 번만 새로고침 수행
    window.location.reload();
  }, []);
  return (
    <div className={styles.container}>
      <LoadingIcon />
    </div>
  );
};

export default Loading;
