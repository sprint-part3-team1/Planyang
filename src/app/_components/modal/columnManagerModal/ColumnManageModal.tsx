import React, { useRef, useEffect } from 'react';
import Input from '@/app/_components/Input';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import ModalContainer from '@/app/_components/modal/modalContainer/ModalContainer';
import { ModalPropsType } from '@/app/_types/modalProps';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const ColumnManageModal = ({
  openModalType,
  setOpenModalType,
  inputInitialValue,
}: ModalPropsType) => {
  const INPUT_WIDTH = {
    [VIEWPORT_TYPES.deskTop]: 48.4,
    [VIEWPORT_TYPES.tablet]: 48.4,
    [VIEWPORT_TYPES.mobile]: 28.7,
  };

  const viewPortType = useGetViewportSize();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current && inputInitialValue) {
      inputRef.current.value = inputInitialValue;
    }
  }, []);

  return (
    <ModalContainer title="컬럼 관리">
      <Input
        inputId=""
        inputName="이름"
        inputType="text"
        inputWidth={INPUT_WIDTH[viewPortType]}
        errorState={false}
        inputRef={inputRef}
      />
      <CheckCancleButton
        checkText="변경"
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
        deleteMode
      />
    </ModalContainer>
  );
};
export default ColumnManageModal;
