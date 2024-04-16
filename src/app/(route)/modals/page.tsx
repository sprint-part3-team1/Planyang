'use client';

import { useState } from 'react';
import modalTypes from '@/app/constants/modalTypes';
import ModalPortal from '@/app/_components/modal/ModalPortal';

const ModalPage = () => {
  const [openModalType, setOpenModalType] = useState('');

  return (
    <div>
      <button
        onClick={() => setOpenModalType(modalTypes.newColumn)}
        type="button"
      >
        새 컬럼 생성
      </button>
      <button
        onClick={() => setOpenModalType(modalTypes.columnManagement)}
        type="button"
      >
        컬럼 관리
      </button>
      <ModalPortal
        openModalType={openModalType}
        setOpenModalType={setOpenModalType}
      />
    </div>
  );
};

export default ModalPage;
