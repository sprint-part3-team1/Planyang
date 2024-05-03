import React from 'react';
import styles from './ManagerInfoBox.module.css';
import UserIcon from '../../UserIcon';

const ManagerInfoBox = ({
  managerName,
  managerProfileImageUrl,
  deadline,
}: {
  managerName: string;
  managerProfileImageUrl: string | null;
  deadline: string;
}) => {
  return (
    <div className={styles.managerInfoDiv}>
      <div className={styles.innerContainer}>
        <p className={styles.title}>담당자</p>
        <div className={styles.managerNameDiv}>
          <UserIcon
            nickname={managerName}
            profileImageUrl={managerProfileImageUrl}
          />
          <p>{managerName}</p>
        </div>
      </div>
      <div className={styles.innerContainer}>
        <p className={styles.title}>마감일</p>
        <div className={styles.deadlineDiv}>
          <p>{deadline}</p>
        </div>
      </div>
    </div>
  );
};

export default ManagerInfoBox;
