'use client';

import React, { useState, useEffect } from 'react';
import EditDashName from '@/app/(route)/mydashboard/_components/EditDashName';
import TableInvite from '@/app/(route)/mydashboard/_components/TableInvite';
import TableMember from '@/app/(route)/mydashboard/_components/TableMember';
import BackDashBoardButton from '@/app/_components/Button/BackDashBoardButton/BackDashBoardButton';
import DeleteDashBoardButton from '@/app/_components/Button/DeleteDashBoardButton/DeleteDashBoardButton';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import styles from './style/page.module.css';

const DashBoardeditPage = () => {
  const dashboardDetailDatas = useAppSelector(dashBoardDetailData);

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
