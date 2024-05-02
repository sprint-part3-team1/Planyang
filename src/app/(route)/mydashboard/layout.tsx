'use client';

import React, { useEffect, useState } from 'react';

import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import useAppSelector from '@/app/_hooks/useAppSelector';
import Link from 'next/link';
import SideMenu from './_components/SideMenu';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const userData = useAppSelector(userResponse);
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
        <>
          <div style={{ fontSize: '100px' }}>로그인이 필요합니다</div>
          <div>
            <Link href="/login">
              <button>로그인 하러가기</button>
            </Link>
            <Link href="/">
              <button>메인 페이지로</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
