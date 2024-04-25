import React, { useState, useRef } from 'react';
import { ModalPropsType } from '@/app/_types/modalProps';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';

import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import useAppSelector from '@/app/_hooks/useAppSelector';
import {
  invitationData,
  invitationActions,
} from '@/app/_slice/invitationSlice';
import { dashBoardData } from '@/app/_slice/dashBoardSlice';

import ModalContainer from '../modalContainer/ModalContainer';
import Input from '../../Input';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const InviteByEmailModal = ({ setOpenModalType }: ModalPropsType) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const invitationDatas = useAppSelector(invitationData);
  const dashBoardDetailDatas = useAppSelector(dashBoardDetailData);
  const inviteUserToDashBoard = (email: string, dashBoardId: number) => {
    dispatch(
      invitationActions.asynchFetchinviteUserToDashboard({
        email,
        dashBoardId,
      }),
    );
  };

  const getMyInvitationList = (
    dashBoardId: number | undefined,
    page: number,
  ) => {
    dispatch(invitationActions.asynchGetMyInvitation({ dashBoardId, page }));
  };
  const InviteButtonHandler = async () => {
    inviteUserToDashBoard(inputValue, dashBoardDetailDatas?.id);
    if (invitationDatas.data?.invitations.length === 5) {
      dispatch(invitationActions.incrementPage());
      await getMyInvitationList(
        dashBoardDetailDatas?.id,
        invitationDatas.page + 1,
      );
    }

    setOpenModalType('');
  };
  const handleInputChange = () => {
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
    }
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
        inputRef={inputRef}
        onChange={handleInputChange}
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
