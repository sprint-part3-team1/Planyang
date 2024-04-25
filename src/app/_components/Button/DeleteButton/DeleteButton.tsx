import { memberActions } from '@/app/_slice/memberSlice';

import useAppDispatch from '@/app/_hooks/useAppDispatch';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const handledeleteMember = (memberId: number) => {
    dispatch(
      memberActions.asyncDeleteMember({
        memberId,
      }),
    );
  };

  return (
    <button
      type="button"
      className={styles.deleteBtn}
      onClick={() => {
        handledeleteMember(id);
      }}
    >
      삭제
    </button>
  );
};

export default DeleteButton;
