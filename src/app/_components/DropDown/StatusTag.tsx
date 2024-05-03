import React from 'react';
import { StatusTagPropsType } from '@/app/_types/dropdownProps';
import styles from './StatusTag.module.css';

const StatusTag = ({ status }: StatusTagPropsType) => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.eclipse} />
        <p className={styles.statusText}>{status} </p>
      </div>
    </div>
  );
};
export default StatusTag;
