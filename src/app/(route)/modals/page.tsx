'use client';

import { useState } from 'react';
import MODAL_TYPES from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/modalPortal/ModalPortal';

const ModalPage = () => {
  const [openModalType, setOpenModalType] = useState('');
  const MODAL_INFO = [
    {
      name: '새 컬럼 생성',
      type: MODAL_TYPES.newColumn,
    },
    {
      name: '컬럼 관리',
      type: MODAL_TYPES.columnManagement,
    },
    {
      name: '새로운 대시보드',
      type: MODAL_TYPES.newDashboard,
    },
    {
      name: '할 일 수정',
      type: MODAL_TYPES.modifyTask,
    },
    {
      name: '이메일로 초대하기',
      type: MODAL_TYPES.inviteByEmail,
    },
    {
      name: '현재 비밀번호 틀림',
      type: MODAL_TYPES.wrongPassword,
    },
    {
      name: '할 일 생성',
      type: MODAL_TYPES.createTask,
    },
    {
      name: '할 일 카드',
      type: MODAL_TYPES.taskCard,
    },
    {
      name: '비밀번호 틀렸습니다 로그인 페이지',
      type: MODAL_TYPES.wrongPasswordLogin,
    },
    {
      name: '가입이 완료되었습니다 로그인 페이지',
      type: MODAL_TYPES.signup,
    },
    {
      name: '이미 사용 중인 이메일입니다.',
      type: MODAL_TYPES.emailInUse,
    },
  ];

  const initialValue = '인풋 초기값';

  return (
    <div>
      {MODAL_INFO.map(({ name, type }) => {
        return (
          <button
            key={name}
            onClick={() => setOpenModalType(type)}
            type="button"
          >
            {name}
          </button>
        );
      })}
      <ModalPortal
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
        inputInitialValue={initialValue}
      />
    </div>
  );
};

export default ModalPage;
