'use client';

import React, { useState, useEffect } from 'react';
import EditDashName from '@/app/(route)/mydashboard/_components/EditDashName';
import TableInvite from '@/app/(route)/mydashboard/_components/TableInvite';
import TableMember from '@/app/(route)/mydashboard/_components/TableMember';
import BackDashBoardButton from '@/app/_components/Button/BackDashBoardButton/BackDashBoardButton';
import DeleteDashBoardButton from '@/app/_components/Button/DeleteDashBoardButton/DeleteDashBoardButton';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import Link from 'next/link';
import styles from './style/page.module.css';

const DashBoardeditPage = () => {
  // const [loading, setLoading] = useState(true);
  const dashboardDetailDatas = useAppSelector(dashBoardDetailData);

  // useEffect(() => {
  //   if (dashboardDetailDatas) {
  //      setLoading(false);
  //   }
  // }, [dashboardDetailDatas]);

  // if (loading) {
  //   // 로딩 중인 경우에는 "Loading..."이라는 문구를 보여줍니다.
  //   return <div style={{ fontSize: '50px' }}>Loading...</div>;
  // }

  // 로딩이 완료된 후에 대시보드 생성자 여부에 따라 다른 화면을 렌더링합니다.
  return (
    <div className={styles.container}>
      <BackDashBoardButton />
      <EditDashName />
      <TableMember />
      <TableInvite />
      <DeleteDashBoardButton />
    </div>
  );
};

export default DashBoardeditPage;
