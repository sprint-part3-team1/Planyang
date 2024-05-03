import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from '../modalContainer/ModalContainer';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';
import styles from './EmailInUseModal.module.css';

const EmailInUseModal = ({
  openModalType,
  setOpenModalType,
}: ModalPropsType) => {
  const checkButtonHandler = () => {
    setOpenModalType('');
  };

  return (
    <ModalContainer title="">
      <p className={styles.contentText}>이미 사용중인 이메일입니다.</p>
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

export default EmailInUseModal;
