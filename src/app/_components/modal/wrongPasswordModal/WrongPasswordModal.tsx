import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from '../modalContainer/ModalContainer';
import styles from './WrongPasswordModal.module.css';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const WrongPasswordModal = ({ setOpenModalType }: ModalPropsType) => {
  const checkButtonHandler = () => {
    setOpenModalType('');
  };
  return (
    <ModalContainer title="" modalHeight={24}>
      <div className={styles.textDiv}>
        <p className={styles.text}>현재 비밀번호가 틀렸습니다.</p>
      </div>
      <CheckCancleButton
        checkText="확인"
        cancelText=""
        checkButtonHandler={checkButtonHandler}
        setOpenModalType={setOpenModalType}
      />
    </ModalContainer>
  );
};
export default WrongPasswordModal;
