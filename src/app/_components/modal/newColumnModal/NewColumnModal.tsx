import React, { useRef } from 'react';
import ModalContainer from '@/app/_components/modal/modalContainer/ModalContainer';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import { ModalPropsType } from '@/app/_types/modalProps';
import Input from '@/app/_components/Input';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { useParams } from 'next/navigation';
import { columnActions, columnData } from '@/app/_slice/columnSlice';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';

const NewColumnModal = ({ setOpenModalType }: ModalPropsType) => {
  const INPUT_WIDTH = {
    [VIEWPORT_TYPES.deskTop]: 48.4,
    [VIEWPORT_TYPES.tablet]: 48.4,
    [VIEWPORT_TYPES.mobile]: 28.7,
  };

  const dispatch = useAppDispatch();
  const params = useParams();
  const titleRef = useRef<HTMLInputElement>(null);

  const createColumn = async (title: string, dashboardId: number) => {
    try {
      await dispatch(
        columnActions.asyncFetchCreateColumn({
          title,
          dashboardId,
        }),
      );
    } catch (error) {
      console.error('Error create column:', error);
    }
  };

  const produceButtonHandler = () => {
    if (titleRef.current?.value === '') return;

    createColumn(titleRef.current?.value, Number(params.id));
    setOpenModalType('');
  };

  const viewPortType = useGetViewportSize();

  return (
    <ModalContainer title="새 컬럼 생성">
      <Input
        inputName="이름"
        inputType="text"
        inputWidth={INPUT_WIDTH[viewPortType]}
        inputRef={titleRef}
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
