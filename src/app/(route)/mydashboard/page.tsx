'use client';

import { useEffect } from 'react';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import {
  receivedInvitationActions,
  receivedInvitationData,
} from '@/app/_slice/receivedInvitationsSlice';
import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import AddDashBoardButton from '@/app/_components/Button/AddDashBoardButton/AddDashBoardButton';
import DashBoardButton from '@/app/_components/Button/DashBoardButton/DashBoardButton';
import ArrowButton from '@/app/_components/Button/ArrowButton/ArrowButton';
import SideMenu from './_components/SideMenu';
import styles from './page.module.css';
import DashInvite from './_components/DashInvite';

export default function MyDashBoard() {
  const dispatch = useAppDispatch();

  // 현재 로그인한 유저의 정보가 담긴 데이터 입니다 getMyInformation 함수를 통해 데이터를 불러옵니다
  const userData = useAppSelector(userResponse);

  // 대시보드 데이터 입니다
  const dashBoardDatas = useAppSelector(dashBoardData);
  console.log(dashBoardDatas?.dashboards);

  // 내가 초대를 받은 목록의 데이터입니다
  const receivedInvitationDatas = useAppSelector(receivedInvitationData);
  console.log(receivedInvitationDatas?.invitations);

  const handleLeftButtonClick = () => {
    // 좌측 버튼을 클릭했을 때의 동작 구현
    console.log('좌측버튼');
  };

  const handleRightButtonClick = () => {
    // 우측 버튼을 클릭했을 때의 동작 구현
    console.log('우측버튼');
  };

  useEffect(() => {
    dispatch(registerActions.asynchFetchgetUserInfo());
    dispatch(dashBoardActions.asynchFetchGetDashBoard());
    dispatch(receivedInvitationActions.asyncGetReceivedInvitations());
  }, [dispatch]);

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
        <div className={styles.paginationFrame}>
          <span>1페이지 중 1</span>
          <ArrowButton
            isActive
            onLeftButtonClick={handleLeftButtonClick}
            onRightButtonClick={handleRightButtonClick}
          />
        </div>
        <DashInvite inviteData={receivedInvitationDatas?.invitations} />
      </div>
    </div>
  );
}
