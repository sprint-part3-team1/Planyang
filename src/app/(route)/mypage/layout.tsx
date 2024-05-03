'use client';

import { registerActions, userResponse } from '@/app/_slice/registerSlice';

import React, { useEffect, useState } from 'react';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardActions, dashBoardData } from '@/app/_slice/dashBoardSlice';
import Link from 'next/link';
import SideMenu from '../mydashboard/_components/SideMenu';
import styles from './layout.module.css';
import AccessError from '../mydashboard/_components/AccessError';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const dashBoardDatas = useAppSelector(dashBoardData);

  const userData = useAppSelector(userResponse);

  useEffect(() => {
    dispatch(dashBoardActions.asynchFetchGetDashBoard(1));
  }, [dispatch]);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(registerActions.asynchFetchgetUserInfo());
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (!isLoaded) {
    return null;
  }
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ height: '100vh' }}>
          <SideMenu />
        </div>
        <div className={styles.childrenWrapper}>{children}</div>
      </div>
    );
  }
  return <AccessError />;
}
