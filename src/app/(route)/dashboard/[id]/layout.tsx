'use client';

import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import React, { ReactNode, useEffect } from 'react';
import { dashBoardDetailActions } from '@/app/_slice/dashBoardDetail';

const DashBoardDetailLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
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
