'use client';

import React, { useEffect } from 'react';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import { userResponse, registerActions } from '@/app/_slice/registerSlice';
import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import SideMenu from '../mydashboard/_components/SideMenu';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  const dispatch = useAppDispatch();

  // 현재 로그인한 유저의 정보가 담긴 데이터 입니다 getMyInformation 함수를 통해 데이터를 불러옵니다

  const dashBoardDatas = useAppSelector(dashBoardData);

  const userData = useAppSelector(userResponse);
  // 내가 초대를 받은 목록의 데이터입니다

  useEffect(() => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard());
    dispatch(registerActions.asynchFetchgetUserInfo());
  }, [dispatch]);
  return (
    <div style={{ display: 'flex' }}>
      <SideMenu dashBoardData={dashBoardDatas?.dashboards} />
      {children}
    </div>
  );
}
