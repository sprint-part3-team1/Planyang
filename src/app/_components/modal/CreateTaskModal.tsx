import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from './ModalContainer';
import ManagerDropDown from '../DropDown/ManagerDropDown';
import Input from '../Input';
import InputModal from './InputModal';
import CheckCancleButton from './CheckCancleButton';
import styles from './CreateTaskModal.module.css';

const CreateTaskModal = ({ setOpenModalType }: ModalPropsType) => {
  const createTaskButtonHandler = () => {
    /** 생성 버튼을 누르면 실행되는 함수 작성 */
  };
  return (
    <ModalContainer title="할 일 생성">
      <div className={styles.container}>
        <ManagerDropDown title="담당자" />
        <Input inputName="제목" inputType="text" inputWidth={45} />
        <InputModal title="설명" essential type="multiLine" />
        <Input inputName="마감일" inputType="calendar" inputWidth={45} />
        <Input inputName="태그" inputType="tag" inputWidth={45} />
        <InputModal title="이미지" type="image" />
      </div>
      <CheckCancleButton
        checkText="생성"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={createTaskButtonHandler}
      />
    </ModalContainer>
  );
};
export default CreateTaskModal;
