import React from 'react';
import Input from '@/app/_components/Input';
import ModalContainer from '@/app/(route)/modals/ModalContainer';
import { ModalPropsType } from '@/app/_types/modalProps';

const ColumnManageModal = ({
  openModalType,
  setOpenModalType,
}: ModalPropsType) => {
  return (
    <ModalContainer
      title="컬럼 관리"
      checkString="변경"
      cancelString="취소"
      openModalType={openModalType}
      setOpenModalType={setOpenModalType}
      deleteMode
    >
      <Input
        inputName="이름"
        inputType="text"
        inputWidth={484}
        errorState={false}
      />
    </ModalContainer>
  );
};
export default ColumnManageModal;
