import React from 'react';
import ModalContainer from '@/app/_components/modal/ModalContainer';
import { ModalPropsType } from '@/app/_types/modalProps';
import styles from './DeleteColumnCheckModal.module.css';

const DeleteColumnCheckModal = ({
  openModalType,
  setOpenModalType,
}: ModalPropsType) => {
  return (
    <ModalContainer
      title=""
      checkString="삭제"
      cancelString="취소"
      openModalType={openModalType}
      setOpenModalType={setOpenModalType}
      modalWidth={54}
      modalHeight={24}
    >
      <div className={styles.deleteText}>컬럼의 모든 카드가 삭제됩니다.</div>
    </ModalContainer>
  );
};

export default DeleteColumnCheckModal;
