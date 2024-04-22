import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from '../modalContainer/ModalContainer';
import Input from '../../Input';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const InviteByEmailModal = ({ setOpenModalType }: ModalPropsType) => {
  const InviteButtonHandler = () => {
    /** 이메일로 초대하는 함수 작성 */
  };
  return (
    <ModalContainer title="초대하기">
      <Input inputName="이메일" inputType="text" inputWidth={48} />
      <CheckCancleButton
        checkText="초대"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={InviteButtonHandler}
      />
    </ModalContainer>
  );
};

export default InviteByEmailModal;
