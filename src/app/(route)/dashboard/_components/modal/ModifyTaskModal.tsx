import React from 'react';
import { ModalPropsType } from '@/app/_types/commonTypes';
import InputModal from '@/app/_components/modal/InputModal';
import styles from './ModifyTaskModal.module.css';
import CheckCancelButton from '@/app/_components/modal/CheckCancelButton';

const ModifyTaskModal = ({ openModal, setOpenModal }: ModalPropsType) => {
  return (
    <div className={styles.container}>
      <p id={styles.title}>할 일 수정</p>
      <div className={styles.twoRowDiv}>
        <InputModal title="상태" type="dropDown" />
        <InputModal title="담당자" type="dropDown" />
      </div>
      <InputModal title="제목" essential />
      <InputModal title="설명" essential type="multiLine" />
      <InputModal title="마감일" type="date" />
      <InputModal title="태그" />
      <CheckCancelButton
        openModal={openModal}
        setOpenModal={setOpenModal}
        checkString="수정"
        cancleString="취소"
      />
    </div>
  );
};

export default ModifyTaskModal;
