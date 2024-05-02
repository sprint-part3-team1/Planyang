'use client';

import React, { useState, useEffect } from 'react';
import Contour from '@/app/_components/Contour';
import UserIcon from '@/app/_components/UserIcon';
import ImageTextButton from '@/app/_components/Button/ImageTextButton';
import Image from 'next/image';
import UserIconList from '@/app/_components/UserIconList';
import { DashboardNavBarProps } from '@/app/_types/DashboardNavBarProps';
import Link from 'next/link';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import MODAL_TYPES from '@/app/constants/modalTypes';
import { useDispatch } from 'react-redux';
import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import useAppSelector from '@/app/_hooks/useAppSelector';
import { memberActions, memberData } from '@/app/_slice/memberSlice';
import styles from '../DashboardTypeNavBar.module.scss';

const DashboardNavBar = ({
  createdByMe,
  dashboardTitle,
  boardId,
}: DashboardNavBarProps) => {
  const [openModalType, setOpenModalType] = useState('');
  const membersInfo = useAppSelector(memberData);
  const onClickButton = () => {
    setOpenModalType(MODAL_TYPES.inviteByEmail);
  };

  const dispatch = useDispatch();
  const userData = useAppSelector(userResponse);
  useEffect(() => {
    const getUserInformation = async () => {
      dispatch(registerActions.asynchFetchgetUserInfo());
    };

    const getMemberInformation = async () => {
      dispatch(memberActions.asyncGetMembers({ boardId, page: 1 }));
    };
    getUserInformation();
    getMemberInformation();
  }, [dispatch]);

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
          {createdByMe && (
            <Link href={`/dashboard/${boardId}/edit`}>
              <ImageTextButton
                text="관리"
                imageUrl="/assets/icons/setting.svg"
              />
            </Link>
          )}

          <ImageTextButton
            text="초대하기"
            imageUrl="/assets/icons/vector.svg"
            onClickEvent={onClickButton}
          />
          <ModalPortal
            openModalType={openModalType}
            setOpenModalType={setOpenModalType}
          />
        </div>

        <UserIconList totalCount={membersInfo?.totalCount || 1} />
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
              {userData.data?.nickname}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
