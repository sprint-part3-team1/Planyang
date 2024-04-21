'use client';

import React, { useState } from 'react';
import Input from '@/app/_components/Input';
import { ModalPropsType } from '@/app/_types/modalProps';
import ModalContainer from '../modalContainer/ModalContainer';
import CheckCancleButton from '../checkCancleButton/CheckCancleButton';
import DashboardColors from '../../DashboardColors';

function NewDashboardModal({ setOpenModalType }: ModalPropsType) {
  const produceButtonHandler = () => {
    /** 새로운 대시보드 생성 버튼을 누르면 실행되는 함수 작성 */
  };
  const [dashboardColor, setDashboardColor] = useState<string>('green');

  return (
    <ModalContainer title="새로운 대시보드">
      <Input inputName="대시보드 이름" inputType="text" inputWidth={48} />
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
