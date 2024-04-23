import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from '../modalContainer/ModalContainer';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';
import styles from './SignupModal.module.css';

const SignupModal = ({ openModalType, setOpenModalType }: ModalPropsType) => {
  const checkButtonHandler = () => {
    setOpenModalType('');
  };

  return (
    <ModalContainer title="">
      <p className={styles.contentText}>가입이 완료되었습니다!</p>
      <CheckCancleButton
        cancelText=""
        checkText="확인"
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
        checkButtonHandler={checkButtonHandler}
      />
    </ModalContainer>
  );
};

export default SignupModal;
