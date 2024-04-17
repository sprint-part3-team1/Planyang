import React from 'react';
import ModalContainer from '@/app/_components/modal/ModalContainer';
import { ModalPropsType } from '@/app/_types/modalProps';
import Input from '@/app/_components/Input';
import CheckCancleButton from './CheckCancleButton';

const NewColumnModal = ({ setOpenModalType }: ModalPropsType) => {
  const produceButtonHandler = () => {
    /** 생성 버튼을 누르면 실행되는 함수 작성 */
  };
  return (
    <ModalContainer title="새 컬럼 생성">
      <Input
        inputName="이름"
        inputType="text"
        inputWidth={484}
        errorState={false}
      />
      <CheckCancleButton
        checkText="생성"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={produceButtonHandler}
      />
    </ModalContainer>
  );
};
export default NewColumnModal;
