'use client';

import { useEffect } from 'react';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import AddDashBoardButton from '@/app/_components/Button/AddDashBoardButton/AddDashBoardButton';
import DashBoardButton from '@/app/_components/Button/DashBoardButton/DashBoardButton';
import SideMenu from './_components/SideMenu';
import styles from './page.module.css';
import DashInvite from './_components/DashInvite';

export default function MyDashBoard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(registerActions.asynchFetchgetUserInfo());
    dispatch(dashBoardActions.asynchFetchGetDashBoard());
  }, []);

  // 현재 로그인한 유저의 정보가 담긴 데이터 입니다 getMyInformation 함수를 통해 데이터를 불러옵니다
  const userData = useAppSelector(userResponse);

  // 대시보드 데이터 입니다
  const dashBoardDatas = useAppSelector(dashBoardData);
  console.log(dashBoardDatas?.dashboards);

  return (
    <div>
      <DashboardListNavBar
        nickname={userData ? userData.nickname : ''}
        profileImageUrl={userData?.profileImageUrl}
      />
      <SideMenu dashBoardData={dashBoardDatas?.dashboards} />
      <div className={styles.content}>
        <div className={styles.dashBoardButtons}>
          <AddDashBoardButton />
          {dashBoardDatas?.dashboards.map((dashBoard, index) => {
            return (
              <DashBoardButton
                key={index}
                color={dashBoard.color}
                createdByMe={dashBoard.createdByMe}
                title={dashBoard.title}
              />
            );
          })}
        </div>
        <DashInvite />
      </div>
    </div>
  );
}
