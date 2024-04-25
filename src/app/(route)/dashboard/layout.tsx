'use client';

import React, { useEffect } from 'react';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import { userResponse, registerActions } from '@/app/_slice/registerSlice';
import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import { usePathname } from 'next/navigation';
import { dashBoardDetailActions } from '@/app/_slice/dashBoardDetail';
import SideMenu from '../mydashboard/_components/SideMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const dashBoardDatas = useAppSelector(dashBoardData);

  const pathName = usePathname();

  useEffect(() => {
    // URL에서 숫자 부분 추출
    const regex = /\/dashboard\/(\d+)/;
    const match = pathName.match(regex);
    if (match) {
      const number = match[1];

      dispatch(
        dashBoardDetailActions.asyncFetchGetDashBoardDetail({
          dashBoardId: number,
        }),
      );
    }
  }, [pathName]);

  useEffect(() => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard(1));
    dispatch(registerActions.asynchFetchgetUserInfo());
  }, [dispatch]);
  return (
    <div style={{ display: 'flex' }}>
      <SideMenu dashBoardData={dashBoardDatas?.dashboards} />
      {children}
    </div>
  );
}
