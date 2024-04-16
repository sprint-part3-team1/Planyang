import React from 'react';
import CheckCancelButton from '@/app/_components/modal/CheckCancelButton';
import { ModalPropsType } from '@/app/_types/modalProps';
import Input from '@/app/_components/Input';
import styles from './NewColumnModal.module.css';

const NewColumnModal = ({ openModal, setOpenModal }: ModalPropsType) => {
  return (
    <div className={styles.container}>
      <p id={styles.title}>새 컬럼 생성</p>
      <Input
        inputName="이름"
        inputType="text"
        inputWidth={484}
        errorState={false}
      />
      <CheckCancelButton
        openModal={openModal}
        setOpenModal={setOpenModal}
        CheckString="생성"
        CancleString="취소"
      />
    </div>
  );
};
export default NewColumnModal;
