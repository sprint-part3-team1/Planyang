import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from './ModalContainer';
import Input from '../Input';

const InviteByEmailModal = ({
  openModalType,
  setOpenModalType,
}: ModalPropsType) => {
  return (
    <ModalContainer
      title="초대하기"
      checkString="초대"
      cancelString="취소"
      openModalType={openModalType}
      setOpenModalType={setOpenModalType}
    >
      <Input inputName="이메일" inputType="text" inputWidth={484} />
    </ModalContainer>
  );
};

export default InviteByEmailModal;
