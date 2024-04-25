import React from 'react';
import LoadingIcon from '@/../public/assets/images/loading.svg';
import styles from './Loading.module.css';

const page = () => {
  return (
    <div className={styles.container}>
      <LoadingIcon />
    </div>
  );
};

export default page;
