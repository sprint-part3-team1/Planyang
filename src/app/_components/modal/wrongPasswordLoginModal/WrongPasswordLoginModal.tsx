import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from '../modalContainer/ModalContainer';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';
import styles from './WrongPasswordLoginModal.module.css';

const WrongPasswordLoginModal = ({ setOpenModalType }: ModalPropsType) => {
  const checkButtonHandler = () => {
    setOpenModalType('');
  };
  return (
    <ModalContainer title="" modalHeight={25}>
      <p className={styles.contentText}>비밀번호가 일치하지 않습니다.</p>
      <CheckCancleButton
        checkText="확인"
        cancelText=""
        setOpenModalType={setOpenModalType}
        checkButtonHandler={checkButtonHandler}
      />
    </ModalContainer>
  );
};

export default WrongPasswordLoginModal;
