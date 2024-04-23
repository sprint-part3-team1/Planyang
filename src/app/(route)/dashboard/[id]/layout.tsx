import DashboardListNavBar from '@/app/_components/_navbar/_dashboardNavbar/_dashboardListType/DashboardListNavBar';
import React, { ReactNode } from 'react';

const DashBoardDetailLayout = ({ children }: { children: ReactNode }) => {
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
