'use client';

import React from 'react';
import Input from '@/app/_components/Input';
import styles from './EditProfileDiv.module.css';
import ImageInput from './ImageInput';

type EditProfileTypeProps = {
  inputWidth: number;
  email: string;
  nickName: string;
};

const EditProfileDiv = ({
  inputWidth,
  email,
  nickName,
}: EditProfileTypeProps) => {
  return (
    <div className={styles.container}>
      <p id={styles.title}>프로필</p>
      <div className={styles.outerProfileDiv}>
        <ImageInput />
        <div className={styles.inputDiv}>
          <div className={styles.emailInputDiv}>
            <p id={styles.title}>이메일</p>
            <div className={styles.emailInput}>{email}</div>
          </div>
          <Input
            inputName="닉네임"
            inputType="text"
            inputWidth={inputWidth}
            placeholder={nickName}
          />
        </div>
      </div>
      <button type="button" className={styles.saveButton}>
        저장
      </button>
    </div>
  );
};

export default EditProfileDiv;
