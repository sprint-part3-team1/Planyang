import useAppDispatch from '@/app/_hooks/useAppDispatch';
import { dashBoardActions } from '@/app/_slice/dashBoardSlice';
import styles from './EditButton.module.css';

interface EditButtonProps {
  checkColor: string;
  editDashBoardName: string;
  boardId: number;
}
const EditButton = ({
  checkColor,
  editDashBoardName,
  boardId,
}: EditButtonProps) => {
  const dispatch = useAppDispatch();
  const updateDashBoard = (
    dashBoardId: number,
    title: string,
    color: string,
  ) => {
    dispatch(
      dashBoardActions.asyncFetchUpdateDashBoard({
        dashBoardId,
        title,
        color,
      }),
    );
  };

  return (
    <button
      type="button"
      className={styles.editBtn}
      onClick={() => {
        updateDashBoard(boardId, editDashBoardName, checkColor);
      }}
    >
      변경
    </button>
  );
};

export default EditButton;
