import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import InputModal from '@/app/_components/modal/InputModal';
import styles from './ModifyTaskModal.module.css';
import ModalContainer from './ModalContainer';

const ModifyTaskModal = ({
  openModalType,
  setOpenModalType,
}: ModalPropsType) => {
  return (
    <ModalContainer
      title="할 일 수정"
      checkString="수정"
      cancelString="취소"
      openModalType={openModalType}
      setOpenModalType={setOpenModalType}
    >
      <div className={styles.twoRowDiv}>
        <InputModal title="상태" type="dropDown" />
        <InputModal title="담당자" type="dropDown" />
      </div>
      <InputModal title="제목" essential />
      <InputModal title="설명" essential type="multiLine" />
      <InputModal title="마감일" type="date" />
      <InputModal title="태그" />
    </ModalContainer>
  );
};

export default ModifyTaskModal;
