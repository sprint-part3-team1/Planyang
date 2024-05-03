import React from 'react';
import Link from 'next/link';
import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <p className={styles.errorName}>404 ERROR</p>
      <p className={styles.contentText}>
        페이지를 찾을 수 없거나 존재하지 않는 페이지 입니다.
        <br />
        입력하신 주소가 맞는지 다시 한번 확인해주세요.
      </p>
      <Link href="/" className={styles.homeLink}>
        홈으로 이동
      </Link>
    </div>
  );
};

export default NotFound;
