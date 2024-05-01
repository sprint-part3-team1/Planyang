import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/app/_components/Input';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { registerActions, userResponse } from '@/app/_slice/registerSlice';
import useAppSelector from '@/app/_hooks/useAppSelector';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';
import MODAL_TYPES from '@/app/constants/modalTypes';
import styles from './ChangePasswordDiv.module.css';

const ChangePasswordDiv = ({ inputWidth }: { inputWidth: number }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const errorMessage = useAppSelector(userResponse).error;

  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordCheckRef = useRef<HTMLInputElement>(null);
  const [changeSuccess, setChangeSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [isSamePassword, setIsSamePassword] = useState(true);

  const [openModalType, setOpenModalType] = useState('');

  const onChangeCurrentPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(e.currentTarget.value);
  };

  const onChangeNewPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPassword(e.currentTarget.value);
  };

  const onChangeNewPasswordCheckHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewPasswordCheck(e.currentTarget.value);
  };

  const checkSamePassword = () => {
    if (newPassword !== newPasswordCheck) {
      setIsSamePassword(false);
    } else {
      setIsSamePassword(true);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setOpenModalType(MODAL_TYPES.custom);
    } else if (changeSuccess) {
      setOpenModalType('');
      console.log('비밀번호 변경 성공');
    }
  }, [errorMessage, changeSuccess]);

  const changePassword = () => {
    dispatch(
      registerActions
        .asynchFetchChangePassword({
          password: currentPassword,
          newPassword,
        })
        .then(() => {
          setChangeSuccess(true);
        }),
    );
  };

  const changeButtonHandler = () => {
    changePassword();
  };

  const condition =
    currentPassword && newPassword && newPasswordCheck && isSamePassword;

  useEffect(() => {
    if (newPasswordCheckRef.current) {
      const handleFocusout = () => {
        checkSamePassword();
      };

      newPasswordCheckRef.current.addEventListener('focusout', handleFocusout);

      return () => {
        if (newPasswordCheckRef.current) {
          newPasswordCheckRef.current.removeEventListener(
            'focusout',
            handleFocusout,
          );
        }
      };
    }
  }, [changeButtonHandler]);

  return (
    <div className={styles.container}>
      <p id={styles.title}>비밀번호 변경</p>
      <div className={styles.inputDiv}>
        <Input
          inputId=""
          inputName="현재 비밀번호"
          inputType="password"
          inputWidth={inputWidth}
          placeholder="현재 비밀번호 입력"
          inputRef={currentPasswordRef}
          onChange={onChangeCurrentPasswordHandler}
        />
        <Input
          inputId=""
          inputName="새 비밀번호"
          inputType="password"
          inputWidth={inputWidth}
          placeholder="새 비밀번호 입력"
          inputRef={newPasswordRef}
          onChange={onChangeNewPasswordHandler}
        />
        <Input
          inputId=""
          inputName="새 비밀번호 확인"
          inputType="password"
          inputWidth={inputWidth}
          placeholder="새 비밀번호 입력"
          errorState={!isSamePassword}
          errorMessage={
            !isSamePassword ? '비밀번호가 일치하지 않습니다.' : null
          }
          inputRef={newPasswordCheckRef}
          onChange={onChangeNewPasswordCheckHandler}
        />
      </div>
      {condition && (
        <button
          type="button"
          className={styles.changeButton}
          onClick={changeButtonHandler}
        >
          변경
        </button>
      )}
      <ModalPortal
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
        modalText={errorMessage}
      />
    </div>
  );
};

export default ChangePasswordDiv;
