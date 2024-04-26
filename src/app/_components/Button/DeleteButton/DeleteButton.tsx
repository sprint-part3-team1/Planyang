import { memberActions } from '@/app/_slice/memberSlice';

import useAppDispatch from '@/app/_hooks/useAppDispatch';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ id, setPage, member }: { id: number }) => {
  const dispatch = useAppDispatch();
  console.log(member);
  const handledeleteMember = (memberId: number) => {
    if (member.length === 0) {
      console.log(123);
    }
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
