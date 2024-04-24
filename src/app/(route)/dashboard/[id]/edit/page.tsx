'use client';

import EditDashName from '@/app/(route)/mydashboard/_components/EditDashName';
import TableInvite from '@/app/(route)/mydashboard/_components/TableInvite';
import DeleteDashBoardButton from '@/app/_components/Button/DeleteDashBoardButton/DeleteDashBoardButton';

const DashBoardeditPage = () => {
  return (
    <div>
      <EditDashName />
      <TableInvite />
      <DeleteDashBoardButton />
    </div>
  );
};

export default DashBoardeditPage;
