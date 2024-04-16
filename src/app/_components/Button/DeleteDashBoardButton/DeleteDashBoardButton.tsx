import styles from './DeleteDashBoardButton.module.css';

const DeleteDashBoardButton = () => {
  return (
    <button type="button" className={styles.container}>
      대시보드 삭제하기
    </button>
  );
};

export default DeleteDashBoardButton;
