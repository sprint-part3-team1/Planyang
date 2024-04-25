'use client';

import EditDashName from '@/app/(route)/mydashboard/_components/EditDashName';
import TableInvite from '@/app/(route)/mydashboard/_components/TableInvite';
import TableMember from '@/app/(route)/mydashboard/_components/TableMember';
import BackDashBoardButton from '@/app/_components/Button/BackDashBoardButton/BackDashBoardButton';
import DeleteDashBoardButton from '@/app/_components/Button/DeleteDashBoardButton/DeleteDashBoardButton';

// useRouter import 수정
const DashBoardeditPage = () => {
  return (
    <div>
      <BackDashBoardButton />
      <EditDashName />
      <TableMember />
      <TableInvite />
      <DeleteDashBoardButton />
    </div>
  );
};

export default DashBoardeditPage;
