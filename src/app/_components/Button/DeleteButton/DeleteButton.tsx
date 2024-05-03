import useAppDispatch from '@/app/_hooks/useAppDispatch';
import styles from './DeleteButton.module.css';

const DeleteButton = ({
  id,
  handleDeleteAndNavigate,
}: {
  id: number;
  handleDeleteAndNavigate: (memberId: number) => Promise<void>;
}) => {
  const handledeleteMember = (memberId: number) => {
    handleDeleteAndNavigate(memberId);
  };

  return (
    <button
      type="button"
      className={styles.deleteBtn}
      onClick={() => handledeleteMember(id)}
    >
      삭제
    </button>
  );
};

export default DeleteButton;
