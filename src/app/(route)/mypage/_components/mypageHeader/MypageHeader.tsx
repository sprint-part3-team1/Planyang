import React from 'react';
import UserIcon from '@/app/_components/UserIcon';
import styles from './MypageHeader.module.scss';

const MypageHeader = ({
  nickName,
  profileImage,
}: {
  nickName: string;
  profileImage: string | null;
}) => {
  return (
    <div className={styles.container}>
      <p id={styles.title}>계정관리</p>
      {nickName && (
        <div className={styles.userNameDiv}>
          <UserIcon nickname={nickName} profileImageUrl={profileImage} />
          <p id={styles.useName}>{nickName}</p>
        </div>
      )}
    </div>
  );
};

export default MypageHeader;
