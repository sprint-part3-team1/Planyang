import styles from './CancelButton.module.css';

const CancelButton = ({ boardId, invitationId, onClick }) => {
  return (
    <button
      type="button"
      className={styles.cancelBtn}
      onClick={() => {
        onClick(boardId, invitationId);
      }}
    >
      취소
    </button>
  );
};

export default CancelButton;
