'use client';

import React, { useEffect } from 'react';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import { userResponse } from '@/app/_slice/registerSlice';
import useAppSelector from '@/app/_hooks/useAppSelector';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { registerActions } from '@/app/_slice/registerSlice';
import { loginActions } from '@/app/_slice/loginSlice';
import SideMenu from '../mydashboard/_components/SideMenu';
import MypageHeader from './_components/mypageHeader/MypageHeader';
import ChangePasswordDiv from './_components/changePasswordDIv/ChangePasswordDiv';
import LeftArrow from '../../../../public/assets/icons/leftArrow.svg';
import styles from './page.module.css';
import EditProfileDiv from './_components/editProfileDiv/EditProfileDiv';

const Page = () => {
  const dispatch = useAppDispatch();

  const userData = useAppSelector(userResponse);
  console.log(userData);

  const getMyInformation = () => {
    dispatch(registerActions.asynchFetchgetUserInfo());
  };

  const submitLogin = (email: string, password: string) => {
    dispatch(
      loginActions.asynchFetchSignIn({
        email,
        password,
      }),
    ).then(() => {
      getMyInformation();
    });
  };

  useEffect(() => {
    submitLogin('planyang2@test.com', 'AS123456');
  }, []);

  const viewportSize: string = useGetViewportSize();

  const EditProfileDivInputWidthOnViewport = {
    [VIEWPORT_TYPES.deskTop]: 36.6,
    [VIEWPORT_TYPES.tablet]: 29,
    [VIEWPORT_TYPES.mobile]: 24.4,
  };

  const changePasswordDivInputWidthOnViewport = {
    [VIEWPORT_TYPES.deskTop]: 56.4,
    [VIEWPORT_TYPES.tablet]: 48.6,
    [VIEWPORT_TYPES.mobile]: 24.4,
  };

  const EditProfileinputWidth =
    EditProfileDivInputWidthOnViewport[viewportSize];
  const changePasswordInputWidth =
    changePasswordDivInputWidthOnViewport[viewportSize];

  return (
    <div>
      {userData && (
        <div>
          <SideMenu />
          <MypageHeader
            nickName={userData.nickname}
            profileImage={userData.profileImageUrl}
          />
          <div className={styles.container}>
            <div className={styles.goBackDiv}>
              <LeftArrow />
              돌아가기
            </div>
            <EditProfileDiv
              inputWidth={EditProfileinputWidth}
              email={userData.email}
              nickName={userData.nickname}
            />
            <ChangePasswordDiv inputWidth={changePasswordInputWidth} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
