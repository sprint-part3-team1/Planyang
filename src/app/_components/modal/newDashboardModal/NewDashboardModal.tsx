import React, { useState, useRef } from 'react';
import Input from '@/app/_components/Input';
import VIEWPORT_TYPES from '@/app/constants/viewPortTypes';
import useGetViewportSize from '@/app/_hooks/useGetViewportSize';
import { ModalPropsType } from '@/app/_types/modalProps';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { dashBoardActions } from '@/app/_slice/dashBoardSlice';
import ModalContainer from '../modalContainer/ModalContainer';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';
import DashboardColors from '../../DashboardColors';

function NewDashboardModal({ setOpenModalType }: ModalPropsType) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const [dashboardColor, setDashboardColor] = useState<string>('green');
  const INPUT_WIDTH = {
    [VIEWPORT_TYPES.deskTop]: 48.4,
    [VIEWPORT_TYPES.tablet]: 48.4,
    [VIEWPORT_TYPES.mobile]: 28.7,
  };

  const viewportType = useGetViewportSize();

  const createDashBoard = (title: string, color: string) => {
    dispatch(
      dashBoardActions.asynchFetchCreateDashBoard({
        title,
        color,
      }),
    );
  };

  const handleInputChange = () => {
    if (inputRef.current) {
      setInputValue(inputRef.current.value);
    }
  };

  const produceButtonHandler = () => {
    let color: string;
    switch (dashboardColor) {
      case 'green':
        color = '#7AC555';
        break;
      case 'purple':
        color = '#760DDE';
        break;
      case 'orange':
        color = '#FFA500';
        break;
      case 'blue':
        color = '#76A5EA';
        break;
      case 'pink':
        color = '#E876EA';
        break;
      default:
        color = '';
    }
    createDashBoard(inputValue, color);
    setOpenModalType('');
  };

  return (
    <ModalContainer title="새로운 대시보드">
      <Input
        inputRef={inputRef}
        onChange={handleInputChange}
        inputName="대시보드 이름"
        inputType="text"
        inputWidth={INPUT_WIDTH[viewportType]}
      />

      <DashboardColors
        dashboardColor={dashboardColor}
        setDashboardColor={setDashboardColor}
      />
      <CheckCancleButton
        checkText="생성"
        setOpenModalType={setOpenModalType}
        checkButtonHandler={produceButtonHandler}
      />
    </ModalContainer>
  );
}
export default NewDashboardModal;
