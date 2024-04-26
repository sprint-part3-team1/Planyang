'use client';

import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import React, { ReactNode, useEffect } from 'react';
import { dashBoardDetailActions } from '@/app/_slice/dashBoardDetail';
import useAppDispatch from '@/app/_hooks/useAppDispatch';

import { columnActions } from '@/app/_slice/columnSlice';

const DashBoardDetailLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchDashboardDetail = async () => {
      try {
        await dispatch(
          dashBoardDetailActions.asyncFetchGetDashBoardDetail({
            dashBoardId: Number(params.id),
          }),
        );
      } catch (error) {
        console.error('Error fetching dashboard detail:', error);
      }
    };

    const fetchColumns = async () => {
      try {
        await dispatch(
          columnActions.asyncFetchGetColumn({ dashboardId: Number(params.id) }),
        );
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    fetchDashboardDetail();
    fetchColumns();
  }, [params.id, dispatch]);

  return (
    <div style={{ width: '100%' }}>
      <DashboardListNavBar
      // nickname={userData ? userData.nickname : ''}
      // profileImageUrl={userData?.profileImageUrl}
      />
      {children}
    </div>
  );
};

export default DashBoardDetailLayout;
