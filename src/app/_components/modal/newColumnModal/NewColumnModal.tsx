import React from 'react';
import ModalContainer from '@/app/_components/modal/modalContainer/ModalContainer';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import { ModalPropsType } from '@/app/_types/modalProps';
import Input from '@/app/_components/Input';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const NewColumnModal = ({ setOpenModalType }: ModalPropsType) => {
  const produceButtonHandler = () => {
    /** 생성 버튼을 누르면 실행되는 함수 작성 */
  };

  const INPUT_WIDTH = {
    [VIEWPORT_TYPES.deskTop]: 48.4,
    [VIEWPORT_TYPES.tablet]: 48.4,
    [VIEWPORT_TYPES.mobile]: 28.7,
  };

  const viewPortType = useGetViewportSize();

  return (
    <ModalContainer title="새 컬럼 생성">
      <Input
        inputName="이름"
        inputType="text"
        inputWidth={INPUT_WIDTH[viewPortType]}
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
