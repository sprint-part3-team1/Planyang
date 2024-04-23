import React from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import ModalContainer from '../modalContainer/ModalContainer';
import Input from '../../Input';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const InviteByEmailModal = ({ setOpenModalType }: ModalPropsType) => {
  const InviteButtonHandler = () => {
    /** 이메일로 초대하는 함수 작성 */
  };

  const viewportType = useGetViewportSize();

  const INPUT_WIDTH = {
    [VIEWPORT_TYPES.deskTop]: 48.4,
    [VIEWPORT_TYPES.tablet]: 48.4,
    [VIEWPORT_TYPES.mobile]: 28.7,
  };
  return (
    <ModalContainer title="초대하기">
      <Input
        inputName="이메일"
        inputType="text"
        inputWidth={INPUT_WIDTH[viewportType]}
      />
      <CheckCancleButton
        checkText="초대"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={InviteButtonHandler}
      />
    </ModalContainer>
  );
};

export default InviteByEmailModal;
