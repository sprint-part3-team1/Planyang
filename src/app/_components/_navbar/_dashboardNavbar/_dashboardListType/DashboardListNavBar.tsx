'use client';

import React from 'react';
import Contour from '@/app/_components/Contour';
import UserIcon from '@/app/_components/UserIcon';
import { DashboardListNavBarProps } from '@/app/_types/DashboardListNavBarProps';
import ImageTextButton from '@/app/_components/Button/ImageTextButton';
import Link from 'next/link';

import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import styles from '../DashboardTypeNavBar.module.css';

const DashboardListNavBar = ({
  nickname,
  profileImageUrl,
  boardId,
  dashBoardTitle,
}: DashboardListNavBarProps) => {
  const onClickButton = () => {
    console.log(' ');
  };

  // useEffect(() => {
  //   dispatch(
  //     dashBoardDetailActions.asyncFetchGetDashBoardDetail
  //   )
  // }, [dispatch]);

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navBarTitleWrapper}>{dashBoardTitle}</div>
      <div className={styles.sideMenuWrapper}>
        <div className={styles.sideMenuButtonWrapper}>
          <Link href={`/dashboard/${boardId}/edit`}>
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
          <UserIcon nickname={nickname} profileImageUrl={profileImageUrl} />
          <div className={styles.usernameWrapper}>{nickname}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardListNavBar;
