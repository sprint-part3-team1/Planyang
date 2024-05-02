import styles from './CancelButton.module.css';

const CancelButton = ({ boardId, invitationId, handleDeleteAndNavigate } : {
  boardId: string;
  invitationId: number;
  handleDeleteAndNavigate: any
}) => {
  
  const handleCancleButton = (boardId: string, invitationId: number) => {
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
