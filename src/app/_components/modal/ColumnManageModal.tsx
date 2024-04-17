import React from 'react';
import Input from '@/app/_components/Input';
import ModalContainer from '@/app/_components/modal/ModalContainer';
import { ModalPropsType } from '@/app/_types/modalProps';
import CheckCancleButton from './CheckCancleButton';

const ColumnManageModal = ({
  openModalType,
  setOpenModalType,
}: ModalPropsType) => {
  return (
    <ModalContainer title="컬럼 관리">
      <Input
        inputName="이름"
        inputType="text"
        inputWidth={484}
        errorState={false}
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
