'use client';

import { useState } from 'react';
import ModalPortal from '@/app/_components/modal/ModalPortal';
import NewColumnModal from './NewColumnModal';

const ModalPage = () => {
  const [newColumnModalOpen, setNewColumnModalOpen] = useState(false);

  const newColumnModalHandler = () => {
    setNewColumnModalOpen(!newColumnModalOpen);
  };

  return (
    <div>
      <button onClick={newColumnModalHandler} type="button">
        새 컬럼 생성
      </button>
      <ModalPortal openModal={newColumnModalOpen}>
        <NewColumnModal
          openModal={newColumnModalOpen}
          setOpenModal={setNewColumnModalOpen}
        />
      </ModalPortal>
    </div>
  );
};

export default ModalPage;
