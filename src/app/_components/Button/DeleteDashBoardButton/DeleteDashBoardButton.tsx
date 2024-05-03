import { dashBoardDetailData } from '@/app/_slice/dashBoardDetail';
import useAppSelector from '@/app/_hooks/useAppSelector';
import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { dashBoardActions } from '@/app/_slice/dashBoardSlice';

import { useRouter } from 'next/navigation';
import styles from './DeleteDashBoardButton.module.css';

const DeleteDashBoardButton = () => {
  const boardId = useAppSelector(dashBoardDetailData);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleDeleteDashBoard = (dashBoardId: number) => {
    dispatch(
      dashBoardActions.asynchFetchDeleteDashBoard({
        dashBoardId,
      }),
    );
  };

  return (
    <>
    { boardId && (
      <button
        type="button"
        className={styles.container}
        onClick={() => {
          handleDeleteDashBoard(boardId.id);
          router.push('/mydashboard');
        }}
      >
        대시보드 삭제하기
      </button>
    )}
    </>
  );
};

export default DeleteDashBoardButton;
