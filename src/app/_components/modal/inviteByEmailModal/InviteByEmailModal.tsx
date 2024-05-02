import React, { useState, useRef, useEffect } from 'react';
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

import ModalContainer from '../modalContainer/ModalContainer';
import Input from '../../Input';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const InviteByEmailModal = ({ setOpenModalType }: ModalPropsType) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const invitationDatas = useAppSelector(invitationData);
  const dashBoardDetailDatas = useAppSelector(dashBoardDetailData);

  const isEmailExist = invitationDatas.data?.invitations.some(
    (item) =>
      item.invitee.email === inputValue || item.inviter.email === inputValue,
  );
  const InviteButtonHandler = async () => {
    if (!isEmailExist) {
      await dispatch(
        invitationActions.asynchFetchinviteUserToDashboard({
          email: inputValue,
          dashBoardId: dashBoardDetailDatas?.id,
        }),
      );
    }

    await dispatch(
      invitationActions.asynchGetMyInvitation({
        dashBoardId: dashBoardDetailDatas?.id,
        page: invitationDatas.page,
      }),
    );
    const totalCount = invitationDatas.data?.totalCount || 0;
    const maxPage = Math.ceil(totalCount / 5);
    if (invitationDatas.data?.invitations.length === 5) {
      if (invitationDatas.page === maxPage) {
        dispatch(invitationActions.setPage(maxPage + 1));
      } else {
        dispatch(invitationActions.setPage(maxPage));
      }
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
