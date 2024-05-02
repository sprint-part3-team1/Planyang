'use client';

import React, { useEffect, useState } from 'react';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import { userResponse, registerActions } from '@/app/_slice/registerSlice';
import useAppSelector from '@/app/_hooks/useAppSelector';
import useAppDispatch from '@/app/_hooks/useAppDispatch';

import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import MODAL_TYPES from '@/app/constants/modalTypes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginActions } from '@/app/_slice/loginSlice';
import MypageHeader from './_components/mypageHeader/MypageHeader';
import ChangePasswordDiv from './_components/changePasswordDIv/ChangePasswordDiv';
import LeftArrow from '../../../../public/assets/icons/leftArrow.svg';
import styles from './page.module.css';
import EditProfileDiv from './_components/editProfileDiv/EditProfileDiv';

const Page = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(userResponse).data;
  const [tryChangePassword, setTryChangePassword] = useState(false);

  const logoutModalText = `정말 로그아웃 하시겠습니까?`;
  const [openModalType, setOpenModalType] = useState('');
  const router = useRouter();

  const logoutButtonHandler = () => {
    setOpenModalType(MODAL_TYPES.custom);
  };

  const logoutTestButtonHandler = async () => {
    await dispatch(registerActions.resetData());
    await dispatch(loginActions.resetData());
    localStorage.removeItem('accessToken');
    router.push('/'); // 바로 메인 페이지로 이동
  };
  const logout = async () => {
    console.log('로그아웃');
  };

  // useEffect(() => {
  //   dispatch(registerActions.asynchFetchgetUserInfo());
  // }, [dispatch, tryChangePassword]);

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
      <div>
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
            userData={userData}
          />
          <ChangePasswordDiv
            inputWidth={changePasswordInputWidth}
            tryChangePassword={tryChangePassword}
            setTryChangePassword={setTryChangePassword}
          />
          <button
            type="button"
            className={styles.logoutButton}
            onClick={logoutButtonHandler}
          >
            로그아웃
          </button>

          {/* <button
            type="button"
            className={styles.logoutButton}
            onClick={() => logoutTestButtonHandler()}
          >
            테스트 로그아웃
          </button> */}
        </div>
      </div>

      <ModalPortal
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
        modalText={logoutModalText}
        checkButtonHandler={logout}
      />
    </div>
  );
};

export default Page;
