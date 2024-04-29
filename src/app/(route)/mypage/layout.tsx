'use client';

import React, { useEffect } from 'react';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import SideMenu from '../mydashboard/_components/SideMenu';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  // 현재 로그인한 유저의 정보가 담긴 데이터 입니다 getMyInformation 함수를 통해 데이터를 불러옵니다
  const dashBoardDatas = useAppSelector(dashBoardData);

  // 내가 초대를 받은 목록의 데이터입니다

  useEffect(() => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard(1));
  }, [dispatch]);
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: '100vh' }}>
        <SideMenu dashBoardData={dashBoardDatas?.dashboards} />
      </div>
      <div className={styles.childrenWrapper}>
        {children}
      </div>
    </div>
  );
}

  <SideMenu />


