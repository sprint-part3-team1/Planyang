import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import InputModal from '@/app/_components/modal/InputModal';
import Input from '../Input';
import styles from './ModifyTaskModal.module.css';
import ModalContainer from './ModalContainer';
import CheckCancleButton from './CheckCancleButton';
import StatusDropDown from '../DropDown/StatusDropDown';
import ManagerDropDown from '../DropDown/ManagerDropDown';

const ModifyTaskModal = ({ setOpenModalType }: ModalPropsType) => {
  const modifyButtonHandler = () => {
    /** 수정 버튼을 누르면 실행하는 함수 작성 */
  };
  return (
    <ModalContainer title="할 일 수정">
      <div className={styles.container}>
        <div className={styles.twoRowDiv}>
          <StatusDropDown title="상태" />
          <ManagerDropDown title="담당자" />
        </div>
        <Input inputName="제목" inputType="text" inputWidth={45} />
        <InputModal title="설명" essential type="multiLine" />
        <Input inputName="마감일" inputType="calendar" inputWidth={45} />
        <Input inputName="태그" inputType="tag" inputWidth={45} />
        <InputModal title="이미지" type="image" />
      </div>
      <CheckCancleButton
        checkText="수정"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={modifyButtonHandler}
      />
    </ModalContainer>
  );
};

export default ModifyTaskModal;
