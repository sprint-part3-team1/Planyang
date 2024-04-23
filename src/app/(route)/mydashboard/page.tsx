'use client';

import { useEffect, useState } from 'react';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import {
  receivedInvitationActions,
  receivedInvitationData,
} from '@/app/_slice/receivedInvitationsSlice';
import { loginData } from '@/app/_slice/loginSlice';
import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import AddDashBoardButton from '@/app/_components/Button/AddDashBoardButton/AddDashBoardButton';
import DashBoardButton from '@/app/_components/Button/DashBoardButton/DashBoardButton';
import ArrowButton from '@/app/_components/Button/ArrowButton/ArrowButton';
import SideMenu from './_components/SideMenu';
import styles from './page.module.css';
import DashInvite from './_components/DashInvite';

export default function MyDashBoard({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userResponse);
  const dashBoardDatas = useAppSelector(dashBoardData);
  const receivedInvitationDatas = useAppSelector(receivedInvitationData);

  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLeftActive, setIsLeftActive] = useState<boolean>(false);
  const [isRightActive, setIsRightActive] = useState<boolean>(false);

  const handleLeftButtonClick = () => {
    // 좌측 버튼을 클릭했을 때의 동작 구현
    if (isLeftActive) {
      console.log('페이지 -1');
      setPage(page - 1);
    }
  };

  const handleRightButtonClick = () => {
    // 우측 버튼을 클릭했을 때의 동작 구현
    if (isRightActive) {
      console.log('페이지 +1');
      setPage(page + 1);
    }
  };

  // console.log(dashBoardDatas?.totalCount);
  // console.log(dashBoardDatas?.dashboards);
  // console.log(receivedInvitationDatas?.invitations);

  useEffect(() => {
    dispatch(registerActions.asynchFetchgetUserInfo());
    dispatch(dashBoardActions.asynchFetchGetDashBoard(page));
    dispatch(receivedInvitationActions.asyncGetReceivedInvitations());
  }, [dispatch, page]);

  useEffect(() => {
    if (dashBoardDatas) {
      setTotalCount(dashBoardDatas?.totalCount);
      console.log(totalCount);
      setTotalPages(Math.ceil(totalCount / 5));
    }
  }, [dashBoardDatas, totalCount]);

  useEffect(() => {
    if (page === 1 && totalPages === 1) {
      setIsLeftActive(false);
      setIsRightActive(false);
    } else if (page === 1 && totalPages > page) {
      setIsLeftActive(false);
      setIsRightActive(true);
    } else if (page > 1 && page < totalPages) {
      setIsLeftActive(true);
      setIsRightActive(true);
    } else if (page === totalPages) {
      setIsLeftActive(true);
      setIsRightActive(false);
    }
  }, [page, totalPages]);

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
          <span>
            {totalPages} 페이지 중 {page} 페이지
          </span>
          <ArrowButton
            isLeftActive={isLeftActive}
            isRightActive={isRightActive}
            onLeftButtonClick={handleLeftButtonClick}
            onRightButtonClick={handleRightButtonClick}
          />
        </div>
        <DashInvite inviteData={receivedInvitationDatas?.invitations} />
      </div>
    </div>
  );
}
