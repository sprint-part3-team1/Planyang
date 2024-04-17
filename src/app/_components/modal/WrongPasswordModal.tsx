import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from './ModalContainer';
import styles from './WrongPasswordModal.module.css';

const WrongPasswordModal = ({
  openModalType,
  setOpenModalType,
}: ModalPropsType) => {
  return (
    <ModalContainer
      title=""
      checkString="확인"
      cancelString=""
      openModalType={openModalType}
      setOpenModalType={setOpenModalType}
      modalHeight={24}
    >
      <div className={styles.textDiv}>
        <p className={styles.text}>현재 비밀번호가 틀렸습니다.</p>
      </div>
    </ModalContainer>
  );
};
export default WrongPasswordModal;
