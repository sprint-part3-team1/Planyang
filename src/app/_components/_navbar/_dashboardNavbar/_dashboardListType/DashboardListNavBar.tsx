'use client';

import React, { useEffect } from 'react';
import Contour from '@/app/_components/Contour';
import UserIcon from '@/app/_components/UserIcon';
import Link from 'next/link';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { userResponse, registerActions } from '@/app/_slice/registerSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import styles from '../DashboardTypeNavBar.module.scss';

const DashboardListNavBar = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userResponse);

  useEffect(() => {
    const getUserInformation = async () => {
      dispatch(registerActions.asynchFetchgetUserInfo());
    };
    getUserInformation();
  }, [dispatch]);

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navBarTitleWrapper}>
        {/* {dashBoardDetailDatas?.title} */}내 대시보드
      </div>
      <div className={styles.sideMenuWrapper}>
        <Contour />

        <div className={styles.sideMenuUserWrapper}>
          <Link href="/mypage">
            <UserIcon
              nickname={userData.data ? userData.data.nickname : ''}
              profileImageUrl={userData.data?.profileImageUrl}
            />
          </Link>
          <Link href="/mypage">
            <div className={styles.usernameWrapper}>
              {userData.data ? userData.data.nickname : ''}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardListNavBar;
