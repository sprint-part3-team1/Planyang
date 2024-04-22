'use client';

import React, { useEffect } from 'react';
import { userResponse, registerActions } from '@/app/_slice/registerSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import {
  dashBoardDetailData,
  dashBoardDetailActions,
} from '@/app/_slice/dashBoardDetail';

const DashBoardDetailLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userResponse);
  const dashBoardDetailDatas = useAppSelector(dashBoardDetailData);
  useEffect(() => {
    dispatch(
      dashBoardDetailActions.asyncFetchGetDashBoardDetail({
        dashBoardId: params.id,
      }),
    );
    dispatch(registerActions.asynchFetchgetUserInfo());
  }, [dispatch]);

  return (
    <div style={{ width: '100%' }}>
      <DashboardListNavBar
        nickname={userData ? userData.nickname : ''}
        profileImageUrl={userData?.profileImageUrl}
        boardId={params.id}
        dashBoardTitle={dashBoardDetailDatas?.title}
      />
      {children}
    </div>
  );
};

export default DashBoardDetailLayout;
