import styles from './DeleteButton.module.css';

const DeleteButton = () => {
  return (
    <button type="button" className={styles.deleteBtn}>
      삭제
    </button>
  );
};

export default DeleteButton;
