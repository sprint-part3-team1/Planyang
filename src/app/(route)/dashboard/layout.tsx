'use client';

import React, { useState, useEffect } from 'react';

import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import Link from 'next/link';
import useAppSelector from '@/app/_hooks/useAppSelector';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import SideMenu from '../mydashboard/_components/SideMenu';
import styles from './layout.module.css';
import AccessError from '../mydashboard/_components/AccessError';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const userData = useAppSelector(userResponse);
  const dispatch = useAppDispatch();
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
  }, []);

  if (!isLoaded) {
    return null;
  }
  return (
    <div style={{ display: 'flex' }}>
      {userData.data ? (
        <>
          <div style={{ height: '100vh' }}>
            <SideMenu />
          </div>
          <div className={styles.childrenWrapper}>{children}</div>
        </>
      ) : (
        <AccessError />
      )}
    </div>
  );
}
