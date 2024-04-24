import React from 'react';
import Input from '@/app/_components/Input';
import styles from './ChangePasswordDiv.module.css';

const ChangePasswordDiv = ({ inputWidth }: { inputWidth: number }) => {
  return (
    <div className={styles.container}>
      <p id={styles.title}>비밀번호 변경</p>
      <div className={styles.inputDiv}>
        <Input
          inputName="현재 비밀번호"
          inputType="password"
          inputWidth={inputWidth}
          placeholder="현재 비밀번호 입력"
        />
        <Input
          inputName="새 비밀번호"
          inputType="password"
          inputWidth={inputWidth}
          placeholder="새 비밀번호 입력"
        />
        <Input
          inputName="새 비밀번호 확인"
          inputType="password"
          inputWidth={inputWidth}
          placeholder="새 비밀번호 입력"
          errorState
          errorMessage="비밀번호가 일치하지 않습니다."
        />
      </div>
      <button type="button" className={styles.changeButton}>
        변경
      </button>
    </div>
  );
};

export default ChangePasswordDiv;
