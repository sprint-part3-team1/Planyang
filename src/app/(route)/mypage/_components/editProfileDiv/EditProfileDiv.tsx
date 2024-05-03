'use client';

import React, { useRef, useEffect, useState } from 'react';
// import Image from 'next/image';
import Input from '@/app/_components/Input';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { registerActions } from '@/app/_slice/registerSlice';
import styles from './EditProfileDiv.module.css';
import ImageInput from './ImageInput';

type EditProfileTypeProps = {
  inputWidth: number;
  userData: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
};

const EditProfileDiv = ({ inputWidth, userData }: EditProfileTypeProps) => {
  const dispatch = useAppDispatch();

  const nickNameRef = useRef<HTMLInputElement | null>(null);

  const { email, nickname, profileImageUrl } = userData;

  useEffect(() => {
    if (nickNameRef.current) {
      nickNameRef.current.value = nickname;
    }
  }, []);

  const [selectedImagePath, setSelectedImagePath] = useState<string | null>(
    profileImageUrl || '',
  );

  let nicknameValue = nickname;
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    nicknameValue = e.currentTarget.value;
  };

  const saveButtonClickHandler = async () => {
    dispatch(
      registerActions.asynchFetchUpdateInformation({
        nickname: nicknameValue,
        profileImageUrl: selectedImagePath,
      }),
    );
  };

  return (
    <div className={styles.container}>
      <p id={styles.title}>프로필</p>
      <div className={styles.outerProfileDiv}>
        <ImageInput
          selectedImagePath={selectedImagePath}
          setSelectedImagePath={setSelectedImagePath}
        />
        <div className={styles.inputDiv}>
          <div className={styles.emailInputDiv}>
            <p id={styles.title}>이메일</p>
            <div className={styles.emailInput}>{email}</div>
          </div>
          <Input
            inputId=""
            inputName="닉네임"
            inputType="text"
            inputWidth={inputWidth}
            inputRef={nickNameRef}
            onChange={onChangeNickname}
          />
        </div>
      </div>
      <button
        type="button"
        className={styles.saveButton}
        onClick={saveButtonClickHandler}
      >
        저장
      </button>
    </div>
  );
};

export default EditProfileDiv;
