'use client';

import React from 'react';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardData } from '@/app/_slice/dashBoardSlice';

import SideMenu from '../mydashboard/_components/SideMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dashBoardDatas = useAppSelector(dashBoardData);

  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      {children}
    </div>
  );
}
