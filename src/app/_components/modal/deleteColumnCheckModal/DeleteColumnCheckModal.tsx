import React from 'react';
import ModalContainer from '@/app/_components/modal/modalContainer/ModalContainer';
import { ModalPropsType } from '@/app/_types/modalProps';
import styles from './DeleteColumnCheckModal.module.css';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const DeleteColumnCheckModal = ({ setOpenModalType }: ModalPropsType) => {
  const deleteButtonHandler = () => {
    /* 삭제 버튼을 누르면 동작하는 함수입니다. */
  };
  return (
    <ModalContainer title="" modalHeight={25}>
      <div className={styles.deleteText}>컬럼의 모든 카드가 삭제됩니다.</div>
      <CheckCancleButton
        checkText="삭제"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={deleteButtonHandler}
      />
    </ModalContainer>
  );
};

export default DeleteColumnCheckModal;
