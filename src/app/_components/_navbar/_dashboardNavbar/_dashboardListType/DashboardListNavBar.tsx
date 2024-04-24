'use client';

import React, { useEffect } from 'react';
import Contour from '@/app/_components/Contour';
import UserIcon from '@/app/_components/UserIcon';
import ImageTextButton from '@/app/_components/Button/ImageTextButton';
import Link from 'next/link';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import styles from '../DashboardTypeNavBar.module.css';
import { userResponse, registerActions } from '@/app/_slice/registerSlice';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
const DashboardListNavBar = () => {
  const onClickButton = () => {
    console.log(' ');
  };

  const dashBoardDetailDatas = useAppSelector(dashBoardDetailData);
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userResponse);
  const getUserInformation = () => {
    dispatch(registerActions.asynchFetchgetUserInfo());
  };
  useEffect(() => {
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
              imageUrl="/assets/icons/gear.svg"
              onClickEvent={onClickButton}
            />
          </Link>

          <ImageTextButton
            text="초대하기"
            imageUrl="/assets/icons/invite.svg"
            onClickEvent={onClickButton}
          />
        </div>
        <Contour />
        <div className={styles.sideMenuUserWrapper}>
          <UserIcon
            nickname={userData ? userData.nickname : ''}
            profileImageUrl={userData?.profileImageUrl}
          />
          <div className={styles.usernameWrapper}>{userData?.nickname}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardListNavBar;
