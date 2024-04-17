'use client';

import React, { useState, useEffect } from 'react';
import CancelButton from '@/app/_components/Button/CancelButton/CancelButton';
import InviteButton from '@/app/_components/Button/InviteButton/InviteButton';
import ArrowButton from '../../../_components/Button/ArrowButton/ArrowButton';
import styles from './TableInvite.module.css';

const TableInvite = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 렌더링 시 한 번 호출하여 초기 상태 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const emailData = [
    'codeitA@codeit.com',
    'codeitB@codeit.com',
    'codeitC@codeit.com',
    'codeitD@codeit.com',
    'codeitE@codeit.com',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span id={styles.titleInvite}>초대 내역</span>
        <div className={styles.pagination}>
          <span>1 페이지 중 1</span>
          <ArrowButton />
          {isMobile ? null : <InviteButton />}
        </div>
      </div>
      <div className={styles.email}>
        <span>이메일</span>
        {isMobile ? <InviteButton /> : null}
      </div>

      {emailData.map((email, index) => (
        <div key={index} className={styles.emailContainer}>
          <span id={styles.emailName}>{email}</span>
          <CancelButton />
        </div>
      ))}
    </div>
  );
};

export default TableInvite;
