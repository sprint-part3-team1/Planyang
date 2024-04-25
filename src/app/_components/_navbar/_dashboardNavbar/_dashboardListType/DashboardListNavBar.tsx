'use client';

import React, { useEffect, useState } from 'react';
import Contour from '@/app/_components/Contour';
import UserIcon from '@/app/_components/UserIcon';
import ImageTextButton from '@/app/_components/Button/ImageTextButton';
import Link from 'next/link';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import { userResponse, registerActions } from '@/app/_slice/registerSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import styles from '../DashboardTypeNavBar.module.css';

const DashboardListNavBar = () => {
  const onClickButton = () => {
    console.log(' ');
  };

  const dashBoardDetailDatas = useAppSelector(dashBoardDetailData);
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
        {dashBoardDetailDatas?.title}
      </div>
      <div className={styles.sideMenuWrapper}>
        <div className={styles.sideMenuButtonWrapper}>
          <Link href={`/dashboard/${dashBoardDetailDatas?.id}/edit`}>
            <ImageTextButton
              text="관리"
              imageUrl="/assets/icons/setting.svg"
              onClickEvent={onClickButton}
            />
          </Link>

          <ImageTextButton
            text="초대하기"
            imageUrl="/assets/icons/vector.svg"
            onClickEvent={onClickButton}
          />
        </div>
        <Contour />
        <div className={styles.sideMenuUserWrapper}>
          <UserIcon
            nickname={userData.data ? userData.data.nickname : ''}
            profileImageUrl={userData.data?.profileImageUrl}
          />
          <div className={styles.usernameWrapper}>
            {userData.data ? userData.data.nickname : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardListNavBar;
