'use client';

import { useState } from 'react';
import ModalPortal from '@/app/_components/modal/ModalPortal';
import NewDashboardModal from './_components/NewDashboardModal';

const DashBoardPage = () => {
  const [newDashboardModalOpen, setNewDashboardModalOpen] = useState(false);

  const newDashboardModalHandler = () => {
    setNewDashboardModalOpen(!newDashboardModalOpen);
  };

  return (
    <div>
      <button onClick={newDashboardModalHandler} type="button">
        새로운 대시보드 생성하기
      </button>
      <ModalPortal openModal={newDashboardModalOpen}>
        <NewDashboardModal
          openModal={newDashboardModalOpen}
          setOpenModal={setNewDashboardModalOpen}
        />
      </ModalPortal>
    </div>
  );
};

export default DashBoardPage;
