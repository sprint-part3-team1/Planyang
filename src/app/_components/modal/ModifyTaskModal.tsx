import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import InputModal from '@/app/_components/modal/InputModal';
import styles from './ModifyTaskModal.module.css';
import ModalContainer from './ModalContainer';
import CheckCancleButton from './CheckCancleButton';

const ModifyTaskModal = ({ setOpenModalType }: ModalPropsType) => {
  const modifyButtonHandler = () => {
    /** 수정 버튼을 누르면 실행하는 함수 작성 */
  };
  return (
    <ModalContainer title="할 일 수정">
      <div className={styles.twoRowDiv}>
        <InputModal title="상태" type="dropDown" />
        <InputModal title="담당자" type="dropDown" />
      </div>
      <InputModal title="제목" essential />
      <InputModal title="설명" essential type="multiLine" />
      <InputModal title="마감일" type="date" />
      <InputModal title="태그" />
      <CheckCancleButton
        checkText="수정"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={modifyButtonHandler}
      />
    </ModalContainer>
  );
};

export default ModifyTaskModal;
