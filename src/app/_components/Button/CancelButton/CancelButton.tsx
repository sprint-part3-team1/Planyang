import styles from './CancelButton.module.css';

const CancelButton = ({ boardId, invitationId, handleDeleteAndNavigate }) => {
  
  const handleCancleButton = (boardId, invitationId) => {
    handleDeleteAndNavigate(boardId, invitationId);
  };
  return (
    <button
      type="button"
      className={styles.cancelBtn}
      onClick={() => {
        handleCancleButton(boardId, invitationId);
      }}
    >
      취소
    </button>
  );
};

export default CancelButton;
