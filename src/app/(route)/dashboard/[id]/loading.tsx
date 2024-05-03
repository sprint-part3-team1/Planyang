'use client';

import React, { useEffect } from 'react';
import LoadingIcon from '@/../public/assets/images/loading.svg';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <LoadingIcon />
    </div>
  );
};

export default Loading;
