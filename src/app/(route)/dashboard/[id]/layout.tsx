'use client';

import React, { useEffect } from 'react';
import { userResponse, registerActions } from '@/app/_slice/registerSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';

const DashBoardDetailLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userResponse);
  useEffect(() => {
    dispatch(registerActions.asynchFetchgetUserInfo());
  }, [dispatch]);
  return (
    <div style={{ width: '100%' }}>
      <DashboardListNavBar
        nickname={userData ? userData.nickname : ''}
        profileImageUrl={userData?.profileImageUrl}
        boardId={params.id}
      />
      {children}
    </div>
  );
};

export default DashBoardDetailLayout;
