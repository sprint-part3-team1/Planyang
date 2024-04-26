'use client';

import React from 'react';
import styles from '../DashboardTypeNavBar.module.css';
import Contour from '@/app/_components/Contour';
import UserIcon from '@/app/_components/UserIcon';
import ImageTextButton from '@/app/_components/Button/ImageTextButton';
import Image from 'next/image';
import UserIconList from '@/app/_components/UserIconList';
import { DashboardNavBarProps } from '@/app/_types/DashboardNavBarProps';
import Link from 'next/link';

const DashboardNavBar = ({
  membersInfo,
  createdByMe,
  dashboardTitle,
  nickname,
  profileImageUrl,
}: DashboardNavBarProps) => {
  const onClickButton = () => {
    console.log(' ');
  };

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navBarInfoWrapper}>
        <div className={styles.navBarTitleWrapper}>{dashboardTitle}</div>
        {createdByMe && (
          <Image
            src="/assets/icons/crown.svg"
            alt="crownIcon"
            width={20}
            height={20}
          />
        )}
      </div>
      <div className={styles.sideMenuWrapper}>
        <div className={styles.sideMenuButtonWrapper}>
          <ImageTextButton
            text="관리"
            imageUrl="/assets/icons/gear.svg"
            onClickEvent={onClickButton}
          />
          <ImageTextButton
            text="초대하기"
            imageUrl="/assets/icons/invite.svg"
            onClickEvent={onClickButton}
          />
        </div>
        <UserIconList
          members={membersInfo.members}
          totalCount={membersInfo.totalCount}
        ></UserIconList>
        <Contour />
        <div className={styles.sideMenuUserWrapper}>
          <UserIcon nickname={nickname} profileImageUrl={profileImageUrl} />
          <Link href="/mypage">
            <div className={styles.usernameWrapper}>{nickname}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
