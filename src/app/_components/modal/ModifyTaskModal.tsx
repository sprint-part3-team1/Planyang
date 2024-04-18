import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import InputModal from '@/app/_components/modal/InputModal';
import styles from './ModifyTaskModal.module.css';
import ModalContainer from './ModalContainer';
import CheckCancleButton from './CheckCancleButton';
import StatusDropDown from '../DropDown/StatusDropDown';

const ModifyTaskModal = ({ setOpenModalType }: ModalPropsType) => {
  const modifyButtonHandler = () => {
    /** 수정 버튼을 누르면 실행하는 함수 작성 */
  };
  return (
    <ModalContainer title="할 일 수정">
      <div className={styles.twoRowDiv}>
        <StatusDropDown title="상태" />
        <StatusDropDown title="담당자" />
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
